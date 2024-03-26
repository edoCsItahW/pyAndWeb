/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

let rootUrl = location.href

function createNewElement(tag: string, content=null, pos=document.body, className: string = null, idName: string = null, otherAttr={}) {
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

fetch(rootUrl)
.then(res => createNewElement("h1", res))

