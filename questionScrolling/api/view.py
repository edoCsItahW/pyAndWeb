#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/22 14:26
# 当前项目名: pyAndWeb
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
from flask import Blueprint, request, jsonify
from sqlTools import baseSQL

api_blue = Blueprint("api", __name__, url_prefix="/politics/api")

keyDict = {"sChoice": "单选题", "multChoice": "多选题", "anQuestion": "辨析题"}


@api_blue.route("/siftInit", methods=["POST"])
def siftInit():
    """
    索要所有
    """
    print(request.json)
    port1 = {}
    return jsonify({"code": 200, "msg": "ok", "data": {"1": port1}})


@api_blue.route("/qListInit", methods=["POST"])
def qListInit():
    print(request.json)
    port2 = {
        "key": {"sChoice": "单选题", "multChoice": "多选题", "anQuestion": "辨析题"},
        "question": {
            "sChoice":    [
                {
                    "chapter": "第一章",
                    "qestion": "xxx",
                    "option":  {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                    "answer":  "C",
                    "note":    ""
                },
                {
                    "chapter": "第二章",
                    "qestion": "yyyy",
                    "option":  {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                    "answer":  "A",
                    "note":    "xx"
                }
            ],
            "multChoice": [
                {
                    "chapter": "第三章",
                    "qestion": "xxx",
                    "option":  {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                    "answer":  ["A", "C", "D"],
                    "note":    "as"
                },
                {
                    "chapter": "第四章",
                    "qestion": "xxx",
                    "option":  {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                    "answer":  ["B", "C"],
                    "note":    "fd"
                }
            ],
            "anQuestion": [
                {
                    "chapter": "第五章",
                    "qestion": "xxx",
                    "answer":  ["aaaaaa", "bbbbbb", "cccccc"],
                    "note":    ""
                },
                {
                    "chapter": "第六章",
                    "qestion": "xxx",
                    "answer":  ["aaaaaa"],
                    "note":    ""
                }
            ]
        }
    }
    return jsonify({"code": 200, "msg": "ok", "data": {"2": port2}})


@api_blue.route("/qListRef", methods=["POST"])
def qListRef():
    print(request.json)
    return jsonify({"code": 200, "msg": "ok"})


@api_blue.route("/exam", methods=["POST"])
def exam():
    print(request.json)
    return jsonify({"code": 200, "msg": "ok"})


if __name__ == '__main__':
    sql = baseSQL("root", "135246qq", "quesinfo", tableName="politics")
    sql.showTableContent()
    # sql.showTableFrame()
    # sql.insert()
    # sql.column_add(None, "optionA", "varchar(128)", After="content", notNull=True)
    # sql.column_default(None, "optionA", "")
    # sql.column_modify(None, "optionA", "varchar(128)", NoNULL=False)
    # sql.insert(content="示例题目1", optionA="A选项", optionB="B选项", optionC="C选项", optionD="D选项", answer="B", type="sChoice", chapter="chapter1", other="other")
    # sql.insert(content="示例题目2", optionA="A选项", optionB="B选项", optionC="C选项", optionD="D选项", answer="[B, D]", type="multChoice", chapter="chapter2", other="other")
    # sql.insert(content="示例题目3", answer="这是大题", type="anQuestion", chapter="chapter3", other="other")
