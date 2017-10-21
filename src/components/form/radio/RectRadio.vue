<style scoped>
.rect-radio {
  &+.rect-radio {
    margin-left: 20px;
  }
  .rect-radio-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: top;
    &.checked .rect-radio-inner {
      border: 1px solid #09BBFE;
      &:after {
        background-color: #09BBFE;
        border: none;
      }
    }
    .rect-radio-inner {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      border-radius: 16px;
      color: #a1a1a1;
      font-size: 14px;
      border: 1px solid #C1C1C1;
      padding: 0 14px 0 25px;
      &:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #C1C1C1;
        background-color: #FFFFFF;
        left: 10px;
        top: 9px;
      }
    }
    .rect-radio-original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
}
</style>
<template>
  <label class="rect-radio">
    <span class="rect-radio-input" :class="{'checked': model === label}">
      <span class="rect-radio-inner">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
      <input type="radio" class="rect-radio-original" :value="label" v-model="model" :name="name" :disabled="isDisabled">
    </span>
  </label>
</template>
<script>
import Emitter from 'js/emitter'
export default {
  name: 'RectRadio',
  mixins: [Emitter],
  componentName: 'RectRadio',
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String
  },
  data() {
    return {
      focus: false
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'RadioGroup') {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('RadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    },
    isDisabled() {
      return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
    }
  }
};
</script>
