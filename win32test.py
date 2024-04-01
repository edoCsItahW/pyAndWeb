#! /user/bin/python3

#  Copyright (c) 2024. All rights reserved.
#  This source code is licensed under the CC BY-NC-ND
#  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
#  This software is protected by copyright law. Reproduction, distribution, or use for commercial
#  purposes is prohibited without the author's permission. If you have any questions or require
#  permission, please contact the author: 2207150234@st.sziit.edu.cn

# -------------------------<Lenovo>----------------------------
# 传建时间: 2024/3/29 8:47
# 当前项目名: pyAndWeb
# 编码模式: utf-8
# 注释: 
# -------------------------<Lenovo>----------------------------
import win32gui
import win32con


def get_all_window_handles():
    def callback(hwnd, hwnds):
        if win32gui.IsWindowVisible(hwnd):
            hwnds.append(hwnd)
        return True

    hwnds = []
    win32gui.EnumWindows(callback, hwnds)
    return hwnds


def get_window_title(hwnd):
    title = win32gui.GetWindowText(hwnd)
    return title


def find_window_by_title(title):
    hwnd = win32gui.FindWindow(None, title)
    return hwnd


def bring_window_to_front(hwnd):
    win32gui.ShowWindow(hwnd, win32con.SW_RESTORE)
    win32gui.SetForegroundWindow(hwnd)


if __name__ == "__main__":
    window_handles = get_all_window_handles()
    for handle in window_handles:
        # print(handle)
        # print(f"'{get_window_title(handle)}'")
        pass

    window_title = "pyAndWeb – win32test.py"  # 指定要查找的窗口标题
    hwnd = find_window_by_title(window_title)

    if hwnd:
        bring_window_to_front(hwnd)
    else:
        print("Window not found.")
