<style scoped>
.container {
    .scroll-container {
        position: relative;
        width: calc(100%+4px);
        height: 100%;
        overflow: auto;
        background: #fff;
        &::scroll-bar {
            width: 0;
        }
        .content {
            height: 370px;
            .loading {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                .icon {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin-left: 10px;
                    background: url(../../assets/loading_blue.png) no-repeat;
                    background-size: 100% 100%;
                    animation: loading 1s linear infinite;
                }
            }
        }
    }
}

@keyframes loading {
    to {
        transform: rotate(360deg);
    }
}
</style>
<template>
    <div class="container">
        <div class="scroll-container" @scroll="handleScroll">
            <div class="content">
                <table class="table-loader">
                    <slot></slot>	
                </table>
                <div class="loading" v-if="!complete">
                    <span>加载中...</span>
                    <span class="icon"></span>
                </div>
                <div class="loading" v-else><span>暂无数据</span></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 40
        },
        distance: Number
    },
    data() {
        return {
           complete: true
        }
    },
    mounted() {

    },
    created() {
        
    },
    methods: {
        handleScroll() {
            let _scrollTop = this.$el.querySelectorAll(".scroll-container")[0].scrollTop,
                _contentHeight = this.$el.querySelectorAll(".content")[0].offsetHeight,
                _height = this.$el.querySelectorAll("tbody")[0].offsetHeight;
                // console.log(_height , _scrollTop , _contentHeight, _height - _scrollTop - _contentHeight);
            if (_height - _scrollTop - _contentHeight == this.distance) {
                this.$emit("loadmore");
            }
        }
    }
}
</script>
