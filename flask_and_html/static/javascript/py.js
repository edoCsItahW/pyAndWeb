/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
export function print(...args) {
    var opt = ""

    for (let i of arguments) {
        if (typeof i === "string" && i.startsWith("step:")) {
            opt = i.replace("step:")
            arguments
        }
    }

    console.log([...arguments])
    console.log([...arguments].join(opt))
}

// export default
// export {
//     print,
//     print as newname
// }
