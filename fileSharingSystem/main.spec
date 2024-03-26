# -*- mode: python ; coding: utf-8 -*-

# pyinstaller --onefile main.py  项目入口为main.py,而pyinstaller会自动打包依赖,且效果与-F形同
# --add-data参数可以保留结构,--add-data="static/css/;css/" (文件夹路径;打包好路径)
# 例如: pyinstaller --onefile --add-data="my_project/data/;data/" --add-data="my_project/images/;images/" main.py

# pyi-makespec --onefile main.py 生成spec文件

import sys
sys.setrecursionlimit(sys.getrecursionlimit() * 10)

a = Analysis(
    ['main.py'],
    pathex=["D:/xst_project_202212/codeSet/pyAndWeb/project/fileSharingSystem"],
    binaries=[],
    datas=[
    ('static/css/*', 'css/'),
     ('static/imgs/*', 'imgs/'),
      ('static/js/*', 'js/'),
       ('template/*', 'template/')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon="D:/download/tempDownload/图标-文件夹.ico"
)
