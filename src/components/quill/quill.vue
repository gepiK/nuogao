<style>
.sn-ql-info {
  margin-bottom: 15px;
  font-size: 14px;
  color: #A8ADBC;
  line-height: 16px;
}

.sn-ql-box {
  border: 1px solid #C9D0E1;
  border-radius: 4px;
  background: #FFFFFF;
  .ql-toolbar.ql-snow {
    border: none;
    background-color: #ECEEF4;
  }
  .sn-ql-editor {
    height: 322px;
    border: none;
  }
}

.step-first {
  position: relative;
  padding: 20px 30px 100px 30px;
  text-align: center;
  div {
    &.sn-formtip {
      margin-bottom: 26px;
    }
  }
  .err-tip {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    font-size: 12px;
    color: #F47B77;
  }
}

.step-second {
  padding: 30px 40px;
  .text {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: #727A92;
    line-height: 20px;
    .container {
      padding-top: 4px;
    }
    &.pl {
      padding-left: 1em;
    }
  }
}

.sn-ql-image {
  display: none;
}

.mgt16 {
  margin-top: 16px;
}

.msg {
  font-size: 12px;
  margin-left: 12px;
  &.error {
    span {
      color: #F68885;
    }
  }
  &.success {
    span {
      color: #6E7690;
    }
  }
}

.mt7 {
  margin-top: 7px;
}
</style>
<template>
  <div class="sn-ql">
    <p class="sn-ql-info">正文字数需大于10；最多可上传20张图片；最多可上传5个视频。</p>
    <div class="sn-ql-box">
      <div class="sn-ql-editor"></div>
    </div>
    <sn-button class="mgt16" type="warning" @click="doCheck">敏感词检查</sn-button>
    <span class="msg" :class="{'error': ret.retCode!=0, 'success': ret.retCode==0}">
      <span v-if="ret.retCode!=0">{{this.ret.retMsg}}</span>
      <span v-else>未检查到敏感词汇</span>
    </span>
    <form class="sn-ql-image" enctype="multipart/form-data" method="post">
      <input name="file" type="file" accept="image/png, image/gif, image/jpeg, image/x-icon">
    </form>
    <sn-confirm ref="video" v-show="viewType==='video'" title="插入视频" close-icon @close="close">
      <div class="step-first" v-show="step == 1">
        <sn-formtip warning>视频暂只支持添加MIP视频</sn-formtip>
        <sn-input placeholder="请输入MIP视频ID" width="400" align="center" v-model="videoId" @input="errFlag=false"></sn-input>
        <p class="err-tip" v-show="errFlag">未查到该视频ID的视频信息，请检查您输入的ID信息～</p>
      </div>
      <div class="step-second" v-show="step == 2">
        <p class="text pl">视频ID：{{video.vid}}</p>
        <p class="text">视频标题：{{video.title}}</p>
        <p class="text">视频封面：
          <img :src="video.sloturl" width="220" height="165" class="mt7">
        </p>
      </div>
      <div slot="btn-group" class="sn-popup-btns">
        <sn-button type="primary" @click="goNext" v-show="step == 1">下一步</sn-button>
        <sn-button @click="step=1" v-show="step == 2">上一步</sn-button>
        <sn-button type="primary" @click="doInsert" v-show="step == 2">插入</sn-button>
      </div>
    </sn-confirm>
    <sn-confirm ref="tip" v-show="viewType==='tip'" :title="tipTitle" confirm-button-text="我知道了" hide-cancel-button txt @close="close">
      <p slot="content">{{tipMsg}}</p>
    </sn-confirm>
  </div>
