<style scoped>
.form-item.is-error .input-box .input__inner,
.form-item.is-error .textarea-box .textarea__inner
{
  border: 1px solid #f47b77;
  border-radius: 4px;
}

.container-box {
  &.is-error .textarea-box .textarea__inner {
    border: 1px solid #f47b77;
    border-radius: 4px;
  }
  &.lg {
    .input__inner {
      height: 40px;
    }
  }
  .input-box {
    position: relative;
    &.no-border {
      .input__inner {
        border: none;
      }
    }
    &.is-disabled {
      .input__inner {
        cursor: not-allowed;
        background-color: #eef1f6;
        border-color: #d1dbe5;
        color: #bbb;
      }
    }
    .input__inner {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      box-sizing: border-box;
      color: #666;
      display: block;
      font-size: 12px;
      height: 32px;
      line-height: 1;
      outline: none;
      padding: 3px 26px 3px 10px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 100%;
      &.is-error {
        border-color: #ff4949;
      }
      &:focus:not(.is-error) {
        border-color: #20a0ff;
      }
    }
    .words {
      position: absolute;
      top: 10px;
      color: #bbb;
      right: 10px;
    }
    .err-tip {
      color: #ff4949;
      font-size: 13px;
      position: absolute;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
  }
  .textarea-box {
    position: relative;
    &.top {
      .words {
        top: -22px;
        right: 10px;
      }
    }
    &.is-disabled {
      .textarea__inner {
        cursor: not-allowed;
        background-color: #eef1f6;
        border-color: #d1dbe5;
        color: #bbb;
      }
    }
    .textarea__inner {
      display: block;
      resize: none;
      overflow: auto;
      padding: 5px 7px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: 14px;
      color: #666;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
    .words {
      position: absolute;
      bottom: 10px;
      color: #bbb;
      right: 10px;
    }
  }
}
</style>
<template>
  <div class="container-box">
    <div :class="['input-box',{'is-disabled':disabled},{'no-border':noBorder}]"
      v-if="type !== 'textarea'">
      <input class="input__inner"
        :class='{"is-error": errMsg!=="" }'
        v-bind="$props"
        :value="currentValue"
        :maxlength="maxLimitLength"
        :placeholder = "placeholder"
        :inputType = "inputType"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :style="getStyle"
        :disabled="disabled"
        :readOnly="readOnly">
      <span v-if="showWord"
        class="words"
        :style="getWordStyle">{{($props.value||'').trim().length}}/{{totalWords}}</span>
      <span class="err-tip" v-show='errMsg!==""'>{{errMsg}}</span>
    </div>
    
    <div :class="['textarea-box',{'is-disabled':disabled},alignWord]"
      v-else>
      <textarea class="textarea__inner"
        :value="currentValue"
        :maxlength="maxLimitLength"
        @input="handleInput"
        ref="textarea"
        v-bind="$props"
        @focus="handleFocus"
        @blur="handleBlur"
        :style="getStyle"
        :rows="rows">
      </textarea>
      <span v-if="showWord"
        class="words"
        :style="getWordTextStyle">{{($props.value||'').trim().length}}/{{totalWords}}</span>
    </div>
  </div>
</template>
<script>
import emitter from 'js/emitter';
export default {
  name: 'Input',
  componentName: 'Input',
  mixins: [emitter],
  props: {
    value: [String, Number],
    placeholder: String,
    disabled: Boolean,
    align: {
      type: String,
      default: 'left'
    },
    width: {
      type: String,
      default: '360'
    },
    height: [String, Number],
    radius: {
      type: String,
      default: '4'
    },
    type: {
      type: String,
      default: 'text'
    },
    showWord: {
      type: Boolean,
      default: false
    },
    alignWord: {
      type: String,
      default: 'bottom'
    },
    inputType:{
      type: String,
      default: 'String'
    },
    name: String,
    rows: {
      type: Number,
      default: 2
    },
    maxlength: [Number,String],
    minlength: [Number,String],
    validateEvent: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    totalWords: {
      type: Number,
      default: 30
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    reg: {
      type: RegExp
    },
    hint: {
      type: String //提示
    },
    autoValid: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    inputHeight() {
      let defaultHeight = '32';
      if( this.type === 'textarea') {
        defaultHeight = '75';
      }

      return this.height || defaultHeight;
    },

    getStyle() {
      if (this.width.indexOf('%') != -1) {
        return `width:${this.width};height:${this.inputHeight};border-radius:${this.radius}px;text-align:${this.align}`
      }
      return `width:${this.width}px;height:${this.inputHeight}px;border-radius:${this.radius}px;text-align:${this.align}`
    },

    getWordStyle() {
      return `left: ${this.width - 45}px`;
    },

    getWordTextStyle() {
      return `left: ${this.width - 45}px`;
    },

    maxLimitLength() {
      if (this.showWord) {
        return this.maxlength||(this.totalWords);
      }

      return this.maxlength;
      
    }
  },
  data() {
    return {
      currentValue: this.value,
      errMsg: ''
    }
  },

  watch: {
    value(val, oldValue) {
      let value = val;
      if(this.inputType == 'number'){
        value = value.replace(/[^\d]/g,'');
      }
      this.setCurrentValue(value);
    }
  },
  created() {
    this.$on('inputSelect', this.inputSelect);
  },

  methods: {
    check(watchVal = this.value) {
      let val = (watchVal||"").trim();
      this.errMsg = "";
      if (val === '') {
        if (this.required) {
          this.errMsg = '不能为空';
          return;
        }
      } else {
        if (this.minlength) {
          if (val.length < this.minlength) {
            this.errMsg = `字符长度不能小于${this.minlength}`;
            return;
          }
        }

        if (this.maxLimitLength) {
          if (val.length > this.maxLimitLength) {
            this.errMsg = `字符长度不能大于${this.maxLimitLength}`;
            return;
          }
        }

        if (this.reg) {
          if (!this.reg.test(val)) {
            this.errMsg = this.hint || '输入有误';
            return;
          }
        }
      }

      return true;
    },

    focus() {
      this.$refs.input.focus();
    },

    setMsg(val) {
      this.errMsg = val;
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    handleBlur(event) {
      if (this.autoValid) {
        this.check();
      }
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('FormItem', 'form.blur', [this.currentValue]);
      }
    },

    handleInput(event) {
      let value = event.target.value.trim();
      if (this.autoValid) {
        this.check(value);
      }
      this.$emit('input', value);
      this.setCurrentValue(value);
      this.$emit('change', value);
    },
    
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('FormItem', 'form.change', [value]);
      }
    },
  }
}
</script>
