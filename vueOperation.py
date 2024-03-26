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
from os import PathLike, path


class vue:
    def __init__(self, rootDir: PathLike[str] | str):
        self._rootDir = rootDir

        if not path.isabs(self._rootDir):
            raise RuntimeError() from FileNotFoundError()


if __name__ == '__main__':
    ins = vue(r"D:\xst_project_202212\codeSet\pyAndWeb\project\questionScrolling\vueDev\exam")
