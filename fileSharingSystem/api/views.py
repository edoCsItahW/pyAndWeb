#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/6 12:37
# 当前项目名: test_architectures.py
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
from tempCode import infoProc, staticFunc
from threading import Thread
from flask import Blueprint, request, jsonify, send_file
from time import sleep
from os import path, remove

api_blue = Blueprint('api', __name__, url_prefix='/api')


@api_blue.route('/fetch', methods=["GET", "POST"])
def fetch_receive():
    message = request.json
    print(infoProc.infoFormat(message, url=request.remote_addr, method=request.method))
    #
    # with open(r"C:\Users\Lenovo\Desktop\text.txt", "a", encoding="utf-8") as file:
    #     print("写入成功!")
    #     file.write(f"\n\n{message['data']}")

    if _path := infoProc.parser(message, "data", "dir"):
        if path.exists(_path):
            return jsonify({"data": infoProc.dirDetil(_path)})
        else:
            return jsonify({"data": "FileNotFoundError"})

    return jsonify({"reponse": True})


@api_blue.route("/xhr", methods=["POST"])
def xhr_receive():
    message = request.json

    print(infoProc.infoFormat(message, url=request.remote_addr, method=request.method))

    if _path := infoProc.parser(message, "data", "file"):
        if path.exists(_path):
            newName = infoProc.actBeforeSend(_path)

            def temp(p):
                sleep(5)
                remove(p)

            Thread(target=temp, args=(newName, )).start()
            return send_file(newName, as_attachment=True, download_name=staticFunc.fileName(_path))
        else:
            return jsonify({"data": "FileNotFoundError"})

    return jsonify({'data': "来自后端 - xhr_receive: 成功接收"})


@api_blue.route("/file", methods=["POST"])
def file_receive():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected part'})

    with open(fr"D:\xst_project_202212\Python\privateProject\fileSharingSystem\static\imgs\inpSrc\{file.filename}",
              "wb") as File:
        File.write(file.read())

    return jsonify({'message': f"File '{file.filename}' uploaded successfully"})
