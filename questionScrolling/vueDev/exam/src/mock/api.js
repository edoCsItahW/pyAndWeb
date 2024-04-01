/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
const examInit = {
    "key": {
      "sChoice": "\u5355\u9009\u9898",
      "multChoice": "\u591a\u9009\u9898",
      "anQuestion": "\u8fa8\u6790\u9898"
    },
    "question": {
      "sChoice": [
        {
          "chapter": "chapter1",
          "question": "\u793a\u4f8b\u9898\u76ee1",
          "option": [
            "A\u9009\u9879",
            "B\u9009\u9879",
            "C\u9009\u9879",
            "D\u9009\u9879"
          ],
          "answer": "B",
          "note": null
        }
      ],
      "multChoice": [
        {
          "chapter": "chapter2",
          "question": "\u793a\u4f8b\u9898\u76ee2",
          "option": [
            "A\u9009\u9879",
            "B\u9009\u9879",
            "C\u9009\u9879",
            "D\u9009\u9879"
          ],
          "answer": "[B, D]",
          "note": null
        }
      ],
      "anQuestion": [
        {
          "chapter": "chapter3",
          "question": "\u793a\u4f8b\u9898\u76ee3",
          "option": [
            null,
            null,
            null,
            null
          ],
          "answer": "\u8fd9\u662f\u5927\u9898",
          "note": null
        }
      ]
    }
  }


export default [
    {
        url: '/api/examInit', //请求地址
        method: 'POST', //请求方式
        response: () => {
            return {
                code: 200,
                msg: 'ok',
                data: examInit
            }
        },
    },
]
