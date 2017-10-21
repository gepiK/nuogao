export default {
  "/quizOrder/list.do": (option) => {
    let data = {
      "count": 3,
      "list": [{
        'orderId': '001',
        'serialId': 1001011,
        'betAmount': '40.00',
        'odds': 3.2,
        'actualAmount': 120,
        'memberCode': '17032021',
        'orderDate': '2017-08-03',
        'orderStatus': 2,
        'lotteryStatus': 3,
        'quizTopic': '我的竞猜'
      },
      {
        'orderId': '002',
        'serialId': 1001222,
        'betAmount': '40.00',
        'odds': 3.2,
        'actualAmount': 120,
        'memberCode': '17032021',
        'orderDate': '2017-08-03',
        'orderStatus': 2,
        'lotteryStatus': 3,
        'quizTopic': '我的竞猜22'
      },
      {
        'orderId': '003',
        'serialId': 1001033,
        'betAmount': '40.00',
        'odds': 3.2,
        'actualAmount': 120,
        'memberCode': '17032021',
        'orderDate': '2017-08-03',
        'orderStatus': 2,
        'lotteryStatus': 3,
        'quizTopic': '我的竞猜33'
      }]
    };

    let result = {
      isOK: true,
      data
    };

    option.success && option.success(result);
  }
}