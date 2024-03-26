#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

from sqlTools import baseSQL
from functools import cache


class jsonSql(baseSQL):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    def transfromDict(self, dictList: dict):
        dictList = dictList["3"]

        labelDict = {tuple(self.selectColumn(None, ("type", ), show=False)): "type", tuple(self.selectColumn(None, ("chapter", ), show=False)): "chapter"}

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


if __name__ == "__main__":
    sql = jsonSql("root", "135246qq", "quesinfo", tableName="politics")
    # sql.getValueFromKey("type")
    sql.showTableContent()
    # sql.selectColumn(None, ("*", ), condition="where type = 'sChoice' or type = 'multChoice'")
# luozu.online/
