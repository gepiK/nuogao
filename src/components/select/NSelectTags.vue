
<template>
  <section class="container" :style="getStyle">
    <input type="text" class="input" v-model="value" />
    <sn-button class="search-btn" :disabled="disabled" type="primary" @click="search">搜索</sn-button>
    <transition name="fade">
      <div class="tags" v-show="flagShow">
        <div class="tags-list">
          <span class="tab-item" @click.stop="select(item)" v-for="(item,index) in tags" :key="index">{{ item[displayField] }}</span>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
export default {
  props: {
    tags: Array,
    width: String,
    outputField: {
      type: String,
      default: 'id'
    },
    displayField: {
      type: String,
      default: 'name'
    },
  },
  data() {
    return {
      flagShow: false,
      disabled: true,
      value: "",
    }
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.flagShow = false;
    })
  },
  watch: {
    value(val,oldVal){
      if(val != ''){
        this.disabled = false;
      }else{
        this.disabled = true;
      }
    }
  },
  computed: {
    getStyle() {
      return `width:${this.width}px;`;
    }
  },
  methods: {
    select(item) {
      this.flagShow = false;
      this.$emit("select", item);
    },
    search(){
      this.$emit("search", this.value);
    },
    showSelect () {
      this.flagShow = true;
    }
  }
}
</script>
<style scoped>
.container {
  position: relative;
  .input {
    width: 100%;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 10px;
    background: #fff;
  }
  .search-btn{
    position:absolute;
    border-radius:0;
    right:0;
    top:0;
    min-width:auto;
    padding:0 20px;
    height:32px;
  }
  .tags {
    position: absolute;
    left: 0;
    right: 0;
    top: 35px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    padding: 8px;
    z-index: 99;
    .title {
      position: relative;
      font-size: 12px;
      color: #BBBBBB;
      line-height: 22px;
      padding: 0 6px;
      &:after {
        content: "";
        position: absolute;
        top: 10px;
        left: 67px;
        right: 5px;
        display: inline-block;
        height: 1px;
        opacity: 0.5;
        background: #C9D0E1;
      }
    }
    .tab-item {
      display: inline-block;
      padding: 0 12px;
      height: 24px;
      line-height: 24px;
      border: 1px solid #0ABBFE;
      border-radius: 16px;
      margin-top: 10px;
      margin-left: 5px;
      &:hover {
        background: #0ABBFE;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .select-area {
    margin-top: 10px;
    .slot {
      margin-right: 12px;
    }
    .selected-tag {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      height: 28px;
      line-height: 28px;
      min-width: 64px;
      border: 1px solid #09BBFE;
      color: #666;
      vertical-align: top;
      padding: 0 22px 0 10px;
      border-radius: 16px;
      &+.selected-tag {
        margin-left: 12px;
        margin-bottom: 10px;
      }
      .remove {
        position: absolute;
        right: 8px;
        top: 10px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: url(../../assets/icon_close.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
