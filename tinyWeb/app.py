# ! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

"""
file: app.py
author: edocsitahw
date: 2024/10/29 下午2:25
encoding: utf-8
command:
"""

from sqlTools import MySQL, TB, Type, py2sql
import sqlTools
from flask import Flask, render_template, request, jsonify, Response
from typing import Callable, Any, TypedDict, Literal
from functools import wraps
from jwt import encode, decode
from datetime import datetime, timedelta
from base64 import b64decode

"""
CREATE TABLE Courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imgUrl VARCHAR(255),
    title VARCHAR(100),
    text TEXT,
    teacher VARCHAR(100),
    stars INT
);

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    password VARCHAR(100),
    img VARCHAR(255)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    user_id INT,
    content TEXT,
    date DATE,
    FOREIGN KEY (course_id) REFERENCES Courses(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
"""


def dbInit():
    sql = MySQL('root', '135246qq')
    # sql.db.create('ccs', autoUse=True)
    sql.db.use('ccs')
    (sql.tb.create('courses', autoUse=True)
     .addField('id', cfg=TB.Create.TYPE | TB.Create.AUTO_INCREMENT | TB.Create.PRIMARY_KEY)
     .addField('imgUrl', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(255))
     .addField('title', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(100) | TB.Create.NULL)
     .addField('text', cfg=TB.Create.TYPE('TEXT'))
     .addField('teacher', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(100) | TB.Create.NULL)
     .addField('star', cfg=TB.Create.TYPE | TB.Create.DEFAULT(0))
     .end())
    (sql.tb.create('users', autoUse=True)
     .addField('id', cfg=TB.Create.TYPE | TB.Create.AUTO_INCREMENT | TB.Create.PRIMARY_KEY)
     .addField('name', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(100) | TB.Create.NULL)
     .addField('img', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(255))
     .addField('password', cfg=TB.Create.TYPE(Type.VARCHAR) | TB.Create.LENGHT(100) | TB.Create.NULL)
     .addField('date', cfg=TB.Create.TYPE(Type.DATE) | TB.Create.NULL)
     .end())
    (sql.tb.create('comments', autoUse=True)
     .addField('id', cfg=TB.Create.TYPE | TB.Create.AUTO_INCREMENT | TB.Create.PRIMARY_KEY)
     .addField('course_id', cfg=TB.Create.TYPE | TB.Create.NULL)
     .addField('user_id', cfg=TB.Create.TYPE | TB.Create.NULL)
     .addField('content', cfg=TB.Create.TYPE('TEXT') | TB.Create.NULL)
     .addField('date', cfg=TB.Create.TYPE(Type.DATE) | TB.Create.NULL)
     .config(cfg={'foreignKey': "(course_id, id) REFERENCES courses(id), FOREIGN KEY (user_id) REFERENCES users(id)"})
     .end())


app = Flask(__name__, static_folder=r"./static", template_folder=r"./template")
app.secret_key = "slot"
sql = MySQL('root', '135246qq', 'ccs')
sqlTools.OUTPUT = False


class HttpResp(TypedDict):
    code: int
    data: Any
    msg: str


def serverInfo(data: Any, *, dst: Literal['in', 'out'] = 'in', code: int = 200):
    print(
        f'{request.remote_addr} - - [{datetime.now().strftime("%d/%b/%Y %H:%M:%S")}] "{request.method} {request.path} {"<- " if dst == "in" else "-> "}{data} {code} -')


def unifi(fn: Callable[[Any, ...], Any]) -> Callable[[Any, ...], Response]:
    @wraps(fn)
    def wrapper(*args, **kwargs) -> Response:
        serverInfo(request.json, dst='in')
        res = fn(*args, **kwargs)
        if not isinstance(res, dict) or any(k not in res.keys() for k in ['code', 'data', 'msg']):
            serverInfo(r := {'data': res, 'code': 200, 'msg': 'ok'}, dst='out')
            return jsonify(r)
        serverInfo(res, dst='out', code=res['code'])
        return jsonify(res)
    return wrapper


def keyControl(data: dict, *, delete: list = None):
    for k in delete or []:
        if k in data:
            del data[k]
    return data


