/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
const port1 = {
    key: {
        "单选": "sChoice",
        "多选": "multChoice",
        "大题": "anQuestion",
        "套卷": "all",
        "第一章": "chapter1",
        "第二章": "chapter2",
        "其它": "other"
    }, data: {
        type: {
            option: ["单选", "多选", "大题"],
            mutex: "套卷",  // 与option互斥
        },
        chapter: ["第一章", "第二章"],
        other: ["其它"]
    }
}
const port2 = {
    key: {sChoice: "单选题", multChoice: "多选题", anQuestion: "辨析题"}, question: {
        sChoice: [
            {
                chapter: "第一章",
                qestion: "xxx",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: "C",
                note: ""
            },
            {
                chapter: "第二章",
                qestion: "yyyy",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: "A",
                note: "xx"
            }
        ],
        multChoice: [
            {
                chapter: "第三章",
                qestion: "xxx",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: ["A", "C", "D"],
                note: "as"
            },
            {
                chapter: "第四章",
                qestion: "xxx",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: ["B", "C"],
                note: "fd"
            }
        ],
        anQuestion: [
            {
                chapter: "第五章",
                qestion: "xxx",
                answer: ["aaaaaa", "bbbbbb", "cccccc"],
                note: ""
            },
            {
                chapter: "第六章",
                qestion: "xxx",
                answer: ["aaaaaa"],
                note: ""
            }
        ]
    }
}
const port3 = {
    key: {sChoice: "单选题", multChoice: "多选题", anQuestion: "辨析题"}, question: {
        sChoice: [
            {
                chapter: "第二章",
                qestion: "xxx",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: "C",
                note: ""
            }
        ],
        multChoice: [
            {
                chapter: "第三章",
                qestion: "xxx",
                option: {"option1": "A", "option2": "B", "option3": "C", "option4": "D"},
                answer: ["A", "C", "D"],
                note: "as"
            }
        ],
        anQuestion: [
            {
                chapter: "第五章",
                qestion: "xxx",
                answer: ["aaaaaa", "bbbbbb", "cccccc"],
                note: ""
            },
            {
                chapter: "第六章",
                qestion: "xxx",
                answer: ["aaaaaa"],
                note: ""
            }
        ]
    }
}

const portObj = {
    "1": arg => {
        return {
            "1": port1
        }  // 从数据库中获取现有索引
    },
    "2": arg => {
        return {
            "2": port2
        }
    },
    "3": arg => {
        return {
            "3": port3
        }
    }
}

function process(data) {  //预处理数据->获取索引链->数据库筛选取值->返回数据列表
    console.log(data)
    /* if (Object.keys(data).includes("1"))

    let flagArray = []

    for (let k in Object.keys(portObj)) {
        flagArray.push()
    }
    */
    try {
        return portObj[Object.keys(data)[0]]
    } catch (err) {
        return "none"
    }
}


export default [
    {
        url: '/api/politics',
        method: 'POST',
        response: data => {
            return {
                code: 200,
                msg: "ok",
                data: process(data.body)
            }
        }
    },
    {
        url: '/api/politics/exam',
        method: "POST",
        response: data => {
            return {
                code: 200,
                msg: "ok",
                data: (Data => {console.log(Data); return {a: 1}})(data)
            }
        }
    }
]
