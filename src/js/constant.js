//时间状态
export const TIME_STATUS = [
  {
    value: 1,
    name: '未开始'
  },
  {
    value: 2,
    name: '已开始'
  },
  {
    value: 3,
    name: '封盘'
  },
  {
    value: 4,
    name: '已下架'
  }
]

//关联方式
export const QUIZ_TYPE = [
  {
    value: 1,
    name: '胜平负'
  },
  {
    value: 2,
    name: '比分'
  }
]

//关联方式
export const RELATE_TYPE = [
  {
    value: 1,
    name: '关联'
  },
  {
    value: 2,
    name: '未关联'
  }
]

//赛事类型
export const QUERY_TYPE = [
  {
    value: 1,
    name: '比赛ID'
  },
  {
    value: 2,
    name: '比赛名称'
  }
];



//订单状态
export const ORDER_STATUS = [
  {
    value: 1,
    name: '支付成功'
  },
  {
    value: 2,
    name: '支付失败'
  }
]

//开奖状态
export const LOTTERY_STATUS = [
  {
    value: 1,
    name: '未开奖'
  },
  {
    value: 2,
    name: '猜错'
  },
  {
    value: 3,
    name: '猜对(派奖)'
  },
  {
    value: 4,
    name: '猜对(未派奖)'
  }
]

export const getItemByKey = function (list, val) {
  let temp = list.find(item => {
    return item.key == val
  });
  return temp ? temp : {};
}

export const getItemByValue = function (list, val) {
  let temp = list.find(item => {
    return item.value == val
  });
  return temp ? temp : {};
}
