export const formatDate = (input, fmt) => {
    if (!input) return;
    fmt = fmt || "yyyy年MM月";
    var dateObj = new Date(input);
    var o = {
        "M+": dateObj.getMonth() + 1, //月份 
        "d+": dateObj.getDate(), //日 
        "h+": dateObj.getHours(), //小时 
        "m+": dateObj.getMinutes(), //分 
        "s+": dateObj.getSeconds(), //秒 
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度 
        "S": dateObj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const diff = (str) => {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return formatDate(date, 'MM.dd');
    } else if (time / 1000 <= 24*3600) {
        return '今天'
    } else {
         return formatDate(date, 'MM.dd');
    }
}

export const smallImage = (str,w=120,h=80) => {
  if (!str) return '';
  
  if (str.indexOf('?') == -1) {
    return `${str}?format=${w}w_${h}h_0l`;
  }
  return `${str}&format=${w}w_${h}h_0l`;
}
