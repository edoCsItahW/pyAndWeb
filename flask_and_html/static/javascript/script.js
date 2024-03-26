/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/*
所有的变量声明都会被提升到代码头部,就叫变量提升
*/

var int = 10;
var str = "string";
var bool = true;
var dict = {int, str, bool};  // 复合数据类型
var none = null; // null代表对象为'没有'
var udf = undefined;  // undefined代表数值为'没有'

console.log(int);

// typeof: 判断数据类型
alert(typeof int)
/*
int: number
string: string
bool: boolean
dict: object
list: object
null: object
undefined: undefined
*/

/* 定义但没赋值就用,不会报错,但打印会出现undefine,如果var age;也没有就会报错
var age;

console.log(age)

age = 10;
*/

// 输出方法
alert("alert输出的内容"); // 弹出框

document.write("document.write输出的内容");  // 输出到网页

console.log("console.log输出的内容");  // 输出到调试框

// 运算符
/*
+ - * / %

与C一样
++obj 先自增再被运算
obj++ 先被运算再自增

赋值运算符等同python

普通比较运算符,得出的bool值与python一样

=== !== 严格相等与不相等

10=='10'是true,解释如下
10==='10'是false
*/

/*
在 JavaScript 中，使用双等号 == 进行比较时，会进行类型转换。
当比较一个数字和一个字符串时，JavaScript 会尝试将字符串转换为数字，然后再进行比较。
在您提到的情况下，表达式 10 == '10' 会返回 true，因为 JavaScript 将字符串 '10' 转换为数字 10，然后比较两个数字是否相等。
这是因为双等号 == 在比较时会进行类型转换，尝试使两个操作数的类型相同。
如果您想要进行严格的比较（不进行类型转换），可以使用三个等号 ===。
例如，10 === '10' 会返回 false，因为它们的类型不同（一个是数字，一个是字符串）。
*/

/*
and: &&
or: ||
*/

if (2 > 1) {
    alert();
}

if (2 > 1) {

}
else if (2 === 2) {

}
else {

}

switch (1) {
    case 0:
        alert();
        break
    case 1:
        alert();
        break
    case 2:
        alert();
        break
    case 3:
        alert();
        break
    default:
        alert();

}

(2 > 1) ? alert(true) : alert(false)  // 三元运算符
var boolen = (2 > 1) ? true : false

for (var i = 1; i <= 10 ; i++) {  // for (初始化表达式; 停止条件; 迭代因子) {语句;}
    alert(i);
}
// for (;;) {死循环;}
// "i=" + 1 字符格式化,结果为i=1

let name = "xst"  // let 域内声明,例如在if中声明外部就无法访问
/*
模板字符串（Template Strings）：
    模板字符串是 ES6 中引入的一种字符串格式化方法，使用反引号（``）来定义字符串，
    并通过 ${} 插入变量或表达式。
*/
console.log(`Hello, ${name}`);

/*
字符串插值（String Interpolation）：
   类似于模板字符串，通过使用加号（+）连接字符串和变量来实现字符串格式化。
*/
console.log('Hello,' + name + '!');

/*
字符串模板（String Template）：
    使用类似于 Python 中 %s 的占位符来格式化字符串，然后使用 replace() 方法来替换占位符。
*/
console.log("Hello, %s!".replace('%s', name))

/*
字符串格式化函数：
    使用 JavaScript 中的字符串格式化函数，如 String.prototype.format()。
*/
String.prototype.format = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};
console.log('Hello, {0}!'.format(name))

var k = 1;
while (k >= 100) {
    k++;
}

// break, continue
var string = "字符串 \
    换行"

// 类似len
alert(string.length);

alert(string.charAt(3));  // 类似"abcdefg"[3:4],负数和大于string.length的数返回空

alert(string.concat("anthor"));  // 合并字符串,参数可以不止一个,并且可以是数值

alert("".concat())  //  类似"".join()

alert(string.substring(2, 5))  // 字符串截取string[2:5],不同的是可以substring(10, 2)前大后小,负数会自动化为0
alert(string.substr(2, 3))  // 与substring不同的是第二个参数是要截取的长度,且第一个参数可以是负数,表示从后向前,第二个会自动做0,相同的是都不改变原字符

string.indexOf("a")  // 类似"".index() 没找到就返回-1

string.split()  // 同样,但第二个参数表示取出的成员个数

var list = ["1", 2, true]  // list[3]超出不会报错只会获得undefine

list[0] = "插入方法"

// 类似python for i in xxx
for (var i in list) {
    alert(list[i]);
}

// Array的静态方法.isArray()用来判断是否是数组 isinstance(obj, list)
Array.isArray(list) // -> true

list.push(1)  // 向尾部添加元素并返回
list.pop()  // 删除尾部元素并返回
list.shift()  // 删除第一个元素
list.unshift(1, 2)  // 向头部添加元素,可多个

list.join("|")  // 等同"|",join(list)

list.reverse()  // 原数组被改变成反向

var job = {key1: 1, key2: 2, key3: list}

job.key1.length

// Math库
Math.abs(-1)  // 绝对值
Math.max(1)  // 最大值
Math.min(1)  // 最小值

Math.floor(1.1)  // 向上舍入
Math.ceil(1.1)  // 向下舍入

Math.random()  // 随机数

// Date库
Date.now()  // 时间戳

