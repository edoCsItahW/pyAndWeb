#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

from sqlTools import baseSQL
from functools import cache
from os import PathLike, path
from contextlib import contextmanager
from json import load, dump
from typing import Literal, Any
from warnings import warn
from types import TracebackType
from re import findall, DOTALL


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


class jsonFile:
    def __init__(self, jsonDict: dict):
        self._json = jsonDict

        if not isinstance(self._json, dict):
            raise TypeError(f"参数`jsonDict`必须为字典(dict)类型,你的输入类型: '{type(self._json)}'")

    @property
    def jsonData(self): return self._json

    @jsonData.setter
    def jsonData(self, value: dict):

        if not isinstance(self._json, dict):

            raise TypeError(f"参数`jsonDict`必须为字典(dict)类型,你的输入类型: '{type(value)}'")

    def _pairParser(self, key: Any, value: Any):
        if key in self.jsonData:

            if isinstance(self.jsonData[key], list):

                self.jsonData[key].append(value)

            else:

                self.jsonData[key] = value

        else:

            self.jsonData.update([(key, value)])

    def update(self, __m: list[tuple[Any, Any]]):

        if not isinstance(__m, list) or any([not isinstance(i, tuple) for i in __m]):
            raise ValueError(
                f"传入的位置参数`__m`必须形如'[('key': 'value')]',你的输入'{__m}'")

        for t in __m:

            self._pairParser(*t)

    def read(self): return self.jsonData

    def write(self, __d: dict = None):

        if __d is None:

            __d = self.jsonData

        else:

            self.jsonData = __d


class jsonOpen:
    def __init__(self, file: str | bytes | PathLike[str] | PathLike[bytes], mode: Literal["r+", "+r", "w+", "+w", "a+", "+a", "w", "a", "r"]):
        self._filePath = path.abspath(file)
        self._mode = mode
        self._jsonfile: jsonFile = None

        if not path.exists(self._filePath): raise FileNotFoundError(f"找不到文件: '{self._filePath}'")

    @property
    def _file(self): return self._jsonfile

    @_file.setter
    def _file(self, value: Any):

        self._jsonfile = value

    def __enter__(self):

        with open(self._filePath, "r") as File:

            self._file = jsonFile(load(File))

            return self._file

    def __exit__(self, exc_type, exc_val, exc_tb):

        if any([exc_type, exc_val, exc_tb]):

            exc_tb: TracebackType
            warn(f"一个错误被捕获了: {exc_type}({exc_val}), line {exc_tb.tb_lineno}")

        if self._mode != "r":
            with open(self._filePath, self._mode) as file:

                dump(self._file.jsonData, file)


class contentParser:
    def __init__(self, textPath: str | PathLike[str]):
        self._textPath = textPath

        if not path.exists(self._textPath): raise FileNotFoundError(f"找不到文件: '{self._textPath}'")

    @property
    def text(self):
        with open(self._textPath, "r", encoding="utf-8") as file:

            return file.read()

    def parser(self):
        print(findall(r"\d\..*?D.*?(?=\d)", self.text, flags=DOTALL))


if __name__ == "__main__":
    sql = jsonSql("root", "135246qq", "quesinfo", tableName="politics")
    print(sql.toApiFormat(sql.getValueFromKey(sql.transfromDict({'1': [
        {'name': 'all', 'value': False},
        {'name': 'anQuestion', 'value': True},
        {'name': 'multChoice', 'value': True},
        {'name': 'sChoice', 'value': True},
        {'name': 'chapter1', 'value': True},
        {'name': 'chapter2', 'value': True},
        {'name': 'other1', 'value': True}
    ]}))))
    # sql.getValueFromKey("type")
    sql.showTableContent()
    # sql.update(None, "where id = 3", other="other1")
    # sql.selectColumn(None, ("*", ), condition="where type = 'sChoice' or type = 'multChoice'")
    # for i in range(101):
    #     print(f"{i}% {{background-image: linear-gradient(to right, #1cc685 {f'{i}%'}, #0eafff);}}")
    # pass
    # ins = contentParser(r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\static\data\quesContent.txt")
    # ins.parser()
    # class MyContextManager:
    #     def __enter__(self):
    #         print("Entering the context")
    #         return self
    #
    #     def __exit__(self, exc_type, exc_value, exc_tb):
    #         if exc_type is not None:  # 如果发生了异常
    #             print(f"An exception occurred of type {exc_type.__name__}")
    #             print(f"Exception value: {str(exc_value)}")
    #             # 打印跟踪回溯信息（可选）
    #             exc_tb: TracebackType
    #             print(exc_tb)
    #             # 注意：在实际应用中，你可能希望记录这些信息或者进行其他处理，而不是仅仅打印出来。
    #
    #
    # with MyContextManager():
    #     raise ValueError("This is a deliberate error to demonstrate exc_type, exc_value and traceback.")
