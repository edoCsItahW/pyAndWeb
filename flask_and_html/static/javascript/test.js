/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/*
JavaScript 有自动插入分号（Automatic Semicolon Insertion，ASI）的机制，可以在一些情况下帮助补全缺失的分号。
*/
function addStr(des, text) {
    return `${des}: ${text}`
}

console.log(addStr("时间戳", Date.now()))  // 时间戳

var d = new Date('January 6, 2022');

console.log(addStr("返回实列距离计算机元年的毫秒数", d.getTime()))  // 返回实列距离计算机元年的毫秒数
console.log(addStr("返回实列对象对应每个月的几号", d.getDate()))  // 返回实列对象对应每个月的几号
console.log(addStr("v返回星期几,星期日为0,星期一为1", d.getDay()))  // 返回星期几,星期日为0,星期一为1
console.log(addStr("返回距离1900的年数", d.getYear()))  // 返回距离1900的年数
console.log(addStr("返回四位的年份", d.getFullYear()))  // 返回四位的年份
console.log(addStr("返回月份(0表示1月,11表示12月)", d.getMonth()))  // 返回月份(0表示1月,11表示12月)
console.log(addStr("返回小时(0-23)", d.getHours()))  // 返回小时(0-23)
console.log(addStr("返回毫秒", d.getMilliseconds()))  // 返回毫秒
console.log(addStr("返回毫秒", d.getMinutes()))  // 返回毫秒
console.log(addStr("返回秒", d.getSeconds()))  // 返回秒

/*
    Document: 整个文档树的顶层节点,
    DocumentType: doctype标签,
    Element: 网页的各种HTML标签,
    Attribute: 网页元素的属性(如class="right"),
    Text: 标签之间或标签包含的文本,
    Comment: 注释,
    DocumentFragment: 文档的片段
*/

/*
父节点(parentNode): 直接的那个上级节点,
子节点(childNodes): 直接的下级节点,
同级节点(sibling): 拥有同一个父节点的节点
*/

/*
文档节点(docunent): 9,对应常量Node.DOCUMENT_NODE,
元素节点(element): 1,对应常量Node.ELEMENT_NODE,
属性节点(attr): 2,对应常量Node.ATTRIBUTE_NODE,
文本节点(text): 3,对应常量Node.TEXT_NODE,
文档片段节点(DocumentFragment): 11.对应常量Node.DOCUMENT_FRAGMENT_NODE
*/

console.log(document)

var divs = document.getElementsByTagName("div")  // 如果没有参数则返回所有HTML元素
var need_elements = document.getElementsByClassName("need")
/*
    document.getElementsByName(): 依靠name标签,
    document.getElementById(): 依靠id标签,
    document.querySelector(): 接收一个CSS选择器作为参数,返回匹配该选择器的元素节点,(#id, .class)
    document.querySelectorAll():
 */

console.log(divs)

for (var elem of need_elements) {  // for ... in ... 是遍历索引, for ... of ... 是遍历内容
    elem.innerHtml = "已被javascript改变"
}

var tag_p = document.createElement("p")
tag_p.innerHtml = "创建的标签"

var content = document.createTextNode("创建的文本")
// appendChild: 将内容或子元素添入容器

tag_p.appendChild(content)

var id = document.createAttribute("id")
id.value = "属性的值"

tag_p.setAttributeNode(id)  // 设置属性

/*
    tag_p.id: 获取id,也可修改,
    tag_p.className: 获取class属性,也可修改,
*/
tag_p.className = ""

tag_p.classList.add()  // 向类列表中添加元素
tag_p.classList.remove()  // 移除元素
// tag_p.classList.contains("key")  // 试图取出键有则返回true没有则返回false

/*
innerHTML可以识别标签,
innerText可以会把标签识别成字符串
 */

/*
    clientHeight: 获取元素高度包括padding部分,但不包括border,margin,
    clientWidth: 获取元素宽度包括padding部分,但不包括border,margin,
    scrollHeight: 元素总高度,他包括padding,但不包括border,margin包括溢出的不可见内容,
    scrollWidth: 元素总宽度,它包括padding,但是不包括border,margin包括溢出的不可见内容,
    scrollLeft: 元素的水平滚动条向右滚动的像素数量,
    scrollTop: 元素的垂直滚动条向下滚动的像素数量,
    offsetHeight: 元素的CSS垂直高度,包括元素本身的高度,padding和border,
    offsetWidth: 元素的CSS水平宽度,包括元素本身的高度,padding和border,
    offsetLeft: 到定位父级左边界的间隙,
    offsetTop: 到定位父级上边界的间距
*/

console.log(document.body.clientHeight)  // 获取页面的高度
console.log(document.documentElement.clientHeight)  // 获取屏幕高度

// 设置CSS样式的方法
tag_p.setAttribute(
    'style',
    'background-color: red;\
    border: 1px solid black;'
)

tag_p.style.width = "300px"
tag_p.style.backgroundColor = "red"

tag_p.style.cssText = "width:200px; height: 200px; background-color: red;"


// 监听时间
var btn = document.getElementById("btn")

// btn.addEventListener("click", function () {console.log("点击了");})


