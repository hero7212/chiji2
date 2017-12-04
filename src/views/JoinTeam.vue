<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import '../stylus/varibles.styl'
    
    .JoinTeam
        display block
        .watchrooms
            display inline-block
            width 10px
            height 18px
            position absolute
            left 10px
            top 13px
            cursor pointer
        .me 
            height 90px
            background blackBg
            display flex 
            .avatar
                flex 1 59px 0 
                display flex 
                justify-content center 
                align-items center
                padding-left 8px
                position relative 
                .crown 
                    position absolute
                    top 8px
                    left 5px
            .info 
                flex 7 
                padding-left 10px
                position relative
                .name 
                    font-size 16px 
                    color #fff
                    margin-top 23px
                .under 
                    margin-top 14px 
                    font-size 12px  
                    .area 
                        color primaryBg  
                    .request 
                        color boderColor         
        .others
            background blackBg
            height 130px
            font-size 12px 
            .other-players
                box-sizing border-box 
                height 100px
                border-bottom 1px solid #666
                display flex
                padding 18px 50px
                .player 
                    flex 1
                    .avatar 
                        margin 0 auto
                        position relative
                        width 44px 
                        height 44px
                        .quit 
                            position absolute
                            top 0
                            right 0
                            cursor pointer
                            transform scale(2)
                    .name 
                        color #fff 
                        margin-top 10px
                        text-align center
            .watch 
                height 30px 
                display flex 
                justify-content center 
                align-items center
                box-shadow 0 3px 5px rgba(0,0,0,.4)
                a  
                    color linkColor
        .two-btns 
            font-size 14px
            height 30px 
            display flex 
            justify-content space-between
            //align-items center
            padding 10px 15px 0
            div 
                height 100%
                line-height 30px
            .label
                border 1px solid #333
                border-radius 3px
                padding 5px 10px 
                color #333
            .game-status 
                border 1px solid primaryBg
                color #fff 
                background primaryBg
                border-radius 3px
                padding 5px 10px           
        .notice 
            padding 0 10px 
            height 30px 
            margin-top 10px     
            background secBg  
            display flex 
            align-items center  
            .laba 
                flex 1 25px 0
            .text 
                flex 9
                font-size 12px 
                color titleColor   
                padding-left 10px 
                .close 
                    float right
                    cursor pointer
                    margin-top 1px
        .chat-room 
            margin-top 10px
            background secBg            
            min-height calc(100vh - 314px)
            display flex 
            flex-flow column
            position relative
            .con-wrapper 
                padding 0 10px
                background secBg 
                flex 1
                position absolute
                top 0
                bottom 80px
                left 0 
                right 0
                overflow-y auto
                .talk-wrapper
                    margin-top 15px
                    width 331px 
                    min-height 59px
                    position relative
                    display flex 
                    justify-content flex-start
                    .avatar
                        position absolute
                        top 0 
                        left 0
                    .name
                        position absolute
                        top 0
                        left 45px
                        font-size 12px 
                        color boderColor   
                    .speak 
                        position absolute
                        top 17px
                        left 45px   
                        display inline-block
                        max-width 275px 
                        min-height 43px
                        border-radius 5px 
                        background speackBg 
                        font-size 13px 
                        line-height 43px
                        padding 0 10px
                    &.my-talk 
                        text-align right
                        justify-content flex-end 
                        float right
                        .avatar
                            right 0 
                            left auto
                        .name      
                            right 45px 
                            left auto 
                        .speak 
                            background mySpeackBg  
                            right 45px 
                            left auto 
                            display inline
                            text-align left 
            .send-wrapper 
                background bodyBg 
                padding 0 10px
                flex 1 49px 0
                height 49px 
                border-top 1px solid sendBorder 
                display flex
                position fixed
                bottom 0
                left 0
                right 0
                .send-inp 
                    flex 1
                    height 100%
                    box-sizing border-box
                    padding 7px
                    input 
                        display block
                        width 100%
                        height 35px 
                        background secBg
                        border-radius 3px
                        text-indent 14px
                .send-btn 
                    width 28px
                    height 100%
                    flex 1 28px 0
                    display flex 
                    justify-content center 
                    align-items center
                    cursor pointer
                    .send-word
                        width 28px
                        height 28px
                        display inline-block 
                        font-size 12px
                        text-align center 
                        line-height 28px
    .modal 
        position absolute
        top 50px
        left 0
        right 0 
        height 180px
        z-index 1024
        background rgba(33,33,33,.3)
        display flex
        justify-content center 
        align-items center
        color activeColor
        font-size 16px
