/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
const apiUrl = 'api/'

class BF {
    static byId(elementId) {
        return document.getElementById(elementId)
    }

    static byClass(classNames, index = 0) {
        return (typeof index === "number" ? document.getElementsByClassName(classNames)[index] : document.getElementsByClassName(classNames))
    }
}

class funcSet {
    constructor() {
    }

    static async request(url, reqHead, port, data) {
        /*
        发送请求

        @param {string} url - 目标路径
        @param {string} reqHead - 用于描述请求部分和目的的字段
        @param {number} port - 请求端口
        @param {object} data 请求内容
        @return {object} 返回的json数据,包括code,msg,body
        */
        const response = await fetch(url + reqHead, {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({[port]: data})
        })

        if (!response.ok) {
            console.warn(`请求: ${location.href} => ${response.url}\n状态: ${response.statusText}(${response.status})`)
        }

        return await response.json()
    }

    static createNewElement(tag, content = null, className = null, id = null, otherAtt = null, postion = document.body, method = 1) {  // 创建字节点
        let element = document.createElement(tag)
        if (content) {
            element.innerHTML = content
        }
        if (className) {
            if (Array.isArray(className)) {
                for (let i of className) {
                    element.classList.add(i)
                }
            } else {
                element.className = className
            }
        }
        if (id) {
            element.id = id
        }
        if (otherAtt) {
            if (typeof otherAtt === "object") {
                Object.entries(otherAtt).forEach(([k, v]) => {
                    element.setAttribute(k, v)
                })
            }
        }
        if (postion) {
            if (typeof method === "number") {
                if (method > 0) {
                    postion.appendChild(element)
                } else {
                    postion.prepend(element)
                }
            } else {
                postion.insertBefore(element, method)
            }
        }
        return element
    }

    static debounce(func, wait) {
        let timeout
        return (...args) => {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }

    static serialize(from, keyLabel) {
        let data = []

        if (!from || from.nodeName !== "FORM") {
            return data
        }

        if (!from.hasAttribute(keyLabel)) {
            console.warn("没有")
        }

        for (let elem of from.elements) {

            try {
                data.push({name: elem.getAttribute(keyLabel), value: elem.checked})
            } catch (err) {
                console.warn(err)
            }
        }
        return data
    }

    static showDo() {

        let container = BF.byId("siftblock")

        container.classList.add("show")
        BF.byId("siftIco").style.zIndex = "-1"
        BF.byClass("begbutton").style.zIndex = "-1"
        Array.from(BF.byClass("queblock", null)).forEach(i => {
            i.style.pointerEvents = 'none'
        })

        document.addEventListener("click", funcSet.handleDocumentClick)

    }

    static unShowDO() {
        let container = BF.byId("siftblock")

        BF.byId("siftIco").style.zIndex = "1"
        BF.byClass("begbutton").style.zIndex = "1"

        container.classList.remove("show")
        Array.from(BF.byClass("queblock", null)).forEach(i => {
            i.style.pointerEvents = 'auto'
        })

        document.removeEventListener("click", funcSet.handleDocumentClick)
    }

    static handleDocumentClick(ev) {
        if (!ev.target.closest("#siftblock") && !ev.target.closest("#siftIco")) {
            funcSet.unShowDO()
        }
    }

}

class initialize {
    static handleSiftInit(Data) {
        const {key, data} = Data

        for (let k of Object.keys(data)) {
            elemOption.funcObj[k](data[k], key)
        }
    }

    static refreshQes(data, parentElem) {
        const {key, question} = data

        elemOption.removeAllChild(parentElem)

        Object.entries(question).forEach(([k, v]) => {

            const squeDiv = funcSet.createNewElement("div", null, "queblock", null, null, parentElem)
            funcSet.createNewElement("h3", key[k], "quekey", null, null, squeDiv)
            funcSet.createNewElement("p", `数量: ${v.length}`, "quetext", null, null, squeDiv)

        })
    }
}

class elemOption {
    static removeAllChild(elem) {
        /* 移除所有子元素 */
        if (elem.children.length) {
            Array.from(elem.children).forEach(e => elem.removeChild(e))
        }
    }

