<template>
  <section class="container" :style="{'width': width + 'px'}">
    <div class="inputs-box" @click.stop="showBox">
      <span class="text">{{display?display:placeholder}}</span>
      <span class="arrow-icon" :class="{'active': flagShow}"></span>
    </div>
    <transition name="fade">
      <div class="content" v-show="flagShow">
        <input type="text" class="input" v-model="filter" v-if="hasInput">
        <ul class="list">
          <li class="item" v-for="(item, index) in filterList" :key="index" @click.stop="select(item)">{{item[displayField]}}</li>
        </ul>
      </div>
    </transition>
  </section>
</template>
<script>
import emitter from 'js/emitter';
export default {
  name: 'Select',
  componentName: 'Select',
  mixins: [emitter],
  props: {
    list: Array,
    displayField: { //下拉列表显示的字段
      type: String,
      default: 'name'
    },
    outputField: { //输出的字段
      type: [String, Object],
      default: 'id'
    },
    outputType: {
      type: String,
      default: 'string'
    },
    value: [Number, String, Object],
    placeholder: {
      type: String,
      default: ''
    },
    width: String,
    hasInput: {
      type: Boolean,
      default: true
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      flagShow: false,
      currentValue: this.value,
      filter: '',
      display: ''
    }
  },
  watch: {
    'value'(val, oldValue) {
      this.setCurrentValue(val);
    }
  },
  computed: {
    filterList() {
      let _self = this;
      let field = this.filter;
      let tempDisplay;
      return this.list.filter(function (item) {
        tempDisplay = item[_self.displayField];
        return tempDisplay.toLowerCase().indexOf(field.toLowerCase()) != -1;
      });
    }
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.flagShow = false;
    })
    if (this.value) {
      this.display = this.value;
    }
  },
  methods: {
    select(item) {
      if (this.outputType == 'object') {
        item[this.outputField] && this.$emit("input", item);
      } else {
        item[this.outputField] && this.$emit("input", item[this.outputField]);
      }
      this.display = item[this.displayField];
      this.flagShow = false;

    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('FormItem', 'form.change', [value]);
      }
    },
    showBox(e) {
      if (window.innerHeight - e.y < 230) {
        // $(this.$el).find(".content")[0].style.top = "-55px";
      }
      this.flagShow = !this.flagShow;
    }
  }
}
</script>
<style scoped>
.container {
  position: relative;
}

.container .inputs-box {
  position: relative;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

.container .inputs-box:hover {
  cursor: pointer;
}

.container .arrow-icon {
  position: absolute;
  display: inline-block;
  width: 12px;
  height: 12px;
  top: 10px;
  right: 12px;
  background: url(../../assets/bg_drop_down.png) no-repeat;
  background-size: 100% 100%;
}

.container .arrow-icon.active {
  transform: rotate(180deg);
}

.container .content {
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  padding: 10px 0 0 10px;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 99999;
  border-radius: 4px;
}

.container .content .input {
  display: block;
  width: calc(100% - 10px);
  height: 28px;
  border: 1px solid #ccc;
  padding-left: 16px;
  border-radius: 2px;
  font-size: 12px;
  color: #666666;
}

.container .content .list {
  max-height: 193px;
  overflow: auto;
}

.container .content .list .item {
  font-size: 12px;
  color: #000027;
  line-height: 22px;
}

.container .content .list .item:hover {
  background: #f6fdff;
  cursor: pointer;
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
