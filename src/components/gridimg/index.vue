<style scoped>
  .sn-img {
    position: relative;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    z-index: 100;
  }
  .bg {
    border:solid 1px #999;
    border-radius:3px;
    width: 50px;
    height: 50px;
    background-image: url(../../assets/default_upload.png);
    background-size: 100% 100%;
    box-shadow:inset 0 0 10px rgba(0,14,53,.3);
  }

  }
</style>

<template>
  <form class="sn-img dataform-item" enctype="multipart/form-data" method="post">
    <p :title="title"><input name="image" type="file" ref="fileEle"> </p>
    <div class="bg" :style="style()"></div>
  </form>
</template>

<script>
  import common from '../../js/common'
  import DI from '../../js/interface'
  export default {
    props: {
      value: {
        type: [Object,String],
        required: true
      },
      maxSize: {
        type: String,
        default: '100'
      },
      minSize: {
        type: String,
        default: '0'
      },
      disabled:{
        type: Boolean,
        default: false
      },
      title:{
        type: String,
        default: ' ' // 显示tips会有bug，去掉上传组件的tips提示
      },
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      style() {
        let style = {};
        if(this.value.fullUrl){
          style.backgroundImage = 'url(' + this.value.fullUrl + ')';
        }else{
          // 清空文件域
          this.removeFile();
        }
        return style;
      },
      // 清空文件域方法
      removeFile(){
        if(this.$refs.fileEle){
          this.$refs.fileEle.value= '';
        }
      }
    },
    mounted() {
      this.$nextTick(function() {
        let _self = this;
        $(this.$el).on('change', 'input[type="file"]', function() {
          // 判断图片类型
          const rFilter = /^(?:image\/jpeg|image\/png)$/i;
          const imgFile = this.files[0];
          const _ipt = this;
          if(!imgFile) return;
          if(rFilter.test(imgFile.type)){
            // 判断图片大小，通过max-size传值，单位为Kb
            let form = new FormData(_self.$el);
            if(parseInt(imgFile.size / 1024) <=  _self.maxSize && parseInt(imgFile.size / 1024) >=  _self.minSize){
              globalBus.$emit('loading',' ');
              common.ajax({
                target: $(_self.$el),
                data: form,
                url: DI.common.upload,
                contentType: false,
                processData: false,
                success: function(data){
                  if(data.isOK){
                    const info = data.data;
                    _self.$emit('input', info)
                  }else{
                    globalBus.$emit('warning', data.retMsg);
                  }
                }
              }, true)
            }else{
              $(_ipt).val('');
              // 图片超出最大限制报错
              if(parseInt(imgFile.size / 1024) >  _self.maxSize){
                globalBus.$emit('warning','上传图片最大为：' + _self.maxSize + 'Kb！');
                return;
              }
              // 图片小于限制报错
              if(parseInt(imgFile.size / 1024) < _self.minSize){
                globalBus.$emit('warning','上传图片最小为：' + _self.minSize + 'Kb！');
                return;
              }
            }
          }else{
            $(_ipt).val('');
            globalBus.$emit('warning','上传图片只能为jpg、png');
          }
        });
      });
    }
  }
</script>
