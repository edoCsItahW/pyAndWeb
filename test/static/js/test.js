/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
var rootUrl = location.href;
function createNewElement(tag, content, pos, className, idName, otherAttr) {
    if (content === void 0) { content = null; }
    if (pos === void 0) { pos = document.body; }
    if (className === void 0) { className = null; }
    if (idName === void 0) { idName = null; }
    if (otherAttr === void 0) { otherAttr = {}; }
    var newElement = document.createElement(tag);
    if (content) {
        newElement.innerText = content;
    }
    if (className) {
        if (Array.isArray(className)) {
            for (var _i = 0, className_1 = className; _i < className_1.length; _i++) {
                var i = className_1[_i];
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
        Object.entries(otherAttr).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            return newElement.setAttribute(k, v);
        });
    }
    if (pos) {
        pos.appendChild(newElement);
    }
}
fetch(rootUrl)
    .then(function (res) { return createNewElement("h1", res); });
