<style scoped>
.popup {
  /*background-color: transparent;*/
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 6000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .4);
  .loading-box,
  .tip-box {
    border-radius: 4px;
    .icon {
      display: block;
      width: 50px;
      height: 50px;
      margin: 0 auto 10px;
    }
    p {
      padding: 0 10px;
      font-size: 14px;
      text-align: center;
    }
  }
  .loading-box {
    padding-top: 33px;
    min-width: 200px;
    height: 120px;
    background: #444;
    .icon {
      animation: circle 1s linear 0s infinite;
    }
    p {
      color: #fff;
    }
  }
  .tip-box {
    min-width: 240px;
    max-width: 600px;
    padding: 20px 65px;
    border: 1px solid #9c9;
    background: #f0fff0;
    .icon {
      background: url(../../assets/tips.png) no-repeat 0 0;
    }
    p {
      color: #333;
      line-height: 1.2;
    }
    &.warning {
      border-color: #f8d29a;
      background: #fff1dc;
      .icon {
        background-position: 0px -50px;
      }
    }
  }
}

@keyframes circle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <section class="popup" v-show="showFlag">
    <div class="loading-box" v-if="loading">
      <img class="icon" src="../../assets/loading.png">
      <!-- <p>{{ loadingText }}</p> -->
    </div>
    <div class="tip-box" :class="{'warning': warning}" v-else>
      <div class="icon"></div>
      <p>{{ msg }}</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loadingText: "正在加载，请稍候!",
      loading: false,
      showFlag: false,
      msg: '',
      warning: false
    }
  },

  methods: {
    hide() {
      this.showFlag = false;
    },
    show(time = 800) {
      this.showFlag = true;
      setTimeout(() => {
        this.showFlag = false;
      }, time);
    },
    loadingShow() {
      this.showFlag = true;
    },
  },

  created() {
    const _self = this;
    globalBus.$on('success', (msg, time) => {
      _self.hide();
      setTimeout(() => {
        _self.loading = false;
        _self.warning = false;
        _self.msg = msg;
        _self.show(time);
      }, 0);
    });
    globalBus.$on('warning', (msg, time) => {
      if (!msg) {
        return;
      }
      _self.hide();
      setTimeout(() => {
        _self.loading = false;
        _self.warning = true;
        _self.msg = msg;
        _self.show(time);
      }, 0);
    });
    globalBus.$on('loading', (text) => {
      text && (_self.loadingText = text);
      _self.loading = true;
      _self.loadingShow();
    });
    globalBus.$on('loadingHide', () => {
      _self.loadingText = "正在加载，请稍候!";
      _self.hide();
    });
  }
}
</script>
