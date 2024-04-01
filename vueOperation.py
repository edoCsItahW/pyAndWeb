#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/28 18:26
# 当前项目名: pyAndWeb
# 编码模式: utf-8
# 注释:
# -------------------------<Lenovo>----------------------------
from systemTools import instruct
from functools import wraps, cached_property
from threading import Thread
from inspect import stack
from typing import Callable, Literal
from time import sleep
from os import PathLike, path, remove, mkdir
from re import sub, Pattern, RegexFlag, DOTALL, NOFLAG

__copyright__ = """/*
 Copyright (c) 2024. All rights reserved.
 This source code is licensed under the CC BY-NC-ND
 (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 This software is protected by copyright law. Reproduction, distribution, or use for commercial
 purposes is prohibited without the author's permission. If you have any questions or require
 permission, please contact the author: 2207150234@st.sziit.edu.cn
 */\n"""

jsInitStr = """export default {
    data() {
        return {
        }
    },
    methods: {
    }
}"""

viteStr = """import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({mockPath: './src/mock'})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
"""

indexStr = """import { createProdMockServer } from "vite-plugin-mock/client"
import MockMethod from './api'

export function setupProdMockServer() {
  createProdMockServer([...MockMethod])
}
"""

apiStr = """export default [
  {
    url: '/mock/api/test', //请求地址
    method: 'get', //请求方式
    response: () => {
      return {
        code: 200,
        msg: 'ok',
        data: ''
      }
    },
  },
]
"""


class handleError:
    errorLog = []

    @classmethod
    def getparam(cls, param = None):
        def getfunc(func):
            wraps(func)

            def wapper(*args, **kwargs):
                res = func(*args, **kwargs)

                cls.getInfo()

                return res

            return wapper

        return getfunc

    @staticmethod
    def getInfo():
        print(f"B 在 {(line := (call := stack()[1])[2])} 被 {call[3]} 调用")


# Wrap


class vue:
    """
    1. 删除README.md(no condition)
    2. 修改index.html(no condition)
    3. 清空components(no condition)
    4. 清空assets(no condition)
    5. 修改main.js(no condition)
    6. 修改App.vue(no condition)
    7. 创建static文件夹(清空assets之后)
    8. 创建js,css文件(创建static文件夹之后)
    """

    def __init__(self, rootDir: PathLike[str] | str):
        self._rootDir = rootDir

        self._vueInit = vueInit(rootDir)
        self._vueMock = vueMock(rootDir)

        if not path.isabs(self._rootDir):
            raise RuntimeError() from FileNotFoundError()

        self.flagDict = {"cleanC": True, "createF": False, "createS": False}

        self.threadList = []

    @property
    def rootDir(self):
        return self._rootDir

    @cached_property
    def projectName(self):
        return path.basename(self.rootDir)

    @property
    def vueInit(self):
        return self._vueInit

    @property
    def vueMock(self): return self._vueMock

    @staticmethod
    def replaceFileContent(_path: str | PathLike[str], __old: str = None, __new: str = "", *, _sub: bool | Pattern[str] | str = False, flag: RegexFlag | int = NOFLAG):

        with open(_path, "r", encoding="utf-8") as file:

            text = file.read()

        with open(_path, "w", encoding="utf-8") as file:

            if _sub and not __old:

                text = sub(_sub, __new, text, flags=flag)
                file.write(text)

            else:

                file.write(text.replace(__old, __new))

    def threadProcessor(self, func: Callable, flag: dict = None, key: str = None, args: tuple = (), *, time: int = 0.5, kewargs: dict = None, outFlag: dict = None, outKey: str = None, outValue: bool | str = True) -> None:
        """
        线程管理器

        :param func: 目标函数.
        :type func: Callable
        :param flag: 启动信号字典.
        :type flag: dict
        :param key: 信号预定键.
        :type key: str
        :param args: 参数
        :type args: tuple
        :keyword time: 睡眠间隔.
        :type time: int
        :keyword kewargs: 关键字参数
        :type kewargs: dict
        :keyword outFlag: 输出信号字典
        :type outFlag: dict
        :keyword outKey: 输出信号预定键
        :type outKey: str
        :keyword outValue: 输出值
        :type outValue: str
        :return: 操作执行函数不做返回
        :retype: None
        :raise ValueError: outFlag与outTime没有同时填写或不填写.
        """
        if not flag or not key: flag, key = {"auto": True}, "auto"
        if kewargs is None: kewargs = {}

        print(f"'{func.__name__}' 开始运行")

        def middleware(_func: Callable, _flag: dict, _key: str, _args: tuple = (), *, _time: int = 0.5, _kewargs: dict = None, _outFlag: dict = None, _outKey: str = None, _outValue: bool | str = True):
            if _kewargs is None: _kewargs = {}

            while not _flag[_key]:
                sleep(_time)

            result = _func(*args, **kewargs)

            if _outKey:
                if _outFlag:
                    _outFlag[_outKey] = _outValue

                else:
                    _flag[_outKey] = _outValue

            return result

        if bool(outFlag) is not bool(outKey) and not outKey:
            raise ValueError(f"outFlag与outKey应同时填写或不填写,输入outFlag: '{outFlag}', outKey: '{outKey}'")

        self.threadList.append(thread := Thread(target=middleware, args=(func, flag, key, args), kwargs={"_time": time, "_kewargs": kewargs, "_outFlag": outFlag, "_outKey": outKey, "_outValue": outValue}))

        thread.start()

    def beginInit(self):

        # self.vueInit.removeREADME()
        self.threadProcessor(self.vueInit.removeREADME)

        # self.vueInit.modeifyHTML()
        self.threadProcessor(self.vueInit.modeifyHTML)

        # self.vueInit.cleanComponents()
        self.threadProcessor(self.vueInit.cleanComponents)

        # self.vueInit.cleanAssets()
        self.threadProcessor(self.vueInit.cleanAssets, outFlag=self.flagDict, outKey="createS", outValue=True)

        # self.vueInit.modifyMainJs()
        self.threadProcessor(self.vueInit.modifyMainJs)

        # self.vueInit.modifyAppVue()
        self.threadProcessor(self.vueInit.modifyAppVue)

        # self.vueInit.createDir()
        self.threadProcessor(self.vueInit.createDir, flag=self.flagDict, key="createS", outKey="createF", outValue=True)

        # self.vueInit.createStaticFile()
        self.threadProcessor(self.vueInit.createStaticFile, flag=self.flagDict, key="createF")

        for thread in self.threadList:
            thread: Thread
            thread.join()

    def beginMock(self):

        self.vueMock.npmMock()

        self.vueMock.modeifyConfig()

        self.vueMock.createMockDir()

        self.vueMock.createIndex()

        self.vueMock.createApi()


