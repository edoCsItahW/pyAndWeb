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

        this._data = data["question"]

        this.topDiv = elemOption._createNewElement($.id("app"), "div")
    }

    get data() {return this._data}

    /**
     * @param {any} value
     */
    set date(value) {
        if (typeof value === "object") {this._data = value}
    }

    checkData(data, key) {
        if (!key in data) {
            console.log(`没有键: '${key}'`)
        }
    }

    sChoiceDo() {
        let elemArray = []

        if ("sChoice" in this.data) {
            const sChoiceDiv = elemOption._createNewElement(this.topDiv, "div")
            
            this.data["sChoice"].forEach(dict => {
                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div")

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}: ${dict["note"]}`)

                elemOption._createNewElement(quesDiv, "p", dict["question"])

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

    ChoiceDo() {
        let elemArray = []

        if ("sChoice" in this.data) {
            const sChoiceDiv = elemOption._createNewElement(this.topDiv, "div")

            this.data["sChoice"].forEach(dict => {
                const quesDiv = elemOption._createNewElement(sChoiceDiv, "div")

                elemOption._createNewElement(quesDiv, "blockquote", `${dict["chapter"]}: ${dict["note"]}`)

                elemOption._createNewElement(quesDiv, "p", dict["question"])

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

    beginSpawn() {
        
        this.sChoiceDo()
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