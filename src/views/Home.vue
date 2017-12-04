<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import '../stylus/varibles.styl'
    .Home
        background secBg 
        position relative
        .cover-add 
            width 44px
            height 44px
            background #fff
            position absolute
            top -45px 
            right 0 
            z-index 1
        .banner 
            height 135px
            img 
                cursor pointer
        .notice 
            height 35px 
            display flex 
            background secBg  
            .broadcast   
                flex 1 35px 0
                width 35px
                height 100% 
                display flex
                justify-content center 
                align-items center
            .text 
                display flex 
                align-items center  
                font-size 12px  
                .name 
                    color activeColor
        .rooms-wrapper
            
            // position absolute
            // left 10px 
            // right 10px
            // top 180px
            height calc(100vh - 296px)
            overflow auto  
            margin-top 20px      
        .room-list 
            padding 10px
            background bodyBg
            & > div 
                background secBg 
            .refresh-rooms 
                height 44px 
                border-radius 5px 
                border 1px solid myRoomBorderColor
                display flex 
                justify-content space-between
                align-items center 
                cursor pointer
                padding 0 12px 
                font-size 13px 
                .name 
                    color myRoomNameColor
                .refresh-btn 
                    color activeColor
            .my-room 
                margin-top 10px
                height 44px 
                border-radius 5px 
                border 1px solid myRoomBorderColor
                display flex 
                justify-content space-between
                align-items center 
                cursor pointer
                padding 0 12px 
                font-size 13px 
                .name 
                    color myRoomNameColor
                .num 
                    .in 
                        color activeColor
                    .nav-arrow 
                        position relative 
                        top 2px
            .other-room 
                margin-top 10px
                height 131px 
                border-radius 5px
                padding-left 10px
                .on 
                    height 96px 
                    border-bottom 1px solid lineColor 
                    display flex 
                    justify-content space-between
                    .room-info
                        width 204px 
                        flex 1 204px 0
                        position relative 
                        & > * 
                            position absolute
                        .avatar 
                            top 17px  
                        .info 
                            top 23px
                            left 46px
                            font-size 12px  
                            .server 
                                color activeColor   
                        .name 
                            top 41px 
                            left 46px 
                            font-size 14px 
                            color titleColor  
                            line-height 20px       
                    .room-join 
                        flex 1
                        position relative  
                        font-size 12px
                        & > * 
                            position absolute
                        .join-btn 
                            top 25px
                            right 10px
                            width 75px 
                            height 25px   
                            border-radius 3px 
                            border 1px solid boderColor 
                            color boderColor 
                            text-align center 
                            line-height 25px 
                            cursor pointer
                            &.active 
                                border-color activeColor 
                                background activeColor 
                                color primaryColor
                        .num 
                            top 62px     
                            right 35px   
                            .in 
                                color activeColor
                .under 
                    height 36px   
                    display flex 
                    justify-content space-between
                    align-items center
                    font-size 11px 
                    color boderColor
                    padding-right 10px
        .space
            height 58px 
            background bodyBg 
            display flex 
            justify-content center 
            align-items center
            span 
                font-size 13px
                color boderColor  
            img 
                margin-left 10px
                margin-top 3px                
        .footer 
            background rgba(73,73,96,.3)  
            height 58px  
            position fixed
            bottom 0
            left 0
            right 0    
            color primaryColor
            text-align center 
            line-height 58px
            font-size 17px    
            
</style>

<template>
    <div class="Home">
        <div class="cover-add" v-if="hasMyRoom"></div>
        <div class="banner" @click="toRule">
            <img src="../assets/img/banner.png" width="100%" height="100%">
        </div>
        <div class="notice" v-if="ward.length>0">
            <div class="broadcast">
                <img src="../assets/img/boradcast.png" width="18" height="16">
            </div>   
            <div class="text">
                <span class="name">{{userName}}</span>带队吃鸡，获得现金奖励<span class="name">{{money}}元</span>
            </div>
        </div>
        <div class="room-list">
            <div class="my-room" v-if="hasMyRoom" @click="backMyRoom">
                <div class="name">
                    我的房间
                </div>
                <div class="num">
                    <span class="players">
                        <span class="in">{{myRoomNow}} </span>/ {{myRoomAll}}
                    </span>
                    <img src="../assets/img/nav-arrow.png" width="8" height="15" class="nav-arrow">
                </div>
            </div>
            
            <div class="rooms-wrapper">
                <div v-for="(item,index) in roomList" class="other-room">
                    <div class="on">
                        <div class="room-info">
                            <img src="../assets/img/four.png" class="avatar" width="40" height="40">
                            <div class="info">
                                <span class="player-name">{{item.roomInfo.user.userName}}</span>
                                /
                                <span class="server">{{item.roomInfo.serverInfo.serverName}}</span>
                            </div>
                            <div class="name">
                                {{item.roomInfo.roomName}}
                            </div>
                        </div>
                        <div class="room-join">
                            <div class="join-btn" :class="{'active':(item.leaguerNum<item.roomInfo.maxLeaguerNum) && (item.status==0)}" @click="joinGameRoom(item,item.id,item.roomInfo.roomName)">
                                {{item.status==0?'加入房间':'游戏中'}}
                            </div>
                            <div class="num">
                                <span class="in">{{item.leaguerNum}}</span>/ {{item.roomInfo.maxLeaguerNum}}
                            </div>
                        </div>
                    </div>
                    <div class="under">
                        <span>{{item.roomInfo.gameInfo.name}} / {{item.roomInfo.fightType.name}}-排位赛</span>
                        <span>要求：{{item.roomInfo.requireRank}}</span>
                    </div>
                </div>
                <div class="space" @click="refresh">
                    <span>换一批</span>
                    <img src="../assets/img/re-room.png" width="12" height="12px">
                </div>
            </div>   
        </div>
        
        <div class="space"></div>
        <div class="footer">
            吃鸡大神排行榜，统计中...
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import store from '@/store/store'
import globalMap from '@/global/globalMap'
import titleName from '@/global/titleName'
import gameId from '@/global/gameId'

