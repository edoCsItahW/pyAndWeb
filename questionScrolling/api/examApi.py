#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/4/3 12:26
# 当前项目名: pyAndWeb
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
from flask import Blueprint, request, jsonify, render_template, url_for, redirect, Response
from project.questionScrolling.support import jsonOpen, jsonSql


examApi_blue = Blueprint("examapi", __name__, template_folder=r"..\template")


@examApi_blue.route("/examInit", methods=["POST"])
def examInit():

    with jsonOpen(r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\static\json\siftTemp.json", "r") as file:
        infoDict = file.read()

    return jsonify({"data": infoDict[request.remote_addr]})
