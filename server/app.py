#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# ! /user/bin/python3

"""
file: app.py
author: edocsitahw
date: 2024/10/17 下午1:46
encoding: utf-8
command:
"""
from flask import Flask, render_template, jsonify, Response
from typing import Any
from json import load
from functools import cache

app = Flask(__name__, static_folder=r"./static", template_folder=r"./template")


def stdResp(data: Any, *, code: int = 200, msg: str = "ok") -> Response:
    return jsonify({"code": code, "msg": msg, "data": data})


@app.route("/", methods=["GET", "POST"])
def root():
    return render_template(r"index.html")


@app.route("/api", methods=["GET", "POST"])
def api():
    return "Hello, API!"


@app.route("/api/user", methods=["GET", "POST"])
def user():
    return stdResp({'name': "edocsitahw", 'imgUrl': "https://avatars.githubusercontent.com/u/139570866?v=4"})


@app.route("/api/proj", methods=["GET", "POST"])
@cache
def proj():
    with open(r"./static/json/proj.json", "r", encoding="utf-8") as file:
        return stdResp(load(file))


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

