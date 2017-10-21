<style scoped>
  .sn-toptip {
    position: fixed;
    top: 113px;
    left: 50%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 323px;
    height: 38px;
    margin-left: -35px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    transform: translateX(-50%);
    background-color: rgba(95,202,198,.9);

    img {
      display: block;
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
    &.fail {
      background-color: rgba(244,123,119,.9);
    }
  }
</style>

<template>
  <transition name="fade">
    <div class="sn-toptip" :class="{'fail': !success}" v-show="showFlag">
      <img src="../../assets/icon-success.png" v-if="success">
      <img src="../../assets/icon-fail.png" v-else>
      <p>{{ msg }}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      
    },
    data () {
      return {
        showFlag: false,
        success: true,
        msg: '',
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        setTimeout(() => {
          this.showFlag = false;
        }, 1500);
      },
    },
    mounted() {
      this.$nextTick(function () {
        globalBus.$on('tip-success', (msg) => {
          this.showFlag = false;
          this.success = true;
          this.msg = msg;
          this.show();
        });
        globalBus.$on('tip-fail', (msg) => {
          this.showFlag = false;
          this.success = false;
          this.msg = msg;
          this.show();
        });
      });
    }
  }
</script>
