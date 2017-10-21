<style scoped>
  .fed-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding: 0 10px;

    .goto-box {
      margin-left: 5px;
      font-size: 12px;
      color: #888;

      input {
        width: 36px;
        height: 28px;
        margin: 0 6px;
        border: 1px solid #ccc;
        text-align: center;
        font-size: 12px;
        color: #888;
        background-color: #fff;
      }

      .sure {
        min-width: 28px;
        height: 28px;
        margin: 0 5px;
        padding: 0 10px;
        color: #888;
        border: 1px solid #ccc;
      }
    }

    .pagination-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      a {
        display: block;
        min-width: 28px;
        height: 28px;
        margin: 0 5px;
        padding: 0 10px;
        border: 1px solid #ccc;
        font-size: 12px;
        color: #888;
        text-align: center;
        line-height: 28px;
        background-color: #fff;

        &:hover:not(.is-disabled),
        &.sel {
          color: #fff;
          border-color: #09BBFE;
          background-color: #09BBFE;
        }
      }

      span {
        display: block;
        height: 28px;
        margin: 0 2px;
        font-size: 12px;
        color: #888;
        line-height: 20px;
      }
    }
  }
</style>

<template>
  <div class="fed-pagination" v-if="totalPage >= 2">
    <div class="pagination-box">
      <a href="javascript:;" v-if="cur == 1" class="is-disabled">＜</a>
      <a href="javascript:;" @click="prev" v-else>＜</a>
      <a href="javascript:;" :class="{'sel': cur == 1}" @click="goPage(1)">1</a>
      <template v-if="totalPage <= 5">
        <a href="javascript:;" :class="{'sel': cur == n + 1}" @click="goPage(n + 1)" v-for="n in (totalPage - 2)" :key="n">{{ n + 1 }}</a>
      </template>
      <template v-else>
        <template v-if="cur < 4">
          <a href="javascript:;" :class="{'sel': cur == n + 1}" @click="goPage(n + 1)" v-for="n in 3" :key="n">{{ n + 1 }}</a>
          <span>...</span>
        </template>
        <template v-if="cur >= 4 && cur <= totalPage - 3">
          <span>...</span>
          <a href="javascript:;" @click="goPage(cur - 1)">{{ cur - 1 }}</a>
          <a href="javascript:;" class="sel" @click="goPage(cur)">{{ cur }}</a>
          <a href="javascript:;" @click="goPage(cur + 1)">{{ cur + 1 }}</a>
          <span>...</span>
        </template>
        <template v-if="cur > totalPage - 3">
          <span>...</span>
          <a href="javascript:;" 
            :class="{'sel': cur == totalPage - (4 - n)}" 
            @click="goPage(totalPage - (4 - n))" 
            v-for="n in 3" 
            :key="n"
          >{{ totalPage - (4 - n) }}</a>
        </template>
      </template>
      <a href="javascript:;" :class="{'sel': cur == totalPage}" @click="goPage(totalPage)">{{ totalPage }}</a>
      <a href="javascript:;" class="is-disabled" v-if="cur == totalPage">＞</a>
      <a href="javascript:;" @click="next" v-else>＞</a>
    </div>
    <div class="goto-box">
      共{{ totalPage }}页，到第<input type="number" v-model="goNum" ref="inputNum" min="1" @keyup.enter="goto">页
      <button class="sure" @click.stop='goto'>确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 10,
      },
    },
    data () {
      return {
        cur: 1,
        goNum: '',
      }
    },
    computed: {
      totalPage() {
        if(this.total == 0){
          return 1;
        }else{
          return Math.ceil(this.total / this.size);
        }
      }
    },
    watch: {
      total(val, oldVal) {
        if(oldVal == 1 || val >= oldVal || this.cur <= this.totalPage) return;
        this.gotoPage(this.totalPage);
      }
    },
    methods: {
      prev () {
        if(this.cur === 1) return;
        const num = this.cur - 1;
        this.goPage(num);
      },
      next () {
        if(this.cur === this.totalPage) return;
        const num = this.cur + 1;
        this.goPage(num);
      },
      goPage(num) {
        if(num == this.cur) return;
        this.gotoPage(num)
      },
      goto() {
        const num = Number(this.goNum);
        if(isNaN(num) || num > this.totalPage || num <= 0){
          this.$refs.inputNum.focus();
          return this.goNum = '';
        }
        if(num != this.cur){
          this.gotoPage(num)
        }
      },
      // 暴露出去的方法
      gotoPage(num) {
        this.cur = num;
        this.$emit('goto', num);
      },
      reset(){
        this.cur = 1;
      },
      refresh() {
        this.$emit('goto', this.cur);
      }
    },
    created() {
      const _self = this;
      globalBus.$on("syncCurPage",(curPage) => {
        _self.cur = curPage;
      })
    }
  }
</script>
