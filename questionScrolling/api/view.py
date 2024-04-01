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
from flask import Blueprint, request, jsonify, render_template, url_for, redirect, Response
# from support import jsonSql, jsonOpen  # type: ignore
from project.questionScrolling.support import jsonOpen, jsonSql
from json import load, dump

api_blue = Blueprint("api", __name__, template_folder=r"..\template")

keyDict = {"sChoice": "单选题", "multChoice": "多选题", "anQuestion": "辨析题"}
sql = jsonSql("root", "135246qq", "quesinfo", tableName="politics")


@api_blue.route("/siftInit", methods=["POST"])
def siftInit():
    """
    索要所有
    """
    print(request.json)
    port1 = {
        "key":  {k: v for v, k in
                 sql.selectColumn("lookup", ("name", "chName"), show=False)},
        "data": {
            "type":    {
                "option": sql.selectColumn("lookup", ("chName",), condition="where type = 'option'", show=False),
                "mutex":  sql.selectColumn("lookup", ("chName",), condition="where type = 'mutex'", show=False)[0],
            },
            "chapter": sql.selectColumn("lookup", ("chName",), condition="where type = 'chapter'", show=False),
            "other":   sql.selectColumn("lookup", ("chName",), condition="where type = 'other'", show=False)
        }
    }
    return jsonify({"code": 200, "msg": "ok", "data": {"1": port1}})


@api_blue.route("/qListInit", methods=["POST"])
def qListInit():
    print(req := request.json)
    port2 = {
        "key":      keyDict,
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
    print(req := request.json)
    prot3 = {
        "key":      keyDict,
        "question": sql.toApiFormat(sql.getValueFromKey(sql.transfromDict(req)))
    }
    return jsonify({"code": 200, "msg": "ok", "data": {"3": prot3}})


@api_blue.route("/exam", methods=["POST"])
def exam():
    data = {
        "key":      keyDict,
        "question": sql.toApiFormat(sql.getValueFromKey(sql.transfromDict(request.json)))
    }

    with jsonOpen(r"C:\Users\Lenovo\Desktop\siftTemp.json", "w") as file:
        file.update([(request.remote_addr, data)])

    return jsonify({"data": url_for("politicsExam")})  # redirect(url_for("api.origin"))


if __name__ == '__main__':
    # sql.showTableFrame()
    # sql.insert()
    # sql.column_add(None, "optionA", "varchar(128)", After="content", notNull=True)
    # sql.column_default(None, "optionA", "")
    # sql.column_modify(None, "optionA", "varchar(128)", NoNULL=False)
    # sql.insert(content="示例题目1", optionA="A选项", optionB="B选项", optionC="C选项", optionD="D选项", answer="B", type="sChoice", chapter="chapter1", other="other")
    pass
