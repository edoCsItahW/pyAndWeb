<!--
  Copyright (c) 2024. All rights reserved.
  This source code is licensed under the CC BY-NC-ND
  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  This software is protected by copyright law. Reproduction, distribution, or use for commercial
  purposes is prohibited without the author's permission. If you have any questions or require
  permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script src="./assets/js/politics.js"></script>

<template>
  <div id="container">
    <div class="imgcontainer">
      <img id="siftIco" src="./assets/imgs/siftIco.png" alt="筛选图标" @click="siftIndex++; handleClick()">
    </div>
    <div id="siftblock">
      <form id="siftfrom" action="/api/politics" name="label" method="post">
        <div class="class content">

        </div>
        <div class="chapter content">

        </div>
        <div class="other content">

        </div>
      </form>
    </div>
  </div>
  <h1>考试内容</h1>
  <div class="qsdiv">

  </div>
  <div class="begbutton" @click="beginExam">开始考试</div>
</template>

<style src="./assets/css/politics.css">
</style>
