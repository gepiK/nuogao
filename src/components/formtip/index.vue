<style scoped>
  .sn-formtip {
    font-size: 12px;
    color: #6E7690;
    text-align: center;

    img {
      display: inline-block;
      vertical-align: text-bottom;
      width: 16px;
      height: auto;
      margin-right: 6px;
    }
  }
</style>

<template>
  <div class="sn-formtip" :style="{'text-align': align}">
    <img src="./assets/info.png" v-if="!warning">
    <img src="./assets/warning.png" v-else>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      warning: Boolean,
      align: String,
    }
  }
</script>
