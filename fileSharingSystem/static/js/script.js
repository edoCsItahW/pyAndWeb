/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-SA
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { createNewElement } from "./codeSupport.js"
var debug = true

// 当页面加载完成,向后端发送请求以请求初始化信息
$(document).ready(() => {socket.emit('init')})

// 文件上传(客户端->后端)系统
$(document).ready(() => {
    $('#uploadBtn').click(() => {
        let fileInput = document.getElementById('fileInput');
        let file = fileInput.files[0];
        let formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: '/api/file',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: response => {$('#result').text(response.message)},
            error: () => {$('#result').text('ERROR')}
        })
    })
})

var url = location.href

var socket = io(url)

var lastPath = undefined

socket.on('response', (data) => {
    // JSON.stringify(data)
    if (typeof data === "object") {
        if ("data" in data) {  // data.hasOwnProperty("data")
            console.log(123)
        }
        else {
            fetch_send(312)
        }
    }

})

// 初始化信息接收
socket.on('initInfo', (data) => {
    if (!document.getElementsByClassName("list").length) {

        let rootLeft = createNewElement("dl")

        if (typeof data === "object") {
            if ("init" in data && Array.isArray(data.init)) {
                for (let str of data.init) {
                    let elem = createNewElement("dt", str, null, "list", null, {"fullPath": str, "isDir": true})
                    elem.addEventListener('click', event => eventHandel(event))
                    elem.style.cssText = "color: #0071cc;"
                    rootLeft.appendChild(elem)
                }
            }
        }
    }
})

function socket_send(data) {
    socket.emit('message', {'data': data})
}

function fetch_send(data) {
    return fetch(
    url + "api/fetch",
    {
        method: "POST",
        headers: {'Content-Type': 'application/json',
        },
        body: JSON.stringify({'data': data})
    }
    )
    .then(response => response.json())
    .then(res => res)
    .catch((error) => {console.error('Error:', error)})
}

function xhr_send(data) {
    let xhr = new XMLHttpRequest()

    xhr.open("POST", url + "api/xhr", true)

    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const contentType = xhr.getResponseHeader("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                let response = JSON.parse(xhr.responseText);
                console.log(response.data);
            }
            else {
                console.log("是文件")

                let blob = new Blob([xhr.response], { type: xhr.getResponseHeader("Content-Type") });
                let url = window.URL.createObjectURL(blob);
                let link = createNewElement("a", null, document.body, null, null, {"href": url, "download": lastPath})
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    xhr.send(JSON.stringify({"data": data}))

}

// 对于被点击的list类元素的点击响应
function eventHandel(event) {
    let clickedElement = event.target

    if (clickedElement.children.length) {
        let childArray = Array.from(clickedElement.children)

        childArray.forEach(child => clickedElement.removeChild(child))
    }
    else {
        if (clickedElement.hasAttribute("isDir") && clickedElement.getAttribute("isDir") === "true") {

            fetch_send({'dir': clickedElement.getAttribute('fullPath')})
            .then(res => {
                    let path = res.data

                    if (Array.isArray(path)) {
                        for (let p of path) {
                            let newElement = createNewElement("dt", p.name, null, "list", null, {
                                "fullPath": p.fullPath,
                                "isDir": p.isDir
                            })

                            if (!p.isDir) {
                                newElement.style.cssText = "color: black;"
                            }
                            clickedElement.appendChild(newElement)
                        }
                    } else {
                        console.error(path)
                    }

                })
        }
        else {
            let res = confirm(`你确定要下载文件'${clickedElement.innerText}'吗?`)
            if (res) {
                lastPath = clickedElement.innerText
                xhr_send({"file": clickedElement.getAttribute("fullPath")})
            }
        }
    }

}

export {
    socket_send,
    fetch_send,
    xhr_send,
    eventHandel
}