</template>
<script>
import Quill from "Quill"
import DI from 'js/interface'
import common from 'js/common'
export default {
  props: {
    name: {
      type: String,
      default: "正文"
    }
  },
  data() {
    return {
      quill: null,
      fileInput: null,
      selectionIdx: 0,
      step: 1,
      videoId: "",
      video: {},
      errFlag: false,
      tipMsg: "",
      tipTitle: "",
      viewType: null,
      ret: {} //敏感词校验返回结果
    }
  },
  methods: {
    initModal() {
      this.step = 1;
      this.videoId = "";
      this.video = {};
      this.errFlag = false;

    },

    rewriteImage() {
      const content = this.quill.getContents().ops;
      let count = 0;
      for (let i = 0; i < content.length; i++) {
        let temp = content[i];
        if (typeof temp.insert === 'object') {
          if (temp.insert.image) {
            count += 1;
          }
        }
      }
      if (count == 20) {
        this.tipTitle = "插入图片";
        this.tipMsg = "您已经上传了20张图片，无法继续插入图片～";
        this.$refs.tip.show();
        return;
      }
      this.getSelection();
      this.fileInput.click();
    },

    getSelection() {
      const selection = this.quill.getSelection();
      if (selection) {
        if (selection.length > 0) {
          return globalBus.$emit('fail', '请不要选中文字进行插入图片操作')
        } else {
          this.selectionIdx = selection.index;
        }
      }
    },

    rewriteVideo() {
      const content = $(this.$el).find('.ql-editor').html();
      const reg = /\[MEMO\]\w*\d*\[\/MEMO\]/g;
      const temp = content.match(reg)
      if (temp && temp.length >= 5) {
        this.tipTitle = "插入图片";
        this.tipMsg = "您已经上传了5段视频，无法插入视频～";
        this.viewType = 'tip';
        return;
      }
      this.getSelection();
      this.viewType = 'video';
    },

    goNext() {
      common.ajax({ //根据视频ID查询视频
        url: DI.channel.queryVideoDetail,
        context: this,
        type: 'GET',
        data: {
          videoId: this.videoId
        },
        success(data) {
          if (data.retCode == 0) {
            this.step = 2;
            this.video = data.data;
          } else {
            this.errFlag = true;
          }
        }
      })
    },

    doInsert() {
      if (this.video.pay == "1") {
        globalBus.$emit("fail", "该视频是付费视频，不能插入");
        return;
      }
      this.quill.insertText(this.selectionIdx, '[MEMO]' + this.video.vid + '[/MEMO]');
      this.viewType = null;
      //初始化
      this.initModal();
    },

    doCheck() {
      console.log(this.quill.getText(), this.name);
      common.ajax({
        url: DI.common.checkLimitWords,
        context: this,
        data: JSON.stringify({
          content: this.quill.getText(),
          name: this.name
        }),
        success(data) {
          console.log(data)
          this.ret = data;
        }
      })
    },
    // 外部可调用方法
    getContents() {
      let ctt = $(this.$el).find('.ql-editor').html();
      (ctt == '<p><br></p>') && (ctt = '')
      return ctt;
    },

    setContents(contents) {
      $(this.$el).find('.ql-editor').html(contents);
    },

    clearContent() {
      $(this.$el).find('.ql-editor').html("");
    },

    validate() {
      const txtLen = this.quill.getText().replace(/\n/g, '').length;
      if (txtLen < 10) {
        globalBus.$emit('warning', '正文应大于10个字');
        return false;
      } else {
        return true;
      }
    },

    close() {
      this.viewType = null;
    }
  },
  mounted() {
    let quillDom = $(this.$el).find('.sn-ql-editor')[0];
    this.quill = new Quill(quillDom, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: ['bold', {
            'color': []
          }, 'image', 'video'],
          handlers: {
            'image': this.rewriteImage,
            'video': this.rewriteVideo,
          }
        }
      }
    });

    let _this = this;
    let fileInput = $(this.$el).find('input[type=file]')[0];
    this.fileInput = fileInput;
    fileInput.addEventListener('change', function () {
      const imgFile = this.files[0];
      if (!imgFile) return;
      if (Math.ceil(imgFile.size / 1024) < 1024 * 5) {
        let formData = new FormData();
        console.log(imgFile)
        formData.append('file', imgFile)
        common.ajax({
          url: DI.common.uploadFile,
          data: formData,
          context: this,
          processData: false,
          contentType: false,
          success: function (data) {
            console.log(data)
            this.value = '';
            if (data.retCode == '0') {
              const url = data.data;
              _this.quill.insertEmbed(_this.selectionIdx, 'image', url);
            } else {
              globalBus.$emit('fail', data.retMsg);
            }
          },
          error: function () {
            globalBus.$emit('fail', "上传图片失败!");
            this.value = '';
          }
        }, true)
      } else {
        this.value = '';
        globalBus.$emit('fail', '上传图片最大为：5M');
      }
    });
  }
}
</script>