</style>

<template>
    <div class="JoinTeam">
        <img class="watchrooms" src="../assets/img/black-arrow.png" @click="watchRooms">
        <div class="me">
            <div class="avatar">
                <img src="../assets/img/crown.png" alt="" class="crown" width="26" height="22">
                <img src="../assets/img/other-avatar.png" width="44" height="44">
            </div>
            <div class="info">
                <div class="name">
                    {{userName}}
                </div>
                <div class="under">
                    <span class="area">1区-2服</span>
                    &nbsp; | &nbsp;
                    <span class="request">要求: {{roomInfo.requireRank}}</span>
                </div>
                
            </div>
        </div>
        <div class="others">
            <div class="other-players">
                <div v-for="(item,index) in leaguerInfoList" class="player">
                    <div class="avatar">
                        <img src="../assets/img/other-avatar.png" width="44" height="44">
                        <img src="../assets/img/quit.png" width="12" height="12" class="quit" v-if="gameStatus && item.user.account==phone " @click="quitRoom">
                    </div>
                    <div class="name">
                        {{item.user.userName}}
                    </div>
                </div>
            </div>
            <div class="watch">
                <a href="https://yxzs.163.com/t2/combat/query">查询队友战绩</a>    
            </div> 
        </div>
        <div class="two-btns">
            <div>
                 <span class="game-status" v-if="isC" @click="swtichGame">
                    {{gameStatus ? gameCount>0 ? '再来一局' : '开始游戏' : '结束游戏'}}
                 </span>
            </div>
           
            <div v-if="gameStatus">
                <span class="label" v-if="isC" @click="disbandRoom">
                    解散房间
                </span>
            </div>
        </div>
        <div class="notice">
            <img src="../assets/img/laba.png" alt="公告" width="15" height="16" class="laba">
            <div class="text">
                <img src="../assets/img/close.png" alt="关闭" width="12" height="12" class="close">
                房主已开启游戏，立即去游戏添加好友一起开黑吧！
            </div>
        </div>
        <div class="chat-room">
            <div class="con-wrapper">
                <div v-for="(item,index) in chats" class="talk-wrapper" :class="{'my-talk':item.isMe}">
                    <div class="avatar">
                        <img src="../assets/img/other-avatar.png" width="35" height="35">
                    </div>
                    <div class="name">
                        {{item.nickName}}
                    </div>
                    <div class="speak">
                        {{item.txt}}
                    </div>
                </div>
            </div>
            <div class="send-wrapper">
                <div class="send-inp">
                    <input type="text" ref="sendInp" value=" ">
                </div>
                <div class="send-btn" @click="sendTxt">
                    <!-- <img src="../assets/img/send-ico.png" width="28" height="28"> -->
                    <span class="send-word">
                        发送
                    </span>
                </div>  
            </div>
        </div>
        <div class="modal" v-if="!gameStatus">
            游戏中。。。
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import store from '@/store/store';
import globalMap from '@/global/globalMap';
import tokenMap from '@/global/token';
import titleName from '@/global/titleName';
import newRoomId from '@/global/newRoomId';
import phone from '@/global/phone';
// import conn from '@/websdk/conn';

