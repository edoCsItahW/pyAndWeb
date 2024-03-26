/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { print } from "./py.js"  // 需要配合<script type="moudle" src="..."></script>使用


class BOM {
    constructor() {
        this.Window = BOM_Window
        this.Location = BOM_Location
        this.Navigator = BOM_Navigator
        this.Screen = BOM_Screen
        this.History = BOM_History
    }

}

class BOM_Window {
    constructor() {
    }

    static open() {
        // 打开新的网页

        alert("打开新的网页")
        window.open("https://www.baidu.com")
    }

    static close() {
        // 关闭当前网页

        window.close()
    }

}

class BOM_Location {
    constructor() {
    }

    static showHref() {
        // 显示地址

        alert(`当前地址: ${location.href}`)
    }

    static reload() {
        // 重载网页

        location.reload()
    }

}

class BOM_Navigator {
    constructor() {
    }

    static showAppName() {
        // 展示浏览器名称

       alert(`浏览器名称: ${navigator.appName}`)
    }

    static showUserAgent() {
        // 展示用户代理字符串

        alert(`用户代理: ${navigator.userAgent}`)
    }

}

class BOM_Screen {
    constructor() {
    }

    static showScreenInfo() {
        // 展示屏幕信息

        alert(`屏幕信息: {"高": ${screen.height}, "宽": ${screen.width}}`)
    }

}

class BOM_History {
    constructor() {
    }

    static backLastUrl() {
        // 返回浏览器历史列表的上一个URL

        history.back()
        history.forward()
    }

}

var btn = document.getElementById("btn")
btn.onclick = () => {new BOM().History.backLastUrl()}
console.log(btn.onclick)
print("1", 1, 23, "step:|")
