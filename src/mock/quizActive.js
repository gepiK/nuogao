export default {
    "/quizAct/list.do": (option) => {
        let data = {
            "authorListNum": 2,
            "data": [{
                updateTime: "2017-06-13 09:22", //时间	string	
                status: "1", //状态 1代表已开始 2代表未开始
                matchName: "江苏苏宁VS上海申花", //	比赛名称
                matchDate: "2017-06-13 09:22",
                quizId: "12121edfdfdfdf", //	竞猜ID
                competitionName: "中超", //	赛事
                quizTopic: "90分钟比赛结果是你输啊打发打发打发打发打发打发", //	竞猜标题
                quizType: 1, //1代表胜平负 2代表比分
                relateType: 1 // 关联状态:1表示关联  2表示未关联
            }, {
                updateTime: "2018-06-13 09:22", //时间	string	
                status: "2", //状态 1代表未开始 2代表已开始
                matchName: "江苏苏宁VS上海申花2", //	比赛名称
                matchDate: "2018-06-13 09:22",
                quizId: "12121edfdfdffdfdfdf", //	竞猜ID
                competitionName: "中超", //	赛事
                quizTopic: "90分钟比赛结果是你输啊打发打发打发打发打发打发离对方答复打发打发打发打发打发打发打发打发打发", //	竞猜标题
                quizType: 2, //1代表胜平负 2代表比分
                relateType: 2 //
            }]
        };

        let result = {
            isOK: true,
            data
        };

        option.success && option.success(result);
    }
}