const common = {
  ajax(options) {
    var promise = new Promise(function (resolve, reject) {
      globalBus.$emit('loading');
      //基础路径
      const BASE_URL = '/slsp-admin-web';
      let opt = {}
      opt = {
        dataFilter: function (data) {
          let parseData = data;
          let isString = typeof data == 'string';
          isString && (parseData = JSON.parse(data));
          let temp = parseData.data || {};
          let arr = Object.keys(temp);
          if (!arr.length)
          {
            parseData.retCode = 'nodata'
            parseData.retMsg = ''
          }
          isString && (parseData = JSON.stringify(parseData));
          return parseData;
        },
        complete: function () {
          globalBus.$emit('loadingHide');
        },
        type: 'POST',
        data: {},
        contentType: 'application/x-www-form-urlencoded',
        // 接收错误信息需要设置请求头的接收方式
        headers: {
          accept: 'application/json',
        },
        success: function (res) {
          if (res.isOK || res.success || retCode === '0')
          {
            globalBus.$emit('loadingHide');
            if (res.data)
            {
              resolve(res.data);
            }
          } else
          {
            globalBus.$emit('warning', res && res.error && res.error.message);
            // reject();
          }
        },
        error: function (err) {
          globalBus.$emit('loadingHide');
          let message = (err.responseJSON && err.responseJSON.error && err.responseJSON.error.message) || err.responseText;
          globalBus.$emit('warning', message);
          // reject();
        }
      }
      Object.assign(opt, options);
      //本地调试
      let is_debugger = false;
      if (is_debugger)
      {
        const debugger_mode = require('../mock');
        console.log(opt.url)
        console.log(opt.data)
        opt.beforeSend && opt.beforeSend.call(opt.context);
        setTimeout(() => {
          opt.complete && opt.complete();
          if (debugger_mode[opt.url])
          {
            debugger_mode[opt.url](opt)
          } else
          {
            opt.success && opt.success.call(opt.context, {
              retCode: "0"
            })
          }
        }, 500)

        return;
      }
      //拼接基础路径
      if (!opt.noBaseUrl)
      {
        opt.url = BASE_URL + opt.url;
      }
    });
    return promise;
  }
}

export default common;
