/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {$, elemOption, request, route} from "jsPackage/src/commonlyFunc/index.js"


const api = route.join(location.href, "api")

const response = request(api, "examInit", null)


class handleData {
    constructor(data) {

        this.checkData(data, "question")
        this.checkData(data, "key")

        this._data = data["question"]
        this._key = data["key"]

        this.topDiv = $.class("container")

        this.optionArray = ["A", "B", "C", "D"]
    }

    get data() {
        return this._data
    }

    /**
     * @param {any} value
     */
    set date(value) {
        if (typeof value === "object") {
            this._data = value
        }
    }

    get key() {
        return this._key
    }

    checkData(data, key) {
        if (typeof data === "object") {

            if (!(key in data)) {
                console.log(`没有键: '${key}'`)
            }

        } else {
            console.warn(`'data'为${typeof data}`)
        }

    }

    sChoiceDo() {
        let elemArray = []

        const sChoiceDiv = $.id("schoice")

        if ("sChoice" in this.data) {

            this.data["sChoice"].forEach(dict => {

                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div", null, "quesdiv", null,  {answer: dict['answer']})

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}`)

                elemOption._createNewElement(quesDiv, "p", `(${this.key["sChoice"]})${dict["question"]}`)

                const from = elemOption._createNewElement(quesDiv, "from", null, "optionfrom")

                dict["option"].forEach((str, i) => {

                    const optionDiv = elemOption._createNewElement(from, "div", `${this.optionArray[i]}.${str}`, ["option", "enable"], null, {option: this.optionArray[i]})

                    optionDiv.setAttribute("answer", dict["answer"])

                    elemArray.push(optionDiv)
                })


            })

            elemOption.elementRepel(elemArray, "click", "classList")

        }
    }

    multChoiceDo() {
        if ("multChoice" in this.data) {

            const sChoiceDiv = $.id("multchoice")

            this.data["multChoice"].forEach(dict => {

                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div", null, "quesdiv", null, {answer: dict['answer']})

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}`)

                elemOption._createNewElement(quesDiv, "p", `(${this.key["multChoice"]})${dict["question"]}`)

                const from = elemOption._createNewElement(quesDiv, "from", null, "optionfrom")

                dict["option"].forEach((str, i) => {

                    const optionDiv = elemOption._createNewElement(from, "div", `${this.optionArray[i]}.${str}`, ["option", "enable"], null, {option: this.optionArray[i]})

                    optionDiv.setAttribute("answer", dict["answer"])

                    optionDiv.addEventListener("click", ev => {

                        let classList = Array.from(ev.target.classList)

                        if (classList.includes("enable")) {

                            if (classList.includes("choice")) {

                                ev.target.classList.remove("choice")

                            } else {

                                ev.target.classList.add("choice")

                            }
                        }
                    })

                })
            })
        }
    }

    anQuestionDo() {
        const anQuestionDiv = $.id("anquestion")

        if ("anQuestion" in this.data) {
            anQuestionDiv.style.display = "block"

            this.data["anQuestion"].forEach(dict => {
                const quesDiv = elemOption._createNewElement(anQuestionDiv, "div", null, ["anques", "quesdiv"], null, {answer: dict["answer"]})

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}`)

                elemOption._createNewElement(quesDiv, "p", `(${this.key["anQuestion"]})${dict["question"]}`)

                elemOption._createNewElement(quesDiv, "textarea", null, "textinput")
            })
        }
        else {
            anQuestionDiv.style.display = "none"
        }
    }

    beginSpawn() {

        this.sChoiceDo()

        this.multChoiceDo()

        this.anQuestionDo()
    }

}


onload = () => {
    response.then(res => {
        const ins = new handleData(res.data)
        ins.beginSpawn()
    })
}


export default {
    data() {
        return {}
    },
    methods: {
        submit() {
            Array.from($.class("option", "*")).forEach(elem => elem.classList.remove("enable"))

            Array.from($.class("quesdiv", "*")).forEach(elem => elemOption._createNewElement(elem, "div", elem.getAttribute('answer'), 'answer'))

            Array.from($.class("choice", "*")).forEach(elem => this.correcting(elem))
        },
        correcting(element) {
            const answer = element.getAttribute("answer")

            let res

            if (answer.length === 1) {
                res = (answer === element.getAttribute("option"))
            } else {
                res = answer.includes(element.getAttribute("option"))
            }

            element.classList.remove("choice")

            element.classList.add(res ? "right" : "mistake")
        }
    }
}