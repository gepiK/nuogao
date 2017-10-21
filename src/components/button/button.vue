<style scoped>
  .sn-button {
    min-width: 100px;
    height: 30px;
    padding: 0 30px;
    border-radius: 16px;
    font-size: 12px;
    color: #fff;

    &.sn-button--mini {
      min-width: 90px;
    }
    &.sn-button--default {
      color: #666;
      border: 1px solid #ccc;
      background-color: #fff;
    }
    &.sn-button--primary {
      background-color: #09BBFE;
    }
    &.sn-button--success {
      background-color: #A9D86E;
    }
    &.sn-button--warning {
      background-color: #F88A6F;
    }
    &.sn-button--info {
      background-color: #8074C8;
    }
    &.sn-button--outline {
      border: 1px solid #09BBFE;
      background-color: #fff;
      color: #09BBFE;
    }
    &.is-disabled {
      color: #FFFFFF;
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
</style>

<template>
  <button :disabled="disabled"
    class="sn-button"
    @click.stop="handleClick" :class="[
      type ? 'sn-button--' + type : '',
      size ? 'sn-button--' + size : '',
      {
        'is-plain': plain
      },
      {
        'is-disabled': disabled
      }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'small'
      },
      type: {
        type: String,
        default: 'default'
      },
      disabled: Boolean,
      plain: Boolean
    },
    data() {
      return {
      }
    },
    methods: {
      handleClick () {
        !this.disabled && this.$emit('click')
      },
    }
  }
</script>
