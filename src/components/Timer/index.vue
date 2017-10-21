<style scoped>
  .sn-timer {
    position: relative;
    input {
      display: block;
      width: 100%;
      height: 32px;
      padding-left: 10px;
      border: 1px solid #d1d1d1;
      font-size: 12px;
      color: #666;
    }

    .icon{
      position: absolute;
      display: inline-block;
      right: 8px;
      top: 8px;
      width: 16px;
      height: 16px;
      background: url(../../assets/bg_calendar.png) no-repeat;
      background-size: 100% 100%;
    }

    .err-tip {
      color: #ff4949;
      font-size: 12px;
      position: absolute;
    }
  }
</style>

<template>
  <div class="sn-timer" :style="getStyle" >
    <input 
      ref="input"
      type="text" 
      class="sn-timer" 
      :class="{'err': errTip}" 
      :style="getStyle" 
      readonly 
      :placeholder='placeholder'
      :value="value">
    <p class="err-tip" v-show="errTip">{{ errTip }}</p>
    <span class="icon" @click.stop='iconClick'></span>
  </div>
</template>

<script>
  import Emitter from 'js/emitter'
  export default {
    mixins: [Emitter],
    props: {
      value: {
        type: String,
        default: '',
      },
      defaultDate: {
        type: String,
        default: null,
      },
      showTimepicker: {
        type: Boolean,
        default: false,
      },
      minDate: {
        default: null,
      },
      maxDate: {
        default: null,
      },
      prevYearRange: {
        type: String,
        default: '10'
      },
      nextYearRange: {
        type: String,
        default: '10'
      },
      timeFormat: {
        type: String,
        default: 'HH:mm'
      },
      width: {
        type: String,
        default: '135'
      },
       radius: {
        type: String,
        default: '16'
      },
      placeholder: {
        type: String,
        default: '选择日期'
      }
    },

    data() {
      return {
        ipt: null,
        errTip: ''
      }
    },

    computed: {
      getStyle() {
        return  `width:${this.width}px;border-radius:${this.radius||16}px;`;
      }
    },

    watch: {
      value(val, oldVal) {
        if(val != oldVal){
          this.ipt.datepicker('setDate', val);
          this.$emit('change',val);
        }
        if(val != '') {
          this.hideErr();
        }
      },
      minDate(val, oldVal) {
        if(val != oldVal){
          this.ipt.datepicker('option', 'minDate', val);
        }
      },
      maxDate(val, oldVal) {
        if(val != oldVal){
          this.ipt.datepicker('option', 'maxDate', val);
        }
      },
    },

    methods: {
      iconClick() {
        this.$refs.input.focus();
      },

      showErr(txt) {
        this.errTip = txt;
      },

      hideErr() {
        this.errTip = '';
      }
    },

    mounted() {
      this.ipt = $(this.$el).find('input');
      this.$nextTick(function() {
        let _self = this;
        this.ipt.datetimepicker({
          monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        	monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        	dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        	dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        	dayNamesMin: ['日','一','二','三','四','五','六'],
        	weekHeader: '周',
        	dateFormat: 'yy-mm-dd',
          timeFormat: this.timeFormat,  
        	firstDay: 1,
        	isRTL: false,
          defaultDate: this.defaultDate,
        	showMonthAfterYear: true,
          changeMonth: true,
          changeYear: true,
          timeText: '时间',
          hourText: '时',
          minuteText: '分',
          secondText: '秒',
          controlType: 'select',
          showTimepicker: this.showTimepicker,
          showTime: false,
          currentText: '今时',
          closeText: '清空',
          minDate: this.minDate,
          maxDate: this.maxDate,
          yearRange: 'c-' + this.prevYearRange + ':c+' + this.nextYearRange,
          onSelect(date) {
            _self.errTip = '';
            _self.$emit('input', date);
          },
        });
      });
    },
  }
</script>