    static get funcObj() {
        return {
            type: this.typeDo,
            chapter: this.chapterDo,
            other: this.otherDo
        }
    }

    static typeDo(dataObj, keyObj) {

        const classDiv = BF.byClass("class")

        let elemArray = []

        const mutexPartDiv = funcSet.createNewElement("div", null, null, null, null, classDiv)

        let mutexElem = funcSet.createNewElement("input", null, "type", "mutex", {
            type: "checkbox",
            name: keyObj[dataObj.mutex]
        }, mutexPartDiv)
        funcSet.createNewElement("label", dataObj.mutex, null, null, {"for": "mutex"}, mutexPartDiv)


        mutexElem.addEventListener('change', ev => {
            if (ev.target.id === "mutex" && ev.target.checked) {
                elemArray.forEach(elem => {
                    elem.checked = false
                })
            }
        })

        dataObj.option.forEach((v, i) => {

            const partDiv = funcSet.createNewElement("div", null, null, null, null, classDiv)

            let optElem = funcSet.createNewElement("input", null, "type", `option${i}`, {
                type: "checkbox",
                name: keyObj[v]
            }, partDiv)
            funcSet.createNewElement("label", v, null, null, {"for": `option${i}`}, partDiv)

            elemArray.push(optElem)

            optElem.addEventListener('change', ev => {
                if (ev.target.className === "type" && ev.target.checked) {
                    mutexElem.checked = false
                }
            })
        })

    }

    static chapterDo(dataObj, keyObj) {
        const chapterDiv = BF.byClass("chapter")

        dataObj.forEach((chapter, i) => {

            const partDiv = funcSet.createNewElement("div", null, null, null, null, chapterDiv)

            funcSet.createNewElement('input', null, null, `chapter${i}`, {
                type: "checkbox",
                name: keyObj[chapter]
            }, partDiv)
            funcSet.createNewElement('label', chapter, null, null, {"for": `chapter${i}`}, partDiv)
        })
    }

    static otherDo(dataObj, keyObj) {
        const otherDiv = BF.byClass("other")

        dataObj.forEach((label, i) => {

            const partDiv = funcSet.createNewElement("div", null, null, null, null, otherDiv)

            funcSet.createNewElement('input', null, null, `other${i}`, {
                type: "checkbox",
                name: keyObj[label]
            }, partDiv)
            funcSet.createNewElement('label', label, null, null, {"for": `other${i}`}, partDiv)
        })
    }
}

onload = () => {
    funcSet.request(apiUrl, "siftInit", 1, null).then(res => {initialize.handleSiftInit(res.data[1])})  // 接收初始化信息

    BF.byId("siftIco").addEventListener('click', () => {funcSet.showDo()})

    funcSet.request(apiUrl, "qListInit", 1, null).then(res => {initialize.refreshQes(res.data[2], BF.byClass("qsdiv"))})

    const siftFrom = BF.byId("siftfrom")

    siftFrom.addEventListener('change', funcSet.debounce(() => {funcSet.request(apiUrl, "qListRef", 3, funcSet.serialize(siftFrom, "name")).then(res => {initialize.refreshQes(res.data[3], BF.byClass("qsdiv"))})}, 1000))
}

export default {
    data() {
        return {
            siftIndex: 0,  // 筛选图标点击次数

            siftBlockFlag: false,
            siftfrom: {}
        }
    },
    methods: {
        handleClick() {
            this.siftBlockFlag = !!(this.siftIndex % 2);
        },
        beginExam() {
            funcSet.request(apiUrl, "exam", 1, funcSet.serialize(BF.byId("siftfrom"), "name"))
        }
    }
}
