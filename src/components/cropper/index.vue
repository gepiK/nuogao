<template>
  <div class="img-cropper">
    <template v-if='!value'>
      <div class="no-img">
        <slot name='tip'>
          <!--<p>{{`图片格式支持JPG、PNG、JPEG、GIF，大小为${size}以下`}}</p>-->
        </slot>
        <div class="sn-upload sn-upload--text" :style='getUploadStyle'>
          <i class="sn-icon-plus avatar-uploader-icon" @click='addClickHandler'>
          </i>
          <div class='btn-text'>上传图片</div>
        </div>
      </div>
    </template>
    <div class="img-existed" :style='getUploadStyle' v-else @mouseenter='mouseenter' @mouseleave='mouseleave'>
      <img :src='value' ref='originImg' :style='getUploadStyle'>
      <div :class='getHoverClass'></div>
      <button class="btn edit-btn" @click='editClickHandler'>
        <em></em>
        <slot name="btn-title">
          <span>编辑图片</span>
        </slot>
      </button>
    </div>
    <sn-confirm v-show='showModal' ref="confirm" :title='`上传${label}`' flag>
      <div class="container">
        <div class="img-load" :style='getUploadStyle'>
          <img ref="image" :src='imgVal'>
        </div>
        <div class="btn-group">
          <div class="btn-group__img">
            <a class="zoom-plus" href="#" @click.prevent='zoomIn($event)'></a>
            <a class="zoom-minus" href="#" @click.prevent='zoomOut($event)'></a>
            <a class="img-rotate-right" href="#" @click.prevent='rotate'></a>
            <a class="img-rotate-left" href="#" @click.prevent='rotate(false)'></a>
            <a class="img-reset" href="#" @click.prevent='reset'></a>
          </div>
          <a @click.prevent='addClickHandler'>重新上传</a>
        </div>
      </div>
    </sn-confirm>
    <input type="file" name="file" ref='fileInput' class="sn-upload__input" @change='fileInputChangeHandler($event)'>
  </div>
</template>
<script>
require("src/css/cropper.min.css");
import emitter from 'js/emitter';
import Cropper from 'cropperjs'
import DI from 'js/interface'
import common from 'js/common'
export default {
  name: 'img-cropper',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '图片'
    },
    width: {
      type: String,
      default: '360'
    },
    height: {
      type: String,
      default: '260'
    },
    size: {
      type: String,
      default: '5M'
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9
    }
  },

  data() {
    return {
      imgVal: this.value,
      showModal: false,
      cropper: null,
      cropperable: false,
      fileName: "",
      contentType: "",
      isHover: false
    }

  },

  computed: {
    getUploadStyle() {
      return `width:${this.width}px;height:${this.height}px;`
    },

    getHoverClass() {
      if (this.isHover) {
        return 'mask is-hovered'
      } else {
        return 'mask';
      }

    }
  },

  mounted() {
    this.$refs.confirm.$on('close', () => {
      this.showModal = false;
      this.$nextTick(() => {
        this.cropper.destroy && this.cropper.destroy();
        this.cropper = null;
      })
    });

    this.$refs.confirm.$on('sure', () => {
      common.ajax({
        url: DI.common.uploadFileBase64,
        context: this,
        loadingText: '正在上传图片，请稍候！',
        data: JSON.stringify({
          base64File: this.cropper.getCroppedCanvas().toDataURL('image/png').substr(22),
          fileName: this.fileName.replace(/\s/g,''),
          contentType: this.contentType
        }),
        success: function (res) {
          if (res.retCode == '0') {
            this.cropper.destroy && this.cropper.destroy();
            this.cropper = null;
            this.$refs.fileInput.value = "";

            this.showModal = false;
            this.$emit('img-sync', res.data);

            this.dispatch('FormItem', 'form.change', [res.data]);
          } else {
            this.$refs.fileInput.value = "";
            this.showModal = false;
            this.$nextTick(() => {
              globalBus.$emit("warning", res.retMsg);
            })
          }

        },
        error: function () {
          globalBus.$emit("warning", "网络异常，请联系运维人员！");
        }
      })

    });
  },

  methods: {
    addClickHandler() {
      this.$refs.fileInput.click();
    },

    fileInputChangeHandler(event) {
      const files = event.target.files;
      let FR = new FileReader();

      if (files && files.length) {
        let file = files[0];
        this.fileName = file.name;
        this.contentType = file.type;
        if (/^image\/\w+/.test(file.type)) {
          if (!/^image\/(jpeg|gif|png)+/.test(file.type.toLowerCase())) {
            this.$refs.fileInput.value = '';
            globalBus.$emit('warning', '上传失败，只支持png、jpg、jpeg、gif格式图片.');
            return;
          }

          let AllowImgFileSize = globalBus.filterNum(this.size) * 1024 * 1024;
          let ImgFileSize = file.size;
          if (AllowImgFileSize < ImgFileSize) {
            this.$refs.fileInput.value = '';
            globalBus.$emit('warning', `上传失败，请上传不大于${this.size}的图片！`);
            return;
          }

          FR.addEventListener("load", function (e) {
            /*let ImgFileSize = FR.result.substring(FR.result.indexOf(",") + 1).length;
            let AllowImgFileSize = globalBus.filterNum(this.size) * 1024 * 1024;

            if (AllowImgFileSize < ImgFileSize) {
              globalBus.$emit('warning', `上传失败，请上传不大于${this.size}的图片！`);
              return;
            }*/

            this.imgVal = FR.result;

            if (this.cropper) {
              this.cropper.reset().replace(this.imgVal);
            } else {
              this.showCropperModal();
            }
          }.bind(this))

          FR.readAsDataURL(file);

        } else {
          globalBus.$emit('warning', '请选择图片.');
        }

      }
    },

    editClickHandler() {
      this.$refs.fileInput.click();
    },

    showCropperModal() {
      const _self = this;
      this.showModal = !this.showModal;
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.image, {
          aspectRatio: this.aspectRatio,
          viewMode: 0,
          dragMode: "move",
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          ready() {
            _self.cropperable = true;
          }
        });
      })
    },

    mouseenter() {
      this.isHover = true;
    },

    mouseleave() {
      this.isHover = false;
    },

    zoomIn(event) {
      if (!this.cropperable) return;
      this.cropper.zoom(0.1, event);
    },

    zoomOut(event) {
      if (!this.cropperable) return;
      this.cropper.zoom(-0.1, event);
    },

    rotate(right = true) {
      if (!this.cropperable) return;
      this.cropper.rotate(right ? 45 : -45);
    },

    reset() {
      if (!this.cropperable) return;
      this.cropper.reset();
    }
  }

}
</script>
<style scoped>
.container {
  padding: 20px 80px 0 80px;
}