export default {
    name: "Home",
    data() {
        return {
           ward:[], 
           userName:'',
           money: 0,
           roomList: [],
           myRoom:null,
           myRoomId: 0,
           hasMyRoom: false,
           myRoomNow: 0,
           myRoomAll: 0,
           ws:new WebSocket(api.wsUrl),
        };
    },
    computed:{
        
    },
    methods: {
        //跳到活动页面
        toRule(){
            this.$router.push('/Rule');
        },
        //获取吃鸡奖励公告
        gameReward() {
            axios.get(api.gameReward).then(res => {
                this.ward = res.data.data;
                if(res.data.data.length>0){
                    let _data = res.data.data[0];
                    this.userName = _data.user.userName;
                    this.money = _data.money
                } 
            });
        },
        //获取我的房间
        getMyRoom() {
            let obj = {
                token: sessionStorage.getItem('token')
            }
            axios.post(api.myRoom,Qs.stringify(obj)).then(res => {
                if(res.data.data){
                    this.hasMyRoom = true;
                    this.myRoom = res.data.data;
                    this.myRoomId = res.data.data.id; 
                    this.myRoomNow = res.data.data.detailInfo.leaguerNum;
                    this.myRoomAll = res.data.data.gameRoomInfo.maxLeaguerNum;
                    sessionStorage.setItem('roomDetailId',res.data.data.roomDetailId);
                }else {
                    this.hasMyRoom = false;
                    this.myRoom = null;
                }
            });
        },
        //返回我的房间
        backMyRoom() {
            let obj = {
                    roomDetailId: sessionStorage.getItem('roomDetailId'),
                    token: sessionStorage.getItem('token')
                }
            axios.post(api.joinGameRoom,Qs.stringify(obj)).then(res => { 
                this.$router.push('JoinTeam');
            })
        },
        //获取房间列表
        getRoomList() {
            axios.get(api.gameRoomList).then(res => {
                this.roomList = res.data.data;
            });
        },
        //加入房间
        joinGameRoom(item,id,roomName) {
            if(sessionStorage.getItem('nickName')) {
                if(item.leaguerNum<item.roomInfo.maxLeaguerNum){
                    globalMap.set('roomId',id);
                    titleName.set('roomName',roomName);
                    this.$store.commit('changeRoomId',id);
                    let obj = {
                        roomDetailId: id,
                        token: sessionStorage.getItem('token')
                    }
                    axios.post(api.joinGameRoom,Qs.stringify(obj)).then(res => {  
                        if(res.data.code==200){
                            this.$router.push('JoinTeam');
                            sessionStorage.setItem('roomDetailId',id);
                            sessionStorage.setItem('roomFlag','j');
                            sessionStorage.setItem('jRoomId',id);
                        }else{
                           alert(res.data.msg) 
                        }    
                    })
                }else{
                    alert('暂时不能加入');
                }
            }else{
                this.$router.push('Login')
            }  
        },
        //刷新房间
        refresh() {
            this.getRoomList();
        },
        //告诉ws玩家要进入房间
        sendTxt(n){

        }
    },
    created() {
        
    },
    mounted() {
        this.getMyRoom();
        this.gameReward();
        this.getRoomList();     //手机上不能触发，所以暂时写进mounted

        this.ws.onopen=()=>{
            console.log('ws打开了');
        };
        this.ws.onmessage=()=>{
            this.getRoomList();
            this.getMyRoom();
        }
    },
    beforeDestroy() {
        //this.ws.close();
        this.ws.onclose=()=>{
            console.log('ws关闭了');
        };
    },
    store
};
</script>