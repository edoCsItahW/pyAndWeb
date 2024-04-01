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

        this.data = data["question"]

        this.topDiv = elemOption._createNewElement($.id("app"), "div")
    }

    get data() {return this.data}

    checkData(data, key) {
        if (!data.hasAttribute(key)) {
            console.log(`没有键: '${key}'`)
        }
    }

    sChoiceDo() {
        if (this.data.hasAttribute("sChoiceDo")) {
            let sChoiceDiv = elemOption._createNewElement(this.topDiv, "div")
            
            this.data["sChoiceDo"].forEach(dict => {
                let quesDiv = elemOption._createNewElement(sChoiceDiv, "div")

                elemOption._createNewElement(quesDiv, "p", dict["question"])

                let from = elemOption._createNewElement(quesDiv, "from")

                dict["option"].forEach(str => {
                    elemOption._createNewElement(from, )
                })
            })

        }
    }

}


onload = () => {
    request(api, "examInit", null)
    .then(res => console.log(res))
}


export default {
    data() {
        return {
        }
    },
    methods: {
    }
}