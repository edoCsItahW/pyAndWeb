#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

from systemTools import jsonOpen
from sqlTools import baseSQL
from functools import cached_property
from os import PathLike, path
from contextlib import contextmanager
from json import load, dump
from typing import Literal, Any
from warnings import warn
from types import TracebackType
from re import findall, DOTALL
from csv import reader, writer
from pandas import DataFrame, set_option
from functools import singledispatchmethod


class jsonSql(baseSQL):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    def transfromDict(self, dictList: dict):
        dictList = dictList["1"]

        labelDict = {
            tuple(self.selectColumn(None, ("type", ), show=False)): "type",
            tuple(self.selectColumn(None, ("chapter", ), show=False)): "chapter",
            tuple(self.selectColumn(None, ("other", ), show=False)): "other"
        }

        labelList = [d['name'] for d in dictList if (value := d['value'])]

        return {i: [v for k, v in labelDict.items() if i in k][0] for i in labelList}

    def getValueFromKey(self, kwargs):
        logDict = {}

        for k in kwargs:
            if kwargs[k] not in logDict:
                logDict.update([(kwargs[k], [k])])

            else:
                logDict[kwargs[k]].append(k)

        addtuple = lambda x: f"({x})" if 'or' in x else x

        condition = "where " + " and ".join([addtuple(" or ".join([f"{k}='{v}'" for v in logDict[k]])) for k in logDict])

        return self.selectColumn(None, ("*", ), condition=condition, show=False)

    def toApiFormat(self, siftInfo: list[tuple]):

        result = {}

        for quesDict in [{k: v for k, v in zip(self.COLUMN, t)} for t in siftInfo]:
            _ = {
                    "chapter": quesDict["chapter"],
                    "question": quesDict["content"],
                    "option": [i for i in (quesDict["optionA"], quesDict["optionB"], quesDict["optionC"], quesDict["optionD"])],
                    "answer": quesDict["answer"],
                    "note": quesDict["note"]
                }

            if (_type := quesDict["type"]) not in result:
                result.update([(_type, [_])])

            else:
                result[_type].append(_)

        return result


# @contextmanager
# def openJson(file: str | bytes | PathLike[str] | PathLike[bytes], mode: Literal["r+", "+r", "w+", "+w", "a+", "+a", "w", "a", "r"]):
#     resource = load(file := open(file))
#
#     try:
#         yield resource
#
#     finally:
#         file.close()


class contentParser:
    def __init__(self, textPath: str | PathLike[str], csvPath: str | PathLike[str] = None, **kwargs):
        if not kwargs: raise TypeError(
            "contentParser.__init__() missing 1 required keyword-only argument: 'kwargs'")

        self._textPath = textPath
        self._csvPath = csvPath

        self.encludeList = ["$", "^", "|", "[", "{", "?", "+", "*"]

        self.markDict = kwargs
        self.quesDict = {k: [] for k in kwargs}

        self.symbol = "\\"

        if not path.exists(self._textPath): raise FileNotFoundError(f"找不到文件: '{self._textPath}'")

    @cached_property
    def text(self):
        with open(self._textPath, "r", encoding="utf-8") as file:

            return file.read()

    @property
    def csvPath(self): return self._csvPath

    @staticmethod
    def normalDict(*, Id: int = '', content: str = '', optionA: str = '', optionB: str = '', optionC: str = '', optionD: str = '', answer: str = '', Type: str = '', chapter: str = '', other: str = '', note: str = ''):
        return {"id": Id, "content": content, "optionA": optionA, "optionB": optionB, "optionC": optionC, "optionD": optionD, "answer": answer, "type": Type, "chapter": chapter, "other": other, "note": note}

    def _blockParse(self, text: str, *, onlyContent: bool = False):

        if onlyContent:

            return self.normalDict(Id=(_ := findall(r"(\d{1,2})(?:.)?(.*?)$", text, DOTALL)[0])[0], content=_[1])

        elif res := findall(r"(^\d{1,2})(?:.)?\.(.*?)A\.(.*?)B\.(.*?)C\.(.*?)D\.(.*?)$", text.replace("\n", ""), DOTALL):

            return self.normalDict(Id=(t := res[0])[0], content=t[1], optionA=t[2], optionB=t[3], optionC=t[4], optionD=t[5])

        else:
            _ = text.replace('\n', '\n\t')
            warn(  # 解析失败警告
                f"题目解析失败:\n\t{_}")

            try:

                return self.normalDict(Id=findall(r"^\d", text)[0], content='Error: 解析失败')

            except KeyError as err:

                return self.normalDict(content='Error: 解析失败')

    def escape(self, sym: str | tuple):

        f = lambda s: f'{self.symbol}{s}' if s in self.encludeList else s

        return tuple(f(i) for i in sym) if isinstance(sym, tuple) else f(sym)

    def parser(self):

        for t in self.quesDict:

            sym, flag = arg if isinstance(arg := self.markDict[t], tuple) else (arg[0], False)

            for block in findall(fr"(?<={(_ := self.escape(sym))[0]}).*?(?={_[1]})" if isinstance(sym, tuple) else fr"(?<={(_ := self.escape(sym))}).*?(?={_})", self.text, flags=DOTALL):

                res = self._blockParse(block, onlyContent=flag)

                res["type"] = t

                self.quesDict[t].append(res)

    def write(self, *, All: bool = True):

        if All:
            set_option('display.max_columns', None)
            set_option('display.max_colwidth', None)
            set_option('max_colwidth', 10)  # 内容长度控制

        print("预览模式\n"
              f"{(df := DataFrame(sum(self.quesDict.values(), start=[])))}")

        if input("是否继续写入(Y/N): ").lower() == "y":

            if not self.csvPath: raise ValueError(
                "位置参数'csvPath'没有接收是空的,无法写入!")

            with open(self.csvPath, "a", encoding="gbk", newline="") as file:

                df.to_csv(self.csvPath, index=False, header=False, encoding="gbk")

    def parsing(self):

        self.parser()

        self.write()


if __name__ == "__main__":
    # sql = jsonSql("root", "135246qq", "quesinfo", tableName="politics")
    # print(sql.toApiFormat(sql.getValueFromKey(sql.transfromDict({'1': [
    #     {'name': 'all', 'value': False},
    #     {'name': 'anQuestion', 'value': True},
    #     {'name': 'multChoice', 'value': True},
    #     {'name': 'sChoice', 'value': True},
    #     {'name': 'chapter1', 'value': True},
    #     {'name': 'chapter2', 'value': True},
    #     {'name': 'other1', 'value': True}
    # ]}))))
    # sql.getValueFromKey("type")
    # sql.showTableContent()
    # sql.update(None, "where id = 3", other="other1")
    # sql.selectColumn(None, ("*", ), condition="where type = 'sChoice' or type = 'multChoice'")

    ins = contentParser(r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\static\data\导论.txt", r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\static\data\quesData.csv", sChoice="$", multChoice="&", anQuestion=(("#", "%"), True), simQuestion=(("^", "*"), True), disQuestion=(("@", "~"), True))
    ins.parsing()

