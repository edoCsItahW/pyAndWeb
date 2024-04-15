#! /user/bin/python3

#  Copyright (c) 2023-2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2023/12/23 1:33
# 当前项目名: Python
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
from flask import Flask, request, redirect, url_for, render_template, flash
from warnings import warn
from traceback import format_exc
from .other.getvideo import video

app = Flask(__name__, static_url_path="", static_folder=r"D:\xst_project_202212\Python\privateProject\flask_and_html\static", template_folder=r"D:\xst_project_202212\Python\privateProject\flask_and_html\template")
app.secret_key = "secret_key"


@app.route("/", methods=["GET", "POST"])
def test():
    # post用request.from, get用request.args
    if request.method == "GET" and (info := dict(request.args)):

        flash(f"{info['name']}的网页")
        return redirect(url_for("test"))
        # return render_template(r"test.html", content=f"{info['name']}的网页")

    return render_template(r"test.html")


@app.route('/upload', methods=['POST'])
def upload_content():
    content = request.json['content']

    try:
        result = eval(content)
    except Exception as e:
        warn(f"{e.args[0]}: {e.args[1]}")
        result = format_exc()

    return f"内容成果上传,结果:\n {result}"


@app.route('/serch', methods=['GET'])
def serch():

    if info := request.args:
        infoDict = dict(info)

        return redirect(f"https://www.baidu.com/s?wd={infoDict['user']}")


@app.route("/download", methods=['POST'])
def download():

    fileName = None

    if info := dict(request.form):
        ins = video(info["url"], info["min"], info["sec"], aimpath=r"D:\xst_project_202212\Python\privateProject\flask_and_html\static\video")
        fileName = ins.beginDownLoad()

    return render_template(r"video.html", path=fileName)


@app.route("/list")
def downloadList(var, *args, key, **kwargs):
    return render_template(r"download.html")


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

