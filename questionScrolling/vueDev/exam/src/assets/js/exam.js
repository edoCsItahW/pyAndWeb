/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { $, elemOption, request, route } from "jsPackage/src/commonlyFunc/index.js"


const api = route.join(location.href, "api")


class handleData {
    constructor(data) {
        
        this.checkData(data, "question")
        this.checkData(data, "key")

        this._data = data["question"]
        this._key = data["key"]

        this.topDiv = elemOption._createNewElement($.id("app"), "div", null, "container")
    }

    get data() {return this._data}

    /**
     * @param {any} value
     */
    set date(value) {
        if (typeof value === "object") {this._data = value}
    }

    get key() {return this._key}

    checkData(data, key) {
        if (typeof data === "object") {

           if (!(key in data)) {
                console.log(`没有键: '${key}'`)
            }

        }
        else {
            console.warn(`'data'为${typeof data}`)
        }

    }

    sChoiceDo() {
        let elemArray = []

        if ("sChoice" in this.data) {
            const sChoiceDiv = elemOption._createNewElement(this.topDiv, "div", null, "quesblock")
            
            this.data["sChoice"].forEach(dict => {
                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div")

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}: ${dict["note"]}`)

                elemOption._createNewElement(quesDiv, "p", `(${this.key["sChoice"]})${dict["question"]}`)

                const from = elemOption._createNewElement(quesDiv, "from")

                dict["option"].forEach(str => {
                    const hash = $.toHash(str)

                    const optionDiv = elemOption._createNewElement(from, "div")

                    const input = elemOption._createNewElement(optionDiv, "input", null, null, hash, {type: "checkbox"})
                    elemOption._createNewElement(optionDiv, "label", str, null, null, {for: hash})

                    elemArray.push(input)
                })


            })

            elemOption.elementRepel(elemArray)

        }
    }

    multChoiceDo() {
        if ("multChoice" in this.data) {
            const sChoiceDiv = elemOption._createNewElement(this.topDiv, "div", null, "quesblock")

            this.data["multChoice"].forEach(dict => {
                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div")

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}: ${dict["note"]}`)

                elemOption._createNewElement(quesDiv, "p", `(${this.key["multChoice"]})${dict["question"]}`)

                const from = elemOption._createNewElement(quesDiv, "from")

                dict["option"].forEach(str => {
                    const hash = $.toHash(str)

                    const optionDiv = elemOption._createNewElement(from, "div")

                    elemOption._createNewElement(optionDiv, "input", null, null, hash, {type: "checkbox"})
                    elemOption._createNewElement(optionDiv, "label", str, null, null, {for: hash})

                })
            })
        }
    }

    anQuestionDo() {

    }

    beginSpawn() {
        
        this.sChoiceDo()

        this.multChoiceDo()
    }

}


onload = () => {
    request(api, "examInit", null)
    .then(res => {
        const ins = new handleData(res.data)
        ins.beginSpawn()
    })
}


export default {
    data() {
        return {
        }
    },
    methods: {
    }
}