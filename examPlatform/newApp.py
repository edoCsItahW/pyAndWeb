#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<edocsitahw>----------------------------
# 传建时间: 2024/7/7 下午4:42
# 当前项目名: Python
# 编码模式: utf-8
# 注释: 
# -------------------------<edocsitahw>----------------------------
from flask import Flask, render_template, request, jsonify
from systemTools import jsonOpen
from typing import Any, Literal
from random import randint
from datetime import datetime
from atexit import register
from random import shuffle, randint

app = Flask(__name__, static_folder=r".\static", template_folder=r".\template")

jsonPath = r"E:\codeSpace\codeSet\pyAndWeb\project\examPlatform\static\json\user.json"


# @register
# def exitHandler():
#     print("程序退出")
#     with open(jsonPath, "w", encoding="utf-8") as file:
#         file.write("""[
#             {
#                 "id":         0,
#                 "name":       "admin",
#                 "password":   "123456",
#                 "ip":         "localhost:5000",
#                 "customType": {},
#                 "TPs":        []
#             }
#         ]""")


def stdResponse(data: Any, *, code: int = 200, msg: str = "ok"):
    serverInfo(data, dst='out', code=code)
    return jsonify({"code": code, "msg": msg, "data": data})


def serverInfo(data: Any, *, dst: Literal['in', 'out'] = 'in', code: int = 200):
    print(
        f'{request.remote_addr} - - [{datetime.now().strftime("%d/%b/%Y %H:%M:%S")}] "{request.method} {request.path} {"<- " if dst == "in" else "-> "}{data}" {code} -')


def shuffleDict(data: dict[str, list]):
    for k in data:
        shuffle(data[k])
    return data


def shuffleOption(data: dict, *, key: str = 'Option', ans: str = 'Answer'):
    for k, v in data.items():
        for item in v:
            logDict = None

            if key in item and item[key] and isinstance(item[key], dict):
                values = list(item[key].values())
                shuffle(values)
                logDict = item[key].copy()
                item[key] = {k: v for k, v in zip(item[key].keys(), values)}

                if ans in item:
                    orgType = type(item[ans])
                    ansList = a if isinstance(a := item[ans], list) else [a]  # 原答案列表
                    valueList = [logDict[o] for o in ansList]  # 选项值列表

                    item[ans] = []

                    for a in valueList:  # 重新赋值答案
                        for _k, _v in item[key].items():
                            if _v == a:
                                item[ans].append(_k)
                                break

                    if orgType != list:
                        item[ans] = item[ans][0]  # 若原答案不是列表, 则只取第一个答案

    return data


@app.route("/", methods=["GET", "POST"])
def root():
    return render_template(r"index.html")


@app.route("/api/", methods=["POST"])
def api():
    data = request.json

    serverInfo(data)

    match data['type']:
        case "captcha":
            return stdResponse(''.join([str(randint(0, 10)) for i in range(4)]))
        case "shuffle":
            match data['randomType']:
                case 1:  # 打乱题目类型顺序,data['data']为字典类型
                    return stdResponse(shuffleDict(data['data']))
                case 2:  # 打乱题目选项顺序
                    return stdResponse(shuffleOption(data['data']))
                case 3:  # 都进行打乱
                    return stdResponse(shuffleDict(shuffleOption(data['data'])))

    return stdResponse(None, code=400, msg="请求类型错误!")


@app.route("/api/user", methods=["POST"])
def user():
    data = request.json

    serverInfo(data)

    with jsonOpen(jsonPath, "r") as file:
        fileDict = file.read()

        if any(i["id"] == data['uid'] for i in fileDict):
            return stdResponse({k: v for k, v in fileDict[data['uid']].items() if k not in ('password', 'ip')})
        else:
            return stdResponse({k: v for k, v in fileDict[0].items() if k not in ('password', 'ip')})


