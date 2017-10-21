<template>
  <form class="form" v-on:submit.prevent :style="formStyle">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'Form',
  componentName: 'Form',
  props: {
    model: Object,
    rules: Object,
    labelWidth: String,
    formWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    inline: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    rules() {
      this.validate();
    }
  },
  data() {
    return {
      fields: []
    };
  },
  created() {
    this.$on('form.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  computed: {
    formStyle() {
      return { 'width': this.formWidth + "px" };
    }
  },
  methods: {
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    validate(callback) {
      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      this.fields.forEach((field, index) => {
        field.validate('', errors => {
          if (errors) {
            valid = false;
          }
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid);
          }
        });
      });
    },
    validateField(prop, cb) {
      var field = this.fields.filter(field => field.prop === prop)[0];
      if (!field) { throw new Error('must call validateField with valid prop string!'); }
      field.validate('', cb);
    }
  }
};
</script>
<style scoped>
.form {
  display: block;
  background: #fff;
}
</style>

