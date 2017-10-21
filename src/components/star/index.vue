<template>
  <div class="star">
    <span v-for="n in total" :key="n" @click="setStar(n)" :class="[{'active':isActive(n)},'item-star']"></span>
  </div>
</template>

<script>
export default {
  name: 'star',

  props: {
    value: {
      type: [String,Number]
    },
    total: {
      type: Number,
      default: 3
    }
  },

  methods: {
    isActive(n) {
      return n < this.value || n == this.value;
    },
    setStar(num) {
      this.$emit('star-sync', num);
    }
  }

}
</script>

<style scoped>
.star {
  display: flex;
  justify-content: center;
}

.item-star {
  background-image: url(../../assets/icon-star-gray.png);
  background-repeat: no-repeat;
  display: inline-block;
  width: 50px;
  height: 30px;
  &.active {
    background-image: url(../../assets/icon-stared.png);
  }
}
</style>