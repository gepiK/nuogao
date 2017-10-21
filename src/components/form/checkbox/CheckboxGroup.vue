<style scoped>
.check-group {
  display: inline-block;
  font-size: 0;
  line-height: 1;
  vertical-align: middle;
}
</style>
<template>
  <div class="check-group">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from 'js/emitter'
export default {
  name: 'CheckboxGroup',
  componentName: 'CheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {},
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },
  watch: {
    value(value) {
      this.dispatch('FormItem', 'form.change', [value]);
    }
  }
}
</script>
