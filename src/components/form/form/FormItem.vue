<style>
.form-item {
  min-height: 32px;
  margin-bottom: 18px;
  &:after,
  &:before {
    display: table;
    content: "";
  }
  &.is-required>.form-item__label {
    &:before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #09BBFE;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  .form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #999;
    line-height: 1;
    padding: 6px 12px 11px 0;
    box-sizing: border-box;
  }
  .form-item__content {
    line-height: 32px;
    position: relative;
    font-size: 14px;
    margin-left: 80px;
    .form-item__error {
      color: #ff4949;
      font-size: 12px;
      line-height: 1;
      padding-top: 2px;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>
<template>
  <div class="form-item"
    :class="{
          'is-error': validateState === 'error',
          'is-validating': validateState === 'validating',
          'is-required': isRequired || required
        }">
    <label :for="prop"
      class="form-item__label"
      v-bind:style="labelStyle"
      v-if="label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="form-item__content"
      v-bind:style="contentStyle">
      <slot></slot>
      <div class="form-item__error"
        v-if="validateState === 'error' && showMessage && form.showMessage">{{validateMessage}}</div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import emitter from 'js/emitter';

function noop() { }

function getPropByPath(obj, path) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;

  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error('please transfer a valid prop path to form item!');
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]]
  };
}

export default {
  name: 'FormItem',
  componentName: 'FormItem',
  mixins: [emitter],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    error(value) {
      this.validateMessage = value;
      this.validateState = value ? 'error' : '';
    },
    validateStatus(value) {
      this.validateState = value;
    }
  },
  computed: {
    labelStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top') return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle() {
      var ret = {};
      if (this.form.labelPosition === 'top' || this.form.inline) return ret;
      var labelWidth = this.labelWidth || this.form.labelWidth;
      if (labelWidth) {
        ret.marginLeft = labelWidth;
      }
      return ret;
    },
    form() {
      var parent = this.$parent;
      while (parent.$options.componentName !== 'Form') {
        parent = parent.$parent;
      }
      return parent;
    },
    fieldValue: {
      cache: false,
      get() {
        var model = this.form.model;
        if (!model || !this.prop) {
          return;
        }
        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }
        return getPropByPath(model, path).v;
      }
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isRequired: false
    };
  },
  methods: {
    validate(trigger, callback = noop) {
      var rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return true;
      }
      this.validateState = 'validating';
      var descriptor = {};
      descriptor[this.prop] = rules;
      var validator = new AsyncValidator(descriptor);
      var model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, {
        firstFields: true
      }, (errors, fields) => {
        this.validateState = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      });
    },
    resetField() {
      this.validateState = '';
      this.validateMessage = '';
      let model = this.form.model;
      let value = this.fieldValue;
      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }
      let prop = getPropByPath(model, path);
      if (Array.isArray(value)) {
        this.validateDisabled = true;
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        this.validateDisabled = true;
        prop.o[prop.k] = this.initialValue;
      }
    },
    getRules() {
      var formRules = this.form.rules;
      var selfRuels = this.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(selfRuels || formRules || []);
    },
    getFilteredRule(trigger) {
      var rules = this.getRules();
      return rules.filter(rule => {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }
      this.validate('change');
    },
    // 主动触发校验规则，flag表示校验状态，true表示校验成功，false为失败，errMsg表示自定义校验提示信息
    vaildTtrigger(flag, errMsg){
      if(!flag){
        this.validateState = 'error';
        this.validateMessage = errMsg ? errMsg : '';
      }
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('Form', 'form.addField', [this]);
      let initialValue = this.fieldValue;
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      });
      let rules = this.getRules();
      if (rules.length) {
        rules.every(rule => {
          if (rule.required) {
            this.isRequired = true;
            return false;
          }
        });
        this.$on('form.blur', this.onFieldBlur);
        this.$on('form.change', this.onFieldChange);
      }
    }
  },
  beforeDestroy() {
    this.dispatch('Form', 'form.removeField', [this]);
  }
};
</script>
