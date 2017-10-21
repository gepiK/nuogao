'use strict'

import DI from 'js/interface'
import common from 'js/common'
import '../styles/index.less';

import Vue from 'vue'
//引入公共样式
import 'src/css/common.css'
import 'src/css/_reset.css'
//引入过滤器
import * as filters from '../js/filters'

import { Button, Select, Input, Message, Form, FormItem } from 'element-ui'

//注册组件


Vue.component("ng-form", Form);
Vue.component("ng-form-item", FormItem);
Vue.component("ng-input", Input);
Vue.component("ng-select", Select);
Vue.component("ng-button", Button);




Vue.prototype.$message = Message;

window.globalBus = new Vue({
  methods: {
    deleteNullProperty(obj) {
      for (let key in obj)
      {
        if (obj[key] === '' || obj[key] == undefined)
        {
          delete obj[key];
        }
      }

      return obj;
    },
    filterNum(str) {
      return parseInt(str.replace(/[^0-9]/ig, ""), 10);
    },
    sensitiveCheck(option) {
      if (!option) return;
      let isArray = this.isArray(option);
      if (isArray)
      {
        option.map((item) => {
          check(item);
        });
      } else
      {
        check(option);
      }

      function check(item) {
        common.ajax({
          url: DI.common.checkLimitWords,
          context: this,
          loadingText: item.loadingText,
          data: JSON.stringify({
            ...item.params
          }),
          success: (res) => {
            item.callback(res)
          },
          error: () => {
            console.log("error");
          }
        });
      }
    },
    isArray(object) {
      return object && typeof object === 'object' &&
        Array == object.constructor;
    },
    openPreview(url) {
      let availHeight = screen.availHeight;
      let availWidth = screen.availWidth;
      let windowWidth = 480;
      let screenLeft = (availWidth - windowWidth) / 2;

      window.open(url, '_blank', `width=${ windowWidth },height=${ availHeight - 150 },left=${ screenLeft },top=50,menubar=no,toolbar=no,status=no,scrollbars=yes`)
    }
  }
});

//注册过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
export default Vue;