.sn-upload {
  border: 1px dashed #a1a1a1;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn {
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
  top: -40px;
  em {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-image: url(../../assets/refresh.png);
    background-repeat: no-repeat;
    background-size: 16px 16px;
  }
}

.btn-group {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  color: #999999;
  a {
    display: inline-block;
  }
  .btn-group__img {
    a {
      width: 17px;
      height: 17px;
      margin-right: 3px;
      background-size: 17px 17px;
      background-repeat: no-repeat;
      &.zoom-plus {
        background-image: url(../../assets/icon-plus-circle.png);
      }
      &.zoom-minus {
        background-image: url(../../assets/icon-minus-circle.png);
      }
      &.img-rotate-right {
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        background-position-y: 3px;
        background-image: url(../../assets/icon-rotate-right.png);
      }
      &.img-rotate-left {
        width: 22px;
        height: 22px;
        background-size: 22px 22px;
        background-position-y: 3px;
        background-image: url(../../assets/icon-rotate-left.png);
      }
      &.img-reset {
        background-size: 20px 20px;
        background-position-y: -2px;
        background-image: url(../../assets/icon-autorenew.png);
      }
    }
  }
}

.edit-btn {
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  padding: 5px 7px;
  border-radius: 16px;
}

.no-img {
  margin-top: -4px;
  p {
    padding: 12px 0;
    font-size: 12px;
    color: #c1c1c1;
  }
}

.btn-text {
  position: absolute;
  bottom: 1px;
  width: 100%;
  text-align: center;
  font-size: 3px;
}

.img-existed {
  position: relative;
  text-align: center;
  /*margin-top: 10px;*/
  box-sizing: content-box;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  &.is-hovered {
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.img-load img {
  width: 100%;
  /* This rule is very important, please do not ignore this! */
}

.sn-upload__input {
  display: none;
}

.sn-icon-plus {
  background-image: url(../../assets/icon-plus-big.png);
  width: 100%;
  height: 100%;
  display: inline-block;
  background-position-x: 50%;
  background-position-y: 50%;
  background-position-x: 50%;
  background-size: 28%;
  background-repeat: no-repeat;
}
</style>
