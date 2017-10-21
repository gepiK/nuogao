<style scoped>
.time-axis {
    width: 570px;
    border-bottom: 1px solid #e8e8e8;
    .times {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #999999;
        .time-item {
            position: relative;
            line-height: 50px;
            width: 60px;
            text-align: center;
            cursor: pointer;
            &.today:after {
                position: absolute;
                content: "";
                left: 0;
                right: 0;
                bottom: 0;
                height: 4px;
                background: #0ABBFE;
                color: #0ABBFE;
            }
        }
    }
}
</style>
<template>
    <div class="time-axis">
        <ul class="times">
            <li class="time-item" :class="{'today': item.active}" v-for="(item, index) in display" @click="select(item, index)">{{item.day | diff}}</li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data() {
            return {
                now: new Date(),
                times: [],
                display: [],
                prevObj: {},
                currentObj: {},
                curTime:'',
            }
        },
        created() {
            this.init(this.now);
            this.$emit("input",this.curTime);
        },
        methods: {
            select(item, index) {
                this.currentObj = item;
                this.prevObj.active = false;
                this.currentObj.active = true;
                this.prevObj = item;
                let diff = index - 3;
                this.$emit("select", Vue.filter("formatDate")(item.day, 'yyyy-MM-dd'));
                if (diff !== 0) {
                    this.init(item.day);
                }
            },
            init(date) {
                let tempDate = date;
                this.times = [];
                this.display = [];
                this.times.push(new Date(tempDate));
                this.curTime = Vue.filter("formatDate")(date, 'yyyy-MM-dd'); //获取当前时间
                for (let i = 0; i < 3; i++) {
                    this.times.push(new Date(tempDate.setDate(date.getDate() + 1)));
                }
                new Date(tempDate.setDate(date.getDate() - 3));
                for (let i = 0; i < 3; i++) {
                    this.times.unshift(new Date(tempDate.setDate(date.getDate() - 1)));
                }
                for (let i = 0; i < this.times.length; i++) {
                    this.display.push({
                        active: i == 3,
                        value: Vue.filter("formatDate")(this.times[i], 'MM.dd'),
                        day: this.times[i]
                    });
                    if (i == 3) this.prevObj = this.display[i];
                };
            }
        }
};

</script>
