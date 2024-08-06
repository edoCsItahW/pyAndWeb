#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-SA
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<edocsitahw>----------------------------
# 传建时间: 2024/7/16 下午2:11
# 当前项目名: vueOperation.py
# 编码模式: utf-8
# 注释: 
# -------------------------<edocsitahw>----------------------------
from os import path, PathLike, listdir, walk, rename, remove
from typing import Literal, TypedDict
from shutil import move
from functools import cache, cached_property
from warnings import warn
from re import sub, compile, findall
from systemTools import instruct

ModeType = Literal['abs', 'dir']


class ModifyInfo(TypedDict):
    suffix: str
    subDirName: str
    modifyPath: str | PathLike[str]


class NotAbsPathError(Exception):
    pass


class autoDist:
    def __init__(self, distPath: str | PathLike[str], toPath: str | PathLike[str], *, staticDirName: str = 'static'):
        self._checkPath(distPath, mode=['abs', 'dir'])
        self._checkPath(toPath, mode=['abs', 'dir'])

        self._ins = instruct(ignore=True)

        self._distPath = distPath
        self._toPath = toPath
        self._staticDirName = staticDirName

    @cached_property
    def assetsPath(self) -> str | PathLike[str]:
        return self._checkPath(path.join(self._distPath, 'assets'))

    @cached_property
    def indexPath(self) -> str | PathLike[str]:
        return self._checkPath(path.join(self._distPath, 'index.html'))

    @cached_property
    def jsPath(self) -> str | PathLike[str]:
        return self._checkPath(self._filePath(self.assetsPath, suffix='js'))

    @cached_property
    def cssPath(self) -> str | PathLike[str]:
        return self._checkPath(self._filePath(self.assetsPath, suffix='css'))

    @cached_property
    def staticPath(self):
        return path.join(self._toPath, self._staticDirName)

    @cache
    def _filePath(self, basePath: str | PathLike[str], *, suffix: str) -> str | PathLike[str]:
        for file in listdir(basePath):
            if file.endswith(f".{suffix}"):
                return path.join(basePath, file)

        warn(
            f"No {suffix} file found in {basePath}")

    @staticmethod
    def _rename(src: str | PathLike[str], dst: str | PathLike[str], *, force: bool = False):
        if force and path.exists(p := path.join(dst)):
            remove(p)

        try:
            rename(src, dst)
        except FileExistsError:
            pass

    @staticmethod
    def _checkPath(_path: str | PathLike[str], *, mode: ModeType | list[ModeType] = None) -> str | PathLike[str]:
        if not path.exists(_path):
            raise FileNotFoundError(
                f"The path '{_path}' does not exist!")

        match mode:
            case None:
                return _path

            case 'abs':
                if not path.isabs(_path):
                    raise FileNotFoundError() from NotAbsPathError(
                        f"The path '{_path}' is not an absolute path!")

            case 'dir':
                if not path.isdir(_path):
                    raise NotADirectoryError(
                        f"The path '{_path}' is not a directory!")

            case _:
                if isinstance(mode, list):
                    for m in mode:
                        autoDist._checkPath(_path, mode=m)

                else:
                    raise ValueError(
                        f"The argument '{mode}' is not a valid mode!")

        return _path

    def _moveFile(self, filePath: str | PathLike[str], *, modeifyIndex: bool = False, subDirName: str = None):

        _, suffix = path.basename(filePath).split('.')

        if subDirName is None: subDirName = suffix

        try:

            self._rename(filePath, path.join(self.staticPath, subDirName, path.basename(filePath)))

        except FileExistsError:
            pass

        if modeifyIndex:
            with open(self.indexPath, 'r+', encoding='utf-8') as file:
                content = file.read()

                constent = sub(fr'(?<=")(/assets/)(index-.*\.{suffix})(?=")', fr'../static/{suffix}/\2', content)

                file.seek(0)
                file.write(constent)

    def _autoMove(self, dirPath: str | PathLike[str], *modifyInfo: ModifyInfo):

        files = listdir(dirPath)

        for info in modifyInfo:
            for file in files:
                if file.endswith(info['suffix']):
                    self._moveFile(path.join(dirPath, file), subDirName=info['subDirName'])
                    if path.exists(info['modifyPath']):
                        with open(info['modifyPath'], 'r+', encoding='utf-8') as f:
                            content = f.read()

                            content = sub(pattren := rf"(?<=url\()(/assets/)({file})(?=\))",
                                          rep := fr'../{info["subDirName"]}/\2', content)

                            f.seek(0)
                            f.write(content)

    def move(self):
        self._moveFile(self.jsPath, modeifyIndex=True)
        self._moveFile(self.cssPath, modeifyIndex=True)

        self._autoMove(self.assetsPath,
                       {
                           'suffix':     'ttf',
                           'subDirName': 'font',
                           'modifyPath': path.join(self.staticPath, 'css', path.basename(self.cssPath))
                       },
                       {
                           'suffix':     'woff',
                           'subDirName': 'font',
                           'modifyPath': path.join(self.staticPath, 'css', path.basename(self.cssPath))
                       },
                       {
                           'suffix':     'woff2',
                           'subDirName': 'font',
                           'modifyPath': path.join(self.staticPath, 'css', path.basename(self.cssPath))
                       }
                   )

        self._rename(self.indexPath, path.join(self._toPath, 'template', 'index.html'), force=True)

        self._ins('rd /s /q ' + self._distPath)


if __name__ == '__main__':
    autoDist(r"E:\codeSpace\codeSet\web\project\examPlatform\dist", r"E:\codeSpace\codeSet\pyAndWeb\project\examPlatform").move()