class vueInit:  # (vue):
    def __init__(self, rootDir: PathLike[str] | str):
        self._rootDir = rootDir
        self.executor = instruct(ignore=True)
        # super().__init__(rootDir)

    @property
    def rootDir(self):
        return self._rootDir

    @cached_property
    def projectName(self):
        return path.basename(self.rootDir)

    @cached_property
    def srcPath(self):
        return path.join(self.rootDir, "src")

    @cached_property
    def assetsPath(self):
        return path.join(self.srcPath, "assets")

    @cached_property
    def jsDir(self):
        return path.join(self.assetsPath, "js")

    @cached_property
    def cssDir(self):
        return path.join(self.assetsPath, "css")

    def removeREADME(self, _path: str | PathLike[str] = None):

        if _path is None: _path = path.join(self.rootDir, "README.md")

        remove(_path)

    def modeifyHTML(self):
        vue.replaceFileContent(path.join(self.rootDir, "index.html"), None, "zh-Hans", _sub=r'(?<=lang=")en(?=")')

    def cleanComponents(self, srcPath: str | PathLike[str] = None):

        if srcPath is None: srcPath = self.srcPath

        self.executor(f"rd /s /q components", cwd=srcPath)

        mkdir(path.join(self.srcPath, "components"))

    def modifyMainJs(self, srcPath: str | PathLike[str] = None):

        if srcPath is None: srcPath = self.srcPath

        vue.replaceFileContent(path.join(self.srcPath, "main.js"), "main.css", f"css/{self.projectName}.css")

    def modifyAppVue(self, srcPath: str | PathLike[str] = None):

        if srcPath is None: srcPath = self.srcPath

        vue.replaceFileContent(path.join(srcPath, "App.vue"), _sub=r"(?<=<template>).*?(?=</template>)", flag=DOTALL)

        vue.replaceFileContent(path.join(srcPath, "App.vue"), _sub=r"(?<=<script setup>).*?(?=</script>)", flag=DOTALL)

        vue.replaceFileContent(path.join(srcPath, "App.vue"), _sub=r"(?<=<style scoped>).*?(?=</style>)", flag=DOTALL)

        vue.replaceFileContent(path.join(srcPath, "App.vue"), None, f" src='./assets/css/{self.projectName}.css'",
                               _sub=r"(?<=<style).*?(?=>)")

        vue.replaceFileContent(path.join(srcPath, "App.vue"), None, f" src='./assets/js/{self.projectName}.js'",
                               _sub=r"(?<=<script).*?(?=>)")

    def createDir(self, assetsPath: str | PathLike[str] = None):

        if assetsPath is None: assetsPath = self.assetsPath

        mkdir(path.join(assetsPath, "js"))
        mkdir(path.join(assetsPath, "css"))
        mkdir(path.join(assetsPath, "img"))

    def createStaticFile(self):

        with open(path.join(self.cssDir, f"{self.projectName}.css"), "w", encoding="utf-8") as file:
            file.write(__copyright__)

        with open(path.join(self.jsDir, f"{self.projectName}.js"), "w", encoding="utf-8") as file:
            file.write(f"{__copyright__}\n\n{jsInitStr}")

    def cleanAssets(self):

        self.executor(r"rd /s /q assets", cwd=self.srcPath)

        mkdir(path.join(self.srcPath, "assets"))


class vueBuild:
    def __init__(self):
        pass


class vueMock:
    def __init__(self, rootDir: str | PathLike[str]):
        self._rootDir = rootDir
        self.executor = instruct(ignore=True)

    @property
    def rootDir(self): return self._rootDir

    @cached_property
    def srcPath(self): return path.join(self.rootDir, "src")

    @cached_property
    def mockPath(self): return path.join(self.srcPath, "mock")

    def npmMock(self):

        self.executor("npm install vite-plugin-mock --save-dev", cwd=self.rootDir)

    def modeifyConfig(self):

        with open(path.join(self.rootDir, "vite.config.js"), "w", encoding="utf-8") as file:

            file.write(viteStr)

    def createMockDir(self):

        mkdir(path.join(self.srcPath, "mock"))

    def createIndex(self):

        with open(path.join(self.mockPath, "index.js"), "w", encoding="utf-8") as file:

            file.write(__copyright__ + indexStr)

    def createApi(self):

        with open(path.join(self.mockPath, "api.js"), "w", encoding="utf-8") as file:

            file.write(__copyright__ + apiStr)


@handleError.getparam(1)
def a():
    pass


if __name__ == '__main__':
    ins = vue(r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\vueDev\exam")
    # ins.beginInit()
    ins.beginMock()
    # MessageBox(0, "Hello PYwin32", "MessageBox", MB_OK | MB_ICONWARNING)
    pass
