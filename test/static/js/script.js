/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
let rootUrl = location.href
const expUrl = 'http://ajax-base-api-t.itheima.net/api/getbooks'

function createNewElement(tag, content=null, pos=document.body, className=null, idName=null, otherAttr={}) {
    let newElement = document.createElement(tag);
    if (content) {
        newElement.innerText = content;
    }
    if (className) {
        if (Array.isArray(className)) {
            for (let i of className) {
                newElement.classList.add(i);
            }
        }
        else {
            newElement.className = className;
        }
    }
    if (idName) {
        newElement.id = idName;
    }
    if (otherAttr && typeof otherAttr === "object") {
        Object.entries(otherAttr).forEach(([k, v]) => newElement.setAttribute(k, v));
    }
    if (pos) {
        pos.appendChild(newElement);
    }
}

// new URLSearchParams() 可以 append('name', 'value1') 等于 url = 'https://example.com' url?name=value1&name=value2&name=value3
// url?id=2表示查询

/*
    res.ok: 返回一个布尔值,表示请求是否成功,
    res.status: 返回状态码,
    res.statusText: 返回状态文本信息,
    res.url: 返回请求的url地址,
    res.json(): 获取json对象,
    res.text(): 得到文本字符串,
    res.blob(): 得到二进制Blob对象,
    res.formData(): 得到FormData表单对象,
    res.arrayBuffer(): 得到二进制ArrayBuffer对象
*/

/*
fetch(rootUrl)
    .then(res => {
        console.log(res);  // res是一个Response对象,需要特殊方法来获取其中的内容
        console.log(res.json());  // .json()是一个异步操作,表示取出所有内容,转成JSON对象
        return res.status
})
    .then(statu => {
        console.log(statu);
})
    .catch(error => {
        console.error(error);  // 捕获错误
    })
*/

async function getData() {
    try {
        let opt = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        };

        let res = await fetch(expUrl)
        console.log(res);

        let json = await res.json()
        console.log(json);
    }
    catch (error) {
        console.error(error);
    }
}

getData()
