<style scoped>
.rect-checkbox {
  color: #1f2d3d;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  -webkit-user-select: none;
  .rect-checkbox-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: top;
    &.checked .rect-checkbox-inner {
      &:after {
        border: none;
        background-color: #09BBFE;
      }
    }
    .rect-checkbox-inner {
      display: inline-block;
      position: relative;
      border: 1px solid #09BBFE;
      border-radius: 16px;
      padding: 0 14px 0 25px;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      color: #666;
      z-index: 1;
      transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
      background-color: #fff;
      &:after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #666;
        background-color: #fff;
        left: 10px;
        top: 9px;
      }
    }
    .rect-checkbox-original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      left: -999px;
    }
  }
  &+.rect-checkbox {
    margin-left: 15px;
  }
}
</style>
<template>
  <label class="rect-checkbox">
    <span class="rect-checkbox-input" :class="{'checked': isChecked}">
      <span class="rect-checkbox-inner">
        <span v-if="$slots.default || label">
          <slot></slot>
          <template v-if="!$slots.default">{{label}}</template>
        </span>
      </span>
      <input type="checkbox" class="rect-checkbox-original" @change="handleChange" :name="name" v-model="model" :value="label">
    </span>
  </label>
</template>
<script>
import Emitter from 'js/emitter'
export default {
  name: 'RectCheckbox',
  componentName: 'RectCheckbox',
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },
  mixins: [Emitter],
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) { //多个checkbox
          let isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (isLimitExceeded = true));

          isLimitExceeded === false &&
            this.dispatch('CheckboxGroup', 'input', [val]);
        } else if (this.value !== undefined) { //单个checkbox
          this.$emit('input', val);
        } else {
          this.selfModel = val;
        }
      }
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'CheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    }
  },
  methods: {
    addToStore() {
      if (
        Array.isArray(this.model) &&
        this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      this.$emit('change', ev);
      if (this.isGroup) {
        this.$nextTick(_ => {
          this.dispatch('CheckboxGroup', 'change', [this._checkboxGroup.value]);
        });
      }
    }
  },
  created() {
    this.checked && this.addToStore();
  }
}
</script>
