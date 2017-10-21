<template>
  <section class="container" :style="getStyle">
    <div class="container-box" v-clickoutside='handleClose'>
      <input type="type" 
        class="input" 
        @click.stop="flagShow = true" 
        v-model="field" 
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        @input="handleChange($event.target.value)">
      <transition name="fade">
        <ul class="list" v-show="flagShow">
          <li class="item" v-for="(item,index) in filterList" :key="index" @click="select(item)">{{getDisplayFieldName(item)}}</li>
          <slot name='empty' v-if="filterList.length==0">
            <div class="empty">
              暂无数据
            </div>
          </slot name='empty'>
        </ul>
      </transition>
      <section class="select-area">
        <span v-if="$slots.default" class="slot">
          <slot></slot>
        </span>
        <span class="selected-tag" v-for="(item,index) in tags" :key="index">{{getDisplayFieldName(item,'tag')}}
          <span class="remove" @click="remove(index)"></span>
        </span>
      </section>
    </div>
  </section>
</template>
<script>
import Clickoutside from 'js/clickoutside';
export default {
  name: 'SelectFilter',

  componentName: "SelectFilter",

  directives: { Clickoutside },

  props: {
    list: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    displayField: { //下拉列表显示的字段
      type: [String, Array],
      default: 'name'
    },
    outputField: { //输出的字段
      type: String,
      default: 'id'
    },
    ifFilter: {
      type: Boolean,
      default: false //默认不过滤
    },
    apiSrc: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    conWidth: String,
    tags: {
      type: Array,
      default: function () {
        return []
      }
    },
    isTag: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      flagShow: false,
      display: "",
      field: ""
    }
  },

  created() {
    if (this.apiSrc) {
      this.$http.get('/someUrl').then(response => {
        this.list = response.body;
      }, response => {

      });
    }
  },

  computed: {
    getStyle() {
      if (this.conWidth.indexOf('%') == -1) {
        return `width:${this.conWidth}px`;
      }
      return `width:${this.conWidth}`;
    },

    filterList() {
      if (this.ifFilter) {
        let _self = this;
        let field = this.field;
        let tempDisplay;
        return this.list.filter(function (item) {
          tempDisplay = item[_self.displayField];
          return tempDisplay.toLowerCase().indexOf(field.toLowerCase()) != -1
        });
      } else {
        return this.list;
      }
    }
  },

  methods: {
    getDisplayFieldName(item, type) {
      const displayFieldType = typeof this.displayField; 
      if (displayFieldType === 'string') {
        return item[this.displayField]
      } else {
        if(type==='tag') {
          return item[this.displayField[0]]
        } else {
          return (this.displayField || []).reduce((str, val, index)=>{
            if (index === 0) {
              str = item[val];
            } else {
              str = `${str}--${item[val]}`;
            }
            return str
          }, '')
        }
        
      }
    },

    select(item) {
      if (this.isTag) {
        this.field = '';
        this.$emit('input', '');
        this.$emit('handleTags', item);
      } else {
        const displayFieldType = typeof this.displayField; 
        item[this.outputField] && this.$emit('input', item[this.outputField], item);
        if (displayFieldType === 'string') {
          this.field = item[this.displayField] || '';
        } else {
          this.field = item[this.displayField[0]] || '';
        }
      }

      this.flagShow = false;
    },

    handleClose() {
      this.flagShow = false;
    },

    handleChange(value) {
      this.$emit("input", value);
    },

    remove(index) {
      this.$emit('handleTags', index);
    },

    focus($event) {
      this.$emit('focus', this);
    },

    blur($event) {
      this.$emit('blur',this);
    }
  }
}
</script>

<style scoped>
.container-box {
  position: relative;
}

.container-box .input {
  width: 100%;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  padding-left: 10px;
}

.container-box .list {
  position: absolute;
  left: 0;
  right: 0;
  top: 35px;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #fff;
  border: 1px solid #ccc;
  max-height: 400px;
  overflow: auto;
  z-index: 88;
}

.container-box .list .item {
  height: 22px;
  font-size: 12px;
  color: #242600;
  line-height: 22px;
  padding-left: 10px;
}

.container-box .list .item:hover {
  background: #f6fdff;
  cursor: pointer;
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
    margin-right: 12px;
    margin-bottom: 10px;
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
.empty {
  width: 100%;
  height: 20px;
  padding: 2px;
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
