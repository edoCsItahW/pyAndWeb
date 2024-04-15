/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-SA
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

const kwArray = {  // 关键字: 显示权重
    "False": 0,
    "None": 0,
    "True": 0,
    "assert": 0,
    "and": 0,
    "as": 0,
    "break": 0,
    "class": 0,
    "continue": 0,
    "def": 0,
    "del": 0,
    "elif": 0,
    "else": 0,
    "except": 0,
    "finally": 0,
    "for": 0,
    "from": 0,
    "global": 0,
    "if": 0,
    "import": 0,
    "in": 0,
    "is": 0,
    "lambda": 0,
    "nonlocal": 0,
    "not": 0,
    "or": 0,
    "pass": 0,
    "raise": 0,
    "return": 0,
    "try": 0,
    "while": 0,
    "with": 0,
    "yield": 0,
    "async": 0,
    "await": 0
}
const pgArray = {  // 库: 权重
    "numpy": 0,
    "pandas": 0,
    "math": 0,
    "os": 0,
    "sys": 0
}
const pgContentArray = {
    "addaudithook": 0,
    "api_version": 0,
    "argv": 0,
    "audit": 0,
    "base_exec_prefix": 0,
    "base_prefix": 0,
    "breakpointhook": 0,
    "builtin_module_names": 0,
    "byteorder": 0,
    "call_tracing": 0,
    "copyright": 0,
    "displayhook": 0,
    "dllhandle": 0,
    "dont_write_bytecode": 0,
    "exc_info": 0,
    "excepthook": 0,
    "exception": 0,
    "exec_prefix": 0,
    "executable": 0,
    "exit": 0,
    "flags": 0,
    "float_info": 0,
    "float_repr_style": 0,
    "get_asyncgen_hooks": 0,
    "get_coroutine_origin_tracking_depth": 0,
    "get_int_max_str_digits": 0,
    "getallocatedblocks": 0,
    "getdefaultencoding": 0,
    "getfilesystemencodeerrors": 0,
    "getfilesystemencoding": 0,
    "getprofile": 0,
    "getrecursionlimit": 0,
    "getrefcount": 0,
    "getsizeof": 0,
    "getswitchinterval": 0,
    "gettrace": 0,
    "getwindowsversion": 0,
    "hash_info": 0,
    "hexversion": 0,
    "implementation": 0,
    "int_info": 0,
    "intern": 0,
    "is_finalizing": 0,
    "maxsize": 0,
    "maxunicode": 0,
    "meta_path": 0,
    "modules": 0,
    "orig_argv": 0,
    "path": 0,
    "path_hooks": 0,
    "path_importer_cache": 0,
    "platform": 0,
    "platlibdir": 0,
    "prefix": 0,
    "pycache_prefix": 0,
    "set_asyncgen_hooks": 0,
    "set_coroutine_origin_tracking_depth": 0,
    "set_int_max_str_digits": 0,
    "setprofile": 0,
    "setrecursionlimit": 0,
    "setswitchinterval": 0,
    "settrace": 0,
    "stderr": 0,
    "stdin": 0,
    "stdlib_module_names": 0,
    "stdout": 0,
    "thread_info": 0,
    "unraisablehook": 0,
    "version": 0,
    "version_info": 0,
    "warnoptions": 0,
    "winver": 0
}


const reqKeyDict = {"keyword": kwArray, "package": pgArray}


function chocieKW(prefix) {
    let candidateList = []
    let serchArray = undefined

    // prefix = prefix.replace(/\n/g, " ")
    let spArray = prefix.split("\n")
    prefix = prefix.includes('\n') && !prefix.endsWith("\n") ? spArray[spArray.length - 1] : prefix

    if (!prefix.endsWith(" ")) {
        let splitList = prefix.split(" ")

        prefix = splitList[splitList.length - 1]

        if (splitList[splitList.length - 2] === "from") {
            serchArray = pgArray
        }
        else if (splitList[splitList.length - 2] === "import") {
            serchArray = pgContentArray
        }
        else {
            serchArray = kwArray
        }
    }
    else {
        serchArray = kwArray
    }

    Object.entries(serchArray).forEach(([k, v]) => {
        if (prefix.length < k.length && k.startsWith(prefix)) {  // k.includes(p)
            candidateList.push(k)
        }
    })

    return candidateList
}

function checkArg(arg) {
    if (typeof arg !== "object") {
        console.warn(`api接收到的对象不是'object'类型,而是'${typeof arg}'类型,请检测发生的信息!`)
    } else {
        let key = Object.keys(arg)[0]
        if (key in reqKeyDict) {

            return arg[key]
        }
        else {
            console.warn(`api接收到的对象中没有需求类型,例如'data',收到的对象'${JSON.stringify(arg)}'!`)
        }
    }
    return undefined
}

export default [
    {
        url: '/api',
        method: 'post',
        response: (data) => {
            return {
                data: chocieKW(checkArg(data.body))
            }
        }
    }
]