export default {
    name: "JoinTeam",
    data() {
        return {
            userName: '',
            phone:sessionStorage.getItem('phone') || phone.get('phone'),
            roomId:0,
            roomInfo: {},
            captain: {},
            leaguerInfoList: [],
            isC: false,
            showQuit: false,
            deId: 0,
            ws:new WebSocket(api.wsUrl),
            //ws2: new WebSocket(api.wsUrl2),
            wsId: 0,
            chats:[],
            gameStatus:true,
            gameCount: 0,   //用来判断再来一局 
  
        };
    },
    computed:{
        
    },
    methods: {
        //获取房间内部
        gameRoom(flag=true) {
            let detailId = 0;

            if(sessionStorage.getItem('roomFlag')=='c'){
                detailId = sessionStorage.getItem('cRoomId');
            }else{
                detailId = sessionStorage.getItem('jRoomId');
            }

            let obj = {
                detailId: detailId,
                token: sessionStorage.getItem('token')
            }
            axios.get(api.gameRoom,{params:obj}).then(res => {
                if(res.data.code==5004){
                    this.quitRoom();    //房间不存在就直接退出
                    this.ws.close();
                    this.ws.onclose=()=>{
                        console.log('ws关闭了');
                    };
                }else{
                    this.deId = res.data.data.id;
                    this.roomId = res.data.data.roomInfo.id || 0;
    
                    this.wsId = res.data.data.id;   //把wsId赋值成房间的id
                    this.roomInfo = res.data.data.roomInfo;
                    let roomName = res.data.data.roomInfo.roomName;
                    titleName.set('roomName',roomName);
                    console.log(res.data.data);
                    let leaguerInfoList = res.data.data.leaguerInfoList;

                    this.leaguerInfoList = leaguerInfoList.map(item => {
                        if(item.isCaptain == 1) {
                            this.captain = item.user;
                            this.userName = item.user.userName
                            if(item.user.account == sessionStorage.getItem('phone')){
                                if(flag){
                                    // console.log("%c3D Text","color:blue",item.user.account);
                                    // console.log("%c3D Text","color:blue",sessionStorage.getItem('phone'));
                                    // alert('我是房主');
                                    this.isC = true;
                                }
                            }else{
                                if(flag){
                                    // alert('我是房客');
                                    this.isC = false;
                                }
                            }
                        }else{
                            // console.log(leaguerInfoList);
                            // leaguerInfoList.map(i=>{
                            //     if(i.user.account == sessionStorage.getItem('phone') || phone.get('phone')){
                            //         this.showQuit = true;
                            //         console.log(sessionStorage.getItem('phone'));
                            //     }else{
                            //         this.showQuit = false;
                            //         console.log(phone.get('phone'));
                            //     }
                            // });
                            return item;
                        }
                    }).filter(item => item!=undefined);
                }
            });
        },
        //调整游戏状态
        swtichGame() {
            if(this.leaguerInfoList.length>0){
                //调用开始游戏接口
                let obj = {
                    roomDetailId:this.deId,
                    token: sessionStorage.getItem('token')
                }
                let nickName = phone.get('phone') || sessionStorage.getItem('phone');
                if(this.gameStatus){
                    
                    axios.post(api.startGame,Qs.stringify(obj)).then(res => {
                        this.gameStatus = false;
                        this.gameCount++;
                        this.ws.send(`${this.wsId},${nickName},游戏开始`);
                    })
                }else{
                    axios.post(api.gameOver,Qs.stringify(obj)).then(res => {
                        this.gameStatus = true;
                        this.ws.send(`${this.wsId},${nickName},游戏结束`);
                    })
                }
            }else{
                alert('包括您在内，共至少需要2名玩家才能开始游戏');
            }
        },
        //房主解散房间
        disbandRoom() {
            let obj = {
                roomId: this.roomId,
                token: sessionStorage.getItem('token')
            }
            axios.post(api.disbandRoom,Qs.stringify(obj)).then(res => {
                if(res.data.code==5009){
                    alert(res.data.msg)
                }else{
                    //this.leaveGroup();
                    let nickName = phone.get('phone') || sessionStorage.getItem('phone');
                    let m = `${this.wsId},${nickName},房间解散`;
                    this.ws.send(m)
                    setTimeout(()=>{
                        this.$router.push('/');
                    },300);  
                }
            })
        },
        //房主切出去看看其他房间
        watchRooms() {
            this.$router.push('/');
        },
        //队友退出房间
        quitRoom() {
            let obj = {
                roomDetailId: this.deId,
                token: sessionStorage.getItem('token')
            }
            axios.post(api.leaveGameRoom,Qs.stringify(obj)).then(res => {
                if(res.data.code==5007){
                    alert(res.data.msg);
                }else{
                    setTimeout(()=>{
                        //let nickName = phone.get('phone') || sessionStorage.getItem('phone');
                        //张方觉让我显示昵称
                        let nickName = sessionStorage.getItem('nickName');
                        let m = `${this.wsId},${nickName},拜拜`;
                        this.ws.send(m);
                        setTimeout(()=>{
                            this.$router.push('/');
                        },300)
                    },300)
                }

            });
            return false;
        },
        //聊天发送消息
        sendTxt() {
            //给WS发送的房间标识
            let txt = this.$refs.sendInp.value;
            if(txt) {
                //let nickName = phone.get('phone') || sessionStorage.getItem('phone');
                //张方觉让我显示昵称
                let nickName = sessionStorage.getItem('nickName');
                let m = `${this.wsId},${nickName},${txt}`
                this.ws.send(m);
                // console.log(`发送的是${m}`)
            };
            this.$refs.sendInp.value='';
        },
        //累加聊天消息
        showMessage(str,type) {
            // console.log('接收到消息了');
            // console.log(str);
            let rId = str.split('说：')[0];
            
            if(rId==this.wsId){     //防止跨房间聊天
                let obj = { 
                    nickName:str.split('说：')[1],
                    txt:str.split('说：')[2],
                    isMe: sessionStorage.getItem('nickName') == str.split('说：')[1]
                }
                this.chats.push(obj);
            }
        }, 
        //创建环信群组
        // async hxCreateGroup() {
        //     return new Promise((resolve,reject)=>{
        //         const options = {             
        //             data: {
        //                 groupname: this.roomName,
        //                 desc: this.roomName,
        //                 members: [sessionStorage.getItem('phone')],
        //                 public: true,
        //                 approval: false,
        //                 allowinvites: false
        //             },
        //             success: function (respData) {
        //                 this.hxGroupId = respData.data.groupid;
        //                 console.log(this.hxGroupId);
        //                 resolve(this.hxGroupId);
        //                 roomId.set('RoomId',respData.data.groupid);
        //                 sessionStorage.setItem('hx_roomId',respData.data.groupid);
        //             },
        //             error: function (err) {
        //                 console.log(err);
        //             }
        //         };
        //         conn.createGroupNew(options); 
        //     }); 
        // },  
        //环信退出群组
        // leaveGroup() {
        //     const option = {
        //         to: sessionStorage.getItem('hx_roomName'),
        //         roomId: sessionStorage.getItem('hx_roomId'),
        //         success: function () {
        //             console.log('成功退出环信群组');
        //         },
        //         error: function () {
        //             console.log('退出环信群组失败');
        //         }
        //     };
        //     conn.leaveGroupBySelf(option);
        // } 
    },
    created() {
        setTimeout(()=>{
            this.gameRoom(); 
            //let nickName = phone.get('phone') || sessionStorage.getItem('phone');
            //张方觉让我显示昵称
            let nickName = sessionStorage.getItem('nickName');
            let m = `${this.wsId},${nickName},大家好`;
            this.ws.send(m)
        },300)
    },
    mounted() {
          
        this.ws.onopen=()=>{
            // console.log('ws打开了');
        };
        this.ws.onmessage=(e)=>{
            // console.log(`监听到消息了`);
            // console.log(e.data);
            this.gameRoom();

            let mes = JSON.parse(e.data);
            console.log(mes);
            this.showMessage(mes.data,mes.type);

            if(this.userName==mes.data.split('说：')[1]&&mes.data.split('说：')[2]=='房间解散'){
                //防止解散一个房间，另一个房间也跟着解散
                alert('房间已经被房主解散');
                this.quitRoom();
            }
            
            if(this.wsId==mes.data.split('说：')[0]&&mes.data.split('说：')[2]=='游戏开始') {
                this.gameStatus = false;
            }else if(mes.data.split('说：')[2]=='游戏结束'){
                this.gameStatus = true;
            }
        };
        

        //陈乐ws
        // this.ws2.onopen=()=>{
        //     console.log('陈乐ws打开了');
        // };


//         if (window.history && window.history.pushState) {
//             window.addEventListener('popstate', function () {

// 　　　　　　　　 // 当点击浏览器的 后退和前进按钮 时才会被触发， 
//                 window.history.pushState('forward', null, ''); 
//                 window.history.forward(1);

//                 alert('浏览器按钮被禁用了');
//             });
//         }
    },
    beforeDestroy() {
        //this.ws.close();
        // this.ws.onclose=()=>{
        //     console.log('ws关闭了');
        // };
    },
    destroyed() {
        
    },
    store
};
</script>