/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
function createNewElement(tag, content=null, postion=document.body, className=null, id=null, otherAtt=null) {
    let element = document.createElement(tag)
    if (content) {element.innerHTML = content}
    if (className) {
        if (Array.isArray(className)) {
            for (let i of className) {
                element.classList.add(i)
            }
        }
        else {
            element.className = className
        }
    }
    if (id) {element.id = id}
    if (otherAtt) {
        if (typeof otherAtt === "object") {
            Object.entries(otherAtt).forEach(([k, v]) => {element.setAttribute(k, v)})
        }
    }
    if (postion) {postion.appendChild(element)}
    return element
}

function insertElements(clickedElement) {
    let parent = clickedElement.parentElement;
    let nextSibling = clickedElement.nextElementSibling;

    parent.insertBefore(createNewElement("dt", "1", null), nextSibling)
}

export {
    createNewElement,
    insertElements
}
