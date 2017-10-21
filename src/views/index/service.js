import common from '../../js/common';

// 获取频道列表
export const queryChannelList = function (data) {
  let option = {
    url: '/admin/tv/tvList.do',
    data,
    type: 'get',
    contentType: 'application/x-www-form-urlencoded',
  }
  return common.ajax(option).then(function (res) {
    res.tvShowCount = 0; // 启用状态的数量
    // 添加一个字段，为需要切换的频道状态
    res.list.forEach(function (ele) {
      ele.tvStatus === 1 && res.tvShowCount++;
    });
    return res;
  });
}

// 启停用方法
export const setTvStatus = function (data) {
  let option = {
    url: '/admin/tv/setTvStatus.do',
    data,
    type: 'get',
    contentType: 'application/x-www-form-urlencoded',
  }
  return common.ajax(option)
}

// 频道上移下移
export const changeSort = function (data) {
  let option = {
    url: '/admin/tv/setTvSort.do',
    data,
    type: 'get',
    contentType: 'application/x-www-form-urlencoded',
  }
  return common.ajax(option)
}

// 设为热门频道
export const setHotFun = function (data) {
  let option = {
    url: '/admin/tv/setHotTv.do',
    data,
    type: 'get',
    contentType: 'application/x-www-form-urlencoded',
  }
  return common.ajax(option)
}
