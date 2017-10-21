
<template>
  <section class="container" :style="getStyle">
    <input type="text" class="input" @click.stop="flagShow =! flagShow" v-model="display" @input="hand($event.target.value)">
    <transition name="fade">
      <div class="tags" v-show="flagShow&&!display.length">
        <h3 class="title">热门标签</h3>
        <div class="tags-list">
          <span class="tab-item" @click.stop="select(item)" v-for="(item,index) in tags" :key="index" v-text="item[displayField]"></span>
        </div>
      </div>
    </transition>
    <section class="select-area">
      <span v-if="$slots.default" class="slot">
        <slot></slot>
      </span>
      <span class="selected-tag" v-for="(item,index) in selectedList" :key="index">{{item[displayField]}}
        <span class="remove" @click="remove(item)"></span>
      </span>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    value: {},
    tags: Array,
    width: String,
    presetVal: [String, Number],
    outputField: {
      type: String,
      default: 'id'
    },
    outputType: {
      type: String,
      default: 'array'
    },
    displayField: {
      type: String,
      default: 'name'
    },
  },
  data() {
    return {
      flagShow: false,
      display: "",
      selectedList: [],
      output: []
    }
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.flagShow = false;
    })
  },
  created() {
    //todo 根据外部传进来的  v-model 值调接口查询有没有该标签，若有则显示
    //这里先根据预置标签先判断
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i][this.outputField] == this.value) {
        this.selectedList = [this.tags[i]];
        break;
      }
    }
  },
  watch: {
    presetVal(val, oldVal) {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i][this.outputField] == val) {
          this.selectedList = [this.tags[i]];
          this.$emit("input", val);
          break;
        }
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
      item.selected = true;
      this.selectedList = [item];
      if (this.outputType == 'object') {
        this.$emit("input", item);
      } else {
        this.$emit("input", item[this.outputField]);
      }
      this.flagShow = false;
    },
    remove(item) {
      item.selected = false;
      this.selectedList = [];
      this.$emit("input", "");
    },
    hand(value) {
      // this.$emit("input", value);
      //调接口查询相关标签
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
