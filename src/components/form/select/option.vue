<template>
  <li :class="['item', {selected: selected}, {'is-disabled': disabled}]" @click.stop="selectOptionClick">
    {{name}}
  </li>
</template>

<script>
import emitter from 'js/emitter';
export default {
  mixins: [emitter],

  name: 'SnOption',

  componentName: 'SnOption',

  props: {
    name: [String, Number],
    value: [String, Number, Boolean,Object],
    disabled: Boolean
  },

  data() {
    return {
      selected: false
    }
  },

  created() {
    if (this.value === this.$parent.value) {
      this.selected = true;
    }
    this.$on('selectedItem', this.selectedItem);
    this.$on('clearSelectedItem', this.cancelSelected);
    this.$on('defaultSelected',this.defaultSelect)
  },

  mounted() {
    this.$nextTick(() => {
      const valLen = (this.$parent.value + '').length;
      const nameLen = (this.$parent.currentName + '').length;
      if (valLen > 0 && nameLen == 0 && this.selected) {
        this.dispatch('SnSelect', 'initCurrentName', this);
      }
    })

  },

  methods: {
    selectOptionClick() {
      if (this.disabled) return;
      this.dispatch('SnSelect', 'handleOptionClick', this);
    },

    selectedItem() {
      if (this.value == this.$parent.value) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    },

    cancelSelected() {
      this.selected = false;
    },

    defaultSelect() {
      if (this.$parent.value == this.value) {
        this.selected = true;
        this.dispatch('SnSelect', 'initCurrentName', this);
      } else {
        this.selected = false;
      }
    }
  }

}
</script>

<style scoped>
.item {
  font-size: 14px;
  padding: 8px 10px;
  white-space: nowrap;
  color: #48576a;
  height: 32px;
  line-height: 1;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #e4e8f1;
  }
  &.selected {
    color: #fff;
    background-color: #09bbfe;
  }
  &.is-disabled {
    color: #bfcbd9;
    cursor: not-allowed;
  }
}
</style>