/*
    click: 按下按钮触发,
    dbclick: 在同一个元素上双击鼠标时触发,
    mousedown: 按下鼠标键时触发,
    mouseup: 释放按下的鼠标时触发,
    mousemove: 当鼠标在节点内部移动时触发,当鼠标持续移动时,该事件就会触发,
    mouseenter: 鼠标进入一个节点时触发,进入子节点不会触发这个事件,
    mouseleave: 鼠标离开一个节点时触发,离开父节点不会触发这个事件,
    mouseover: 鼠标进入一个节点时触发,进入字节点会再一次触发这个事件,
    mouseout: 鼠标离开一个节点时触发,离开父节点也会触发这个事件,
    wheel: 滚动鼠标滚轮时触发.
*/
btn.onclick = function () {console.log("点击事件");}
btn.ondblclick = function () {console.log("双击事件");}
btn.onmousedown = function () {console.log("鼠标按下");}
btn.onmouseup = function () {console.log("鼠标抬起");}
btn.onmousemove = function () {console.log("鼠标移动");}
btn.onmouseenter = function () {console.log("鼠标进入");}
btn.onmouseleave = function () {console.log("鼠标离开");}


// 事件检测
btn.onclick = function (event) {
    console.log(addStr("target", event.target));  // target: [object HTMLInputElement]
    console.log(addStr("type", event.type));  // type: click
    event.preventDefault()  // 阻止默认事件
    event.stopPropagation()  // 阻止事件冒泡
}  // event是一个事件信息类


// 键盘事件
/*
    keydown: 按下键盘时触发,
    keypress: 按下有值的键时触发,按下除装饰键外的键,
    keyup: 松开键盘时触发该事件
*/

btn.onkeydown = function (event) {
    console.log(event.target.value);  // 但是按下的键
    console.log(event.keyCode)
}

/*
    input: 输入事件,
    select: 选中事件,
    Change事件,
    reset事件,
    submit事件
*/
var inp = document.createElement("input")
inp.id = "inp"
document.body.appendChild(inp)

inp.oninput = function (element) {console.log(element.target.value);}
inp.onselect = function () {console.log("已被选中");}
inp.onchange = function () {console.log("文本改变");}

btn.addEventListener("click", function () {console.log("事件已截取")})

// 字节点的事件会上传父节点,称为冒泡,所以在父节点上设置监听器以监管子节点,称为事件代理


// setTimeout函数用来指定*某个函数*或*某段代码*,在多少毫秒之后执行,并返回定时器编号以用来取消此定时器
var timer = setTimeout(function () {console.log("定时器执行");}, 1000)
// clearTimeout(timer) 取消定时器

var name = "name"
var user = {
    str: "id",
    getName: function () {console.log(addStr("this", this));}
}
user.getName()  // this指向所在的obj即此中的user

var testFunc = function () {console.log(addStr("方法中的this", this));}  // this指向调用它的对象
testFunc()

// 在HTML中的this指向接收事件的HTML元素
// <button onclick=this.style.display='none'>

// setInterval指定某个任务每隔一段事件执行一次
var v = 0;
// setInterval(function () {v++; console.log(v);}, 1000)

// style.opacity 透明度
var opacity = 1;
document.getElementById("fader").style.background = "red"
var fader = setInterval(function () {
    opacity -= 0.05;
    if (opacity > 0) {
        document.getElementById("fader").style.backgroundColor = "rgba(0, 0, 0, " + opacity + ")";
    } else {
        clearInterval(fader);
    }
}, 1000);

// 滚动监听 - 定时器防抖

function debounce(fn, delay) {
    var timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    }
}

window.onscroll = debounce(showTop, 200)

function showTop() {
    var scrollTop = document.documentElement.scrollTop;
    console.log("滚动条位置" + scrollTop);
}


// 解包类似python x, y = [1, 2], 但需要被赋值的变量名与字典中的键名相同
let { v1, v2 } = {"v1": 1, "v2": 2}
const {abs, ceil, floor, random} = Math;


// 第二个参数表示从哪开始搜索
let str = 'Hello World!'
str.startsWith("Hello")  // 与python一样
str.endsWith("!")  // 与python一样
str.includes("o")  // 与python的"xxx" in xxxx 一样

str.repeat(3)  // 与 'x' * 3 一样
str.padStart(10, "str")  // 以str在开头补全10位
str.padEnd()
str.trimStart()  // 去掉开头空格
str.trimEnd()
str.at(1)  // 返回该index的字符,支持负索引,超过返回undefined


// 扩展运算符..., 将一个数组转换为用逗号分隔的参数序列, 等于*[1, 2, 3]
console.log(...[1, 2, 3])
console.log(1, ...[2, 3, 4], 5)

// 求最大值
arr = [1, 2, 3, 4, 5]
Math.max.apply(null, arr)  // 原方法
Math.max(...arr)  // 新方法

// 拼接数组
arr.concat([1, 2])  // 原方法
let nArr = [...arr, ...[1, 2]]


/* 常见类数组,都不是真数组,不能用真数组的方法
    arguments,
    元素集合,
    类似数组的对象
*/
function add() {
    console.log(arguments);  // arguments 类似 *args
}

add(10, 20, 30)

Array.from()  // 类似list()可以将伪数组变成真数组
Array.of(1, 2, 3)  // from是转换,of可以逆...[]为数组

function f() {
    let x = 10
    let y = 20
    return { x,y }  // 类似return x, y
}

// 属性名表达式
let exp = "123"
let obj = {
    [exp]: true,
    ['a' + 2]: 2
}

// 对象的扩展运算符
let z = {"a": 3, "b": 4}
let n = {...z}

function arg(arg = 'name') {}

// 箭头函数,类似lambda
let lambda = (x, y) => `${x}, ${y}`

var xf = (x = 1) => {
    let e = 10;
    return x + e;
}

var f1 = function () {
    return {
        "a": 1,
        "b": 2
    }
}

var f2 = () => ({"a": 1, "b": 2})

arr.map((element, index) => {console.log(element * element)})  // 与map()一样

