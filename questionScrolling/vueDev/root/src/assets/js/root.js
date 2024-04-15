/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-SA
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
/*
TODO:
    接口规范:
        1. 请求与响应格式
        2. 错误处理
    (*)安全性:
        1. 身份验证
        2. 数据加密
        3. 防止攻击
    (*)性能优化:
        1. 缓存机制
        2. 异步处理
*/
const listItems = document.querySelectorAll(".main-menu li");

listItems.forEach((listItem) => {
  listItem.addEventListener("click", () => {
    listItems.forEach((otherItem) => {
      otherItem.classList.remove('active')
    })
    listItem.classList.add('active')
  });
});

export default {
    data() {
        return {

        }
    },
    methods: {
        async request(port, typeHead, data, url) {
            const reponse = await fetch(
                url,
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        [port]: {
                            [typeHead]: data
                        }
                    })
                }
            )
        },
        receive(param, msgProcess) {
            const response = this.request()
        },
    },
    watch: {

    }
}
