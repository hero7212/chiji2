const domain = 'api';
// const domain = 'http://192.168.1.211:8081/adyx_api';
// const domain = '/adyx_api';
const wsUrl = 'ws://192.168.1.187:4000';
// const wsUrl = 'ws://127.0.0.1:4000';

const wsUrl2 = 'ws://192.168.1.211:8081/adyx_api/webSocketServer';  //陈乐给的

const api = {
    wsUrl:wsUrl,    //ws
    wsUrl2:wsUrl2,  //陈乐给的
    getMsm: `${domain}/code/getMsm`,     //验证码
    login: `${domain}/user/chit/login`,     //登录
    gameList: `${domain}/game/list`,  //关联游戏
    gameServerList: `${domain}/gameServer/getServerByGame`, //选择区服
    updateUserGameInfo: `${domain}/userGame/updateUserGameInfo`,    //确认完善游戏信息
    gameRoomNames: `${domain}/gameRoom/title/list`,      //房间名集合
    gameRank: `${domain}/gameRank/getRankByGame`,      //段位集合
    gameFightType: `${domain}/gameFightType/getFightTypeByGame`,  //排位模式
    addGameRoom: `${domain}/gameRoom/addGameRoom`, //创建房间
    gameRoom: `${domain}/gameRoom/getGameRoomByDetailId`, //房间内部
    myRoom: `${domain}/gameRoom/myRoom`,    //我的房间
    gameRoomList: `${domain}/gameRoom/list`,    //房间列表
    joinGameRoom: `${domain}/gameRoom/joinGameRoom`,    //加入房间 
    getUserGameInfo: `${domain}/userGame/getUserGameInfo`,     //个人中心
    disbandRoom: `${domain}/gameRoom/disbandRoom`,  //解散房间
    leaveGameRoom: `${domain}/gameRoom/leaveGameRoom`,    //离开房间
    startGame:`${domain}/gameRoom/startGame`,    //开始游戏
    gameOver:`${domain}/gameRoom/gameOver`,    //结束游戏
    gameReward:`${domain}/gameReward/list`,    //吃鸡奖励公告
}

export default api;