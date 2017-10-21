<template>
  <ul>
    <li v-for="(item,index) in getSplitTimeList(time)" :key="index" class="pt-5">
      {{item}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TdDate',
    componentName: 'TdDate',
    props: ['time'],
    methods: {
      getSplitTimeList(time) {
        if (time) {
          return time.split(' ');
        } 

        return [];
      },
    }
  }
</script>