@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    serverInfo(data)

    with jsonOpen(jsonPath, "w") as file:
        fileDict = file.read()

        if any(i['name'] == data['name'] for i in fileDict):
            return stdResponse(None, code=400, msg="用户名已存在!")

        elif any(i['ip'] == data['ip'] for i in fileDict):
            return stdResponse(None, code=400, msg="该IP已被注册!")

        fileDict.append({"id": len(fileDict), **data, "TPs": [], "customType": {}})

        return stdResponse(None)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    serverInfo(data)

    with jsonOpen(jsonPath, "r") as file:
        fileDict = file.read()

        for item in fileDict:
            if item['name'] == data['name'] and item['password'] == data['password']:
                return stdResponse(item['id'])

    return stdResponse(None, code=400, msg="用户名或密码错误!")


@app.route("/api/createTP", methods=["POST"])
def createTP():
    data = request.json  # {'name': str, 'desc': str, 'duration': int, uid: int}

    serverInfo(data)

    with jsonOpen(jsonPath, "w") as file:
        fileDict = file.read()
        tpLen = len(tp := fileDict[data['uid']]['TPs'])

        if any(tp['name'] == data['name'] for tp in tp):
            return stdResponse(None, code=400, msg="该题库名称已存在!")

        fileDict[data['uid']]['TPs'].append({
            "id":       tpLen,
            "name":     data['name'],
            "desc":     data['desc'],
            "duration": data['duration'],
            "quesPool": {}})

        file.write(fileDict)

    return stdResponse(None)


@app.route("/api/addQues", methods=["POST"])
def addQues():
    data = request.json  # {'question': 'Example question 1', 'options': {'A': 'optionA', 'B': 'optionB', 'C': 'optionC', 'D': 'optionD'}, 'answer': 'Answer of this qustion', 'type': 'choice', 'TPid': 1, 'id': 2}

    serverInfo(data)

    with jsonOpen(jsonPath, "w") as file:
        fileDict = file.read()

        quesPool = fileDict[data['uid']]['TPs'][data['tpId']]['quesPool']

        if data['type'] in quesPool:
            fileDict[data['uid']]['TPs'][data['tpId']]['quesPool'][data['type']].append(
                {**data['content'], 'id': len(quesPool[data['type']])})
        else:
            fileDict[data['uid']]['TPs'][data['tpId']]['quesPool'].update(
                [(data['type'], [{**data['content'], 'id': 0}])])

    return stdResponse(None)


@app.route("/api/delQues", methods=["POST"])
def delQues():
    data = request.json  # {'uid': 1, 'TP': 0, 'type': 'choice', 'id': 0}

    serverInfo(data)

    with jsonOpen(jsonPath, "w") as file:
        fileDict = file.read()

        quesPool = fileDict[data['uid']]['TPs'][data['TP']]

        if data['type'] in quesPool['quesPool']:
            for ques in fileDict[data['uid']]['TPs'][data['TP']]['quesPool'][data['type']]:
                if ques['id'] == data['id']:
                    fileDict[data['uid']]['TPs'][data['TP']]['quesPool'][data['type']].remove(ques)
                    break

            if len(fileDict[data['uid']]['TPs'][data['TP']]['quesPool'][data['type']]) == 0:
                del fileDict[data['uid']]['TPs'][data['TP']]['quesPool'][data['type']]

        else:
            return stdResponse(None, code=400, msg="题库中不存在该题型!")

    return stdResponse(None)


@app.route("/api/getQuesPool", methods=["POST"])
def getQuesPool():
    data = request.json

    with jsonOpen(jsonPath, "r") as file:
        fileDict = file.read()

        response = fileDict[0]['TPs'][data['id'] - 1]['quesPool']

        return stdResponse(response)


@app.route("/api/customType", methods=["POST"])
def customType():
    data = request.json

    serverInfo(data)

    with jsonOpen(jsonPath, "w") as file:
        fileDict = file.read()

        if any(data['uid'] == i['id'] for i in fileDict):
            fileDict[data['uid']]['customType'][data['name']] = data['modules']

            file.write(fileDict)

            return stdResponse(None)

    return stdResponse(None, code=400, msg="用户不存在!")


@app.route("/undefined", methods=["GET"])
def undefined():
    return stdResponse(None, code=404, msg="未定义的API!")


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