@app.route("/", methods=["GET", "POST"])
def root() -> str:
    return render_template(r"index.html")


@app.route("/api/article", methods=['POST'])
@unifi
def article():
    return [r | {'comment': list(map(lambda x: {'date': x['date'].strftime('%Y/%m/%d'), 'content': x['content'], 'user': keyControl(sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"id={x['user_id']}"))[0], delete=['date', 'password'])}, sql.tb.select(tbName='comments', cfg=TB.Select.WHERE(f"course_id={r['id']}"))))} for r in sql.tb.select(tbName='courses')]


@app.route("/api/comment", methods=['POST'])
@unifi
def comment():
    data = request.json  # {content: str, id: int, uid: int, date: YYYY/MM/DD}
    sql.tb.table = 'comments'
    try:
        sql.tb.insert(user_id=data['uid'], course_id=data['id'], content=data['content'], date=datetime.strptime(data['date'], '%Y/%m/%d').strftime('%Y-%m-%d'))
    except Exception as e:
        return {'code': 500, 'data': None, 'msg': ''.join(e.args)}
    return


@app.route("/api/user", methods=['POST'])
@unifi
def user():
    data = request.json
    match data['type']:
        case 'query':
            if isinstance(data['data'], str):
                return len(sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"name={py2sql(data['data'])}")))
            return keyControl(sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"id={data['data']}"))[0], delete=['date', 'password'])
        case 'check':
            token = data['token']
            if token:
                try:
                    tokenDict = decode(token, app.secret_key, algorithms=['HS256'])
                    if len(res := sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"name={py2sql(tokenDict['name'])}"))):
                        return keyControl(res[0], delete=['date', 'password'])
                    return {'code': 401, 'data': None, 'msg': 'token失效'}
                except Exception as e:
                    return {'code': 401, 'data': None, 'msg': ''.join(e.args)}
            return {'code': 401, 'data': None, 'msg': 'token错误'}


@app.route("/api/login", methods=['POST'])
@unifi
def login():
    data = request.json  # {name: str, password: str, time: datetime}
    if r := sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"name='{data['name']}' AND password='{data['password']}'")):
        token = encode({'name': data['name'], 'exp': int((datetime.strptime(data['time'], '%Y/%m/%d %H:%M:%S') + timedelta(hours=1)).timestamp())}, app.secret_key, algorithm='HS256')
        return {'user': keyControl(r[0], delete=['date', 'password']), 'token': token}
    return {'code': 401, 'data': None, 'msg': '用户名或密码错误'}


@app.route("/api/register", methods=['POST'])
@unifi
def register():
    data = request.json  # {name: str, password: str, time: datetime }
    if sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"name='{data['name']}'")):
        return {'code': 401, 'data': None, 'msg': '用户名已存在'}
    time = int((datetime.strptime(data['time'], '%Y/%m/%d %H:%M:%S') + timedelta(hours=1)).timestamp())
    data['date'] = datetime.now().strftime('%Y-%m-%d')
    del data['time']
    sql.tb.table = 'users'
    try:
        sql.tb.insert(**data)
    except Exception as e:
        return {'code': 500, 'data': None, 'msg': ''.join(e.args)}
    token = encode({'name': data['name'], 'exp': time}, app.secret_key, algorithm='HS256')
    return {'user': keyControl(sql.tb.select(tbName='users', cfg=TB.Select.WHERE(f"name='{data['name']}'"))[0], delete=['date', 'password']), 'token': token}


@app.route("/api/upload", methods=['POST'])
@unifi
def upload():
    data = request.json  # {data: base64, path: str}
    try:
        if data['data'].startswith('data:image/'):
            data['data'] = data['data'].split(',')[1]
        with open(f"./static/img/{data['name'].replace('%', '')}", 'wb') as f:
            f.write(b64decode(data['data']))
    except Exception as e:
        return {'code': 500, 'data': None, 'msg': ''.join(e.args)}
    else:
        sql.tb.table = 'users'
        sql.tb.update(img=(p := f"./static/img/{data['name']}".replace('%', '')), cfg=TB.Update.WHERE(f"id='{data['uid']}'"))
        return p


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

