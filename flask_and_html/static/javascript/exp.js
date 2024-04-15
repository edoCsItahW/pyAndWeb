/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-SA
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
// 结合类set
const set = new Set()

let list = [1, 2, 3, 4, 4, 5, 3]
list.forEach(x => set.add(x))  // forEach类似for in 但不返回东西

new Set([1, 2, 3])

var list1 = [...set]  // list(set)

/*
    add(),
    delete(), 删值
    has(), 有值?
    clear() 清空
*/

// Promise对象,其中的resolve和reject都是函数,所以是不能改动的
// const promise = new Promise(function (resolve, reject) {
//     // ...some code
//
//     if (1 /* 异步操作成功 */) {
//         resolve(value);  // resolve成功时返回
//     }
//     else {
//         reject(error);  // reject失败时返回
//     }
// })

// function loadImageAsync(url) {
//     return new Promise(
//         function (resolve, reject) {
//             // 异步处理
//             const image = new Image();
//
//             image.src = url
//
//             image.onload = function () {
//                 resolve(image)
//             }
//             image.onerror = function () {
//                 reject(new Error(`Could not load image at ${url}`))
//             }
//         }
//     )
// }

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的结果');
  }, 1000);
});

promise.then(
  result => {console.log('Promise 完成了:', result); return 'then 的结果';},
  error => {console.log('Promise 被拒绝了:', error);}
).then(result => {console.log('第二个 then 方法的结果:', result);})

void(0)

/* Promise.allSettled异步
// 定义要执行的异步函数
function asyncFunction(arg) {
  return new Promise((resolve, reject) => {
    // 模拟异步操作，这里简单模拟一个延时操作
    setTimeout(() => {
      if (arg % 2 === 0) {
        resolve(`Function with arg ${arg} completed`);
      } else {
        reject(`Function with arg ${arg} failed`);
      }
    }, 1000);
  });
}


// 定义要传入的参数数组
const args = [1, 2, 3, 4, 5];

// 使用 Promise.allSettled 来执行多个异步函数，即使有失败也不影响其他函数的执行
Promise.allSettled(args.map(arg => asyncFunction(arg)))
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(result.value); // 输出成功的结果
      } else {
        console.error(result.reason); // 输出失败的原因
      }
    });
  });


// 定义异步函数
async function asyncFunction(arg) {
  return new Promise((resolve, reject) => {
    // 模拟异步操作，这里简单模拟一个延时操作
    setTimeout(() => {
      if (arg % 2 === 0) {
        resolve(`Function with arg ${arg} completed`);
      } else {
        reject(`Function with arg ${arg} failed`);
      }
    }, 1000);
  });
}
*/

/* async异步
// 定义要传入的参数数组
const args = [1, 2, 3, 4, 5];

// 使用 async 和 await 来执行多个异步函数，即使有失败也不影响其他函数的执行
async function executeAsyncFunctions() {
  const results = [];
  for (const arg of args) {
    try {
      const result = await asyncFunction(arg);
      results.push(result);
    } catch (error) {
      console.error(error);
    }
  }
  return results;
}

// 调用异步函数
executeAsyncFunctions()
  .then(results => {
    console.log(results);
  });
*/

function test (args, key = 1) {
  console.log(args, key)
  return 1
}
test(1)


class type {
  constructor(name, url) {
    this.name = name
    this.url = url
  }

  get g_name() {
    return this.name  // 类似@property,但函数名不能重复
  }

  set s_name(value) {
    this.name = value
  }

  static getMethod() {
    this.method()
  }

  method() {
    console.log("method1")
  }

  static method() {
    console.log("method2")
  }

}

let ins = new type("name", "https")
type.getMethod()

class type_child extends type {
  constructor(name) {
    super(url);
    this.name = name
  }

  show() {
    return this.method()  // static是不能被继承者访问的
  }

}
