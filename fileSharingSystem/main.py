#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/4 19:01
# 当前项目名: test_architectures.py
# 编码模式: utf-8
# 注释:
# -------------------------<Lenovo>----------------------------
from flask_socketio import SocketIO
from api.views import api_blue, staticFunc, infoProc
from flask import Flask, render_template, request
from time import sleep

app = Flask(__name__, static_folder=r".\static", template_folder=r".\template")
socketio = SocketIO(app)


@app.route("/", methods=["GET", "POST"])
def root():
    return render_template(r"UI.html")


@socketio.on("init")
def Html_init():
    socketio.emit("initInfo", {"init": staticFunc().Drives})


@socketio.on("message")
def socketio_received(data: ...):
    try:
        ip = request.remote_addr
    except Exception:
        ip = request.environ.get('HTTP_X_REAL_IP', request.environ.get('REMOTE_ADDR'))

    print(infoProc.infoFormat(data, url=ip, method="`WebSocket`"))
    # return jsonify({"reponse": True})


def socketio_send(data: ..., *, delay: int = 0):
    sleep(delay)
    print(f"已发送信息: {data}")
    socketio.emit('response', {'data': data})


if __name__ == '__main__':
    app.register_blueprint(api_blue)
    # app.run(host="0.0.0.0", debug=True)
    # thead = Thread(target=socketio_send, args=(412, ), kwargs={"delay": 10})
    # thead.start()
    socketio.run(app, "0.0.0.0", allow_unsafe_werkzeug=True, debug=True)


