#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/19 14:15
# 当前项目名: pyAndWeb
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
from flask import Flask, render_template
from api.view import api_blue

app = Flask(__name__, static_folder=r".\static", template_folder=r".\template")


@app.route("/", methods=["GET", "POST"])
def root():
    return render_template(r"root.html")


@app.route("/politics/")
def polititcs():
    return render_template(r"politics.html")


if __name__ == '__main__':
    app.register_blueprint(api_blue)
    app.run(host="0.0.0.0", debug=True)
