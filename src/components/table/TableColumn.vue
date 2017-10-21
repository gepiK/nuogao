<template>
  <div style='display: none'>
    
  </div>
</template>

<script>
export default {
  name: 'table-column',

  props: {
    prop: String,
    label: String,
    width: String,
    sloted: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'center'
    },
    wall: {
      type: String,
      default: 'true'
    },
    tdPaddingLeft: {
      type: [String, Number],
      default: 10
    },
    tdPaddingRight: {
      type: [String, Number],
      default: 10
    },
    minWidth: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>
