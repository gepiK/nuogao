//BASE常量移动到comm.js
// const BASE='../../slsp-admin-web';
let DI = {
  // 公共接口
  common: {
    upload: '/fileUpload/uploadImg.do',
    uploadFileBase64: '/adminMgt/uploadFileBase64.do', //base64图片上传
    uploadFile: '/adminMgt/uploadFile.do', //上传文件
    checkLimitWords: "/adminMgt/checkLimitWords.do", //敏感 词校验
  }
}

export default DI;
