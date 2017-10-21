<style>
.nav-box {
    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    height: 46px;
    border-bottom: 1px solid #e8e8e8;
    /* background: #fff; */
    .title {
        h3 {
            display: inline-block;
            font-size: 16px;
            color: #333;
            line-height: 46px;
        }
        span {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
        }
    }
    .labels {
        display: flex;
        justify-content: center;
        align-items: center;
        .item {
            position: relative;
            min-width: 60px;
            text-align: center;
            height: 46px;
            line-height: 46px;
            font-size: 14px;
            color: #666;
            cursor: pointer;
            &+.item {
                margin-left: 30px;
            }
            &.active:after {
                position: absolute;
                content: "";
                left: 50%;
                width: 60px;
                margin-left: -30px;
                bottom: 0;
                height: 4px;
                background: #0ABBFE;
            }
        }
    }
}
</style>
<template>
    <nav class="nav-box">
        <div class="title">
            <h3>{{title}}</h3>
            <slot name="subtitle"></slot>
        </div>
        <ul class="labels" v-if="labelsArr&&labelsArr.length" index="indexNum">
            <ul class="item" v-for="(item, idx) in labelsArr"  :class="{'active': idx == tabIndex}" @click="doTab(idx)">{{item}}</ul>
        </ul>
    </nav>
</template>
<script>
export default {
    props: {
        title: String,
        labels: String,
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            labelsArr: [],
            tabIndex: 0
        }
    },
    mounted() {
        if (this.labels) {
            this.labelsArr = this.labels.split(",");
        };
        this.tabIndex = this.index;
    },
    methods: {
        doTab(idx) {
            this.tabIndex = idx;
            this.$emit("tab", this.tabIndex);
        }
    }
}
</script>
