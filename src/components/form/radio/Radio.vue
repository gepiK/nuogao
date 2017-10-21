<style scoped>
.radio {
  display: flex;
  margin-right:20px;
  margin-top: 5px;
  padding-bottom:8px;
  .radio-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: top;
    &.checked .radio-inner {
      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
    &.disabled+.radio-label {
      color: #bbb;
      cursor: not-allowed;
    }
    &.disabled .radio-inner {
      background-color: #eef1f6;
      border-color: #d1dbe5;
      cursor: not-allowed;
    }
    &.checked.disabled .radio-inner {
      &:after {
        background-color: #d1dbe5;
        border-color: #d1dbe5;
      }
    }
    .radio-inner {
      border: 1px solid #C0C3CB;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #09BBFE;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform .15s cubic-bezier(.71, -.46, .88, .6);
      }
    }
    .radio-original {
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
  .radio-label {
    display: flex;
    white-space: nowrap;
    align-items: center;
    color: #737982;
    font-size: 14px;
    padding-left: 4px;
    cursor: pointer;
  }
}
</style>
<template>
  <label class="radio">
    <span class="radio-input" :class="{ 'disabled': isDisabled,'checked': model == label}">
      <span class="radio-inner"></span>
      <input type="radio" class="radio-original" :value="label" v-model="model" :name="name" :disabled="isDisabled">
    </span>
    <span class="radio-label">
      <slot></slot>
      <!--<template v-if="!$slots.default">{{label}}</template>-->
    </span>
  </label>
</template>
<script>
import Emitter from 'js/emitter'

export default {
  name: 'Radio',

  mixins: [Emitter],

  componentName: 'Radio',

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
