/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/*
TODO:
  x. 解决没有没有候选关键字时提示div还存在,且显示为一个小黑圆点的问题.(当没有字符或者前面是空格时不提供)
  2. 增加候选关键字的数量限制,并添加高亮显示待选项和按down键高亮下移
     且在移至倒数第二个时改为待选项整体上移以保持高亮始终在倒数第二个.
  3. 优化css样式.
  4. 实现代码可执行(python).
*/
import getCareCoordinates from 'textarea-caret'

const url = location.href + "api"  // 网址
const [ keyReqHead ] = [ "keyword" ]

let inputHis = []

// document.addEventListener('keydown', ev => console.log(`功能: ${ev.code}, 值: ${ev.key}`))

export default {
  data() {
    return {
      code: "",
      promptShowFlag: false  // 是否展示提示
    }
  },
  methods: {
    createNewElement(tag, content=null, postion=document.body, className=null, id=null, otherAtt=null) {  // 创建字节点
      let element = document.createElement(tag)
      if (content) {element.innerHTML = content}
      if (className) {
          if (Array.isArray(className)) {
              for (let i of className) {
                  element.classList.add(i)
              }
          }
          else {
              element.className = className
          }
      }
      if (id) {element.id = id}
      if (otherAtt) {
          if (typeof otherAtt === "object") {
              Object.entries(otherAtt).forEach(([k, v]) => {element.setAttribute(k, v)})
          }
      }
      if (postion) {postion.appendChild(element)}
      return element
    },
    removeChileElements(element) {  // 移除所有子节点
      if (element.children.length) {
        Array.from(element.children).forEach(child => element.removeChild(child))
      }
    },
    detectChange(element) {  // 检测textarea变化,并提示随文本光标移动
      let cursorPosition = getCareCoordinates(element, element.selectionEnd)

      this.promptShowFlag = true

      this.MouseMove(this.$refs.prompt, [cursorPosition.left, cursorPosition.top])

      element.addEventListener('blur', () => {
        this.promptShowFlag = false
      })
    },
    MouseMove(element, posArray) {  // 随鼠标移动
      let rect = this.$refs.typeblock.getBoundingClientRect()

      let [inputX, inputY] = [rect.left, rect.top]
      let [x, y] = posArray

      let fontHeight = Number(window.getComputedStyle(this.$refs.typeblock).getPropertyValue('font-size').replace('px', ''))

      try {
        element.style.left = window.scrollX + inputX + x + 'px';
        element.style.top = window.scrollY + fontHeight + inputY + y + 'px';
      } catch (e) {
        console.warn(e)
      }
    },
    async fetchSession(reqHead, data, url) {  // 发生请求
      try {

        const response = await fetch(url,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({[reqHead]: data})
          })

        if (!response.ok) {
          throw new Error(`HTTP请求错误! 状态码: ${response.status}`)
        }
        return await response.json()
      }
      catch (error) {
        console.log(error)
      }
    },
    addContent(element, contentArray) {  // 添加内容

      const elementStyle = {
        'style': "flex: 1; margin: 0; background-color: rgb(43, 45, 48);"
      }

      for (let content of contentArray) {
        this.createNewElement("div", content, element, null, null, elementStyle)
      }
    }
  },
  computed: {},
  watch: {
    code(newValue, oldValue) {  // 当typeblock区域有变
      let typeblock = this.$refs.typeblock

      if (newValue.length < oldValue.length) {
        inputHis.push(oldValue.replace(newValue, ""))
      }
      else {
        inputHis = []
      }

      if (newValue && !inputHis.includes(" ")) {
        this.fetchSession(keyReqHead, newValue, url)
            .then(res => {

              if (typeof res === "object" && "data" in res && res.data.length && newValue.replace(oldValue, "") !== " ") {

                this.detectChange(typeblock)
                this.removeChileElements(this.$refs.prompt)
                this.addContent(this.$refs.prompt, res.data)
              }
              else {
                this.promptShowFlag = false

              }
            })
      }
      else {
        this.removeChileElements(this.$refs.prompt)
        this.promptShowFlag = false
      }
    }
  },
}
