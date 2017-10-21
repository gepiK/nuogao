<template>
  <div :class="['td-ellipsis',{'multi-ellipsis':isEllipsis}]" ref="ellipsisContainer" :style="getContentStyle">
    <p ref="ellipsisContext">{{ str ? str : '暂无' }}</p>
  </div>
</template>

<script>
  export default {
    name: 'TdEllipsis',
    componentName: 'TdEllipsis',
    props:['str', 'max-height'],
    data() {
      return {
        isEllipsis: false
      }
    },
    computed: {
      contentHeight() {
        if (this.maxHeight) {
          return this.maxHeight;
        } 

        return '71';
      },
      getContentStyle() {
        return `max-height: ${this.contentHeight}px`
      }
    },
    mounted() {
      this.setEllipsis();
    },
    updated() {
      if (!this.isEllipsis) {
        this.setEllipsis();
      }
    },
    methods: {
      setEllipsis() {
        let ellipsisContainerHeight = this.$refs.ellipsisContainer.offsetHeight;
        let ellipsisContextHeight = this.$refs.ellipsisContext.offsetHeight;

        if (ellipsisContainerHeight < ellipsisContextHeight) {
          this.isEllipsis = true;
          this.$refs.ellipsisContext.title = this.str;
        }
      }
    },
  };
</script>

<style scoped>
tr:hover {
  .multi-ellipsis:after {
    background-color: #F0FBFF;
  }
}
.td-ellipsis {
  position: relative;
  
  overflow: hidden;
  &.multi-ellipsis:after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 0;
    background-color: #fff;
  }
}
p {
  line-height: 18px;
  text-align: left
}

</style>

