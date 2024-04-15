<!--
  Copyright (c) 2024. All rights reserved.
  This source code is licensed under the CC BY-NC-SA
  (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  This software is protected by copyright law. Reproduction, distribution, or use for commercial
  purposes is prohibited without the author's permission. If you have any questions or require
  permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<template>
  <div class="main">
    <div class="toolbar">Top content</div>
    <div class="optionblock">
      <div class="fileblock">
        <fileBlock />
      </div>
      <div class="editblock">
        <typeBlock />
      </div>
    </div>
  </div>
</template>

<script>
import typeBlock from "@/components/typeBlock.vue";
import fileBlock from "@/components/fileBlock.vue"

export default {
  components: {
    typeBlock,
    fileBlock
  }
}
</script>

<style src="./assets/css/style.css"></style>
