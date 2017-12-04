<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import '../stylus/varibles.styl'
    @import '../stylus/common.styl'
    .CreacteRoom
        height 100%
        padding-bottom 10px
        background bodyBg
        .sec-wrapper
            background secBg
            .sec 
                padding-left 10px 
                min-height 65px        
                .sec-tit
                    margin-top 14px
                &:first-child 
                    padding-top 14px 
                    .sec-tit  
                        margin-top 0  
                // &:nth-of-type(2)  
                //     min-height 85px          
                .sec-con
                    padding-right 15px
                    .sec-item 
                        width 94px
                        height 25px
                        border-radius 5px 
                        border 1px solid boderColor
                        text-align center
                        line-height 25px
                        color textColor 
                        font-size 13px
                        float left
                        margin-left 20px
                        margin-top 20px
                        position relative
                        &.active 
                            color activeColor
                            border-color activeColor
                        img 
                            position absolute
                            top -1px 
                            right -1px
                        &.wait 
                            text-align left 
                            text-indent 10px  
                    .select-nav 
                        margin-top 10px
                        padding 0 10px
                        background secBg
                        height 45px
                        line-height 45px
                        position relative
                        .val 
                            position absolute
                        .right-arrow 
                            float right
                            margin-top 16px         
        .btn-wrapper
            margin-top 81px 
            padding 0 23px
            .btn-block 
                height 59px 
                border-radius 4px   
                background disabledBg  
                text-align center 
                line-height 59px
                color primaryColor   
                font-size 18px 
                &.active 
                    background primaryBg         

</style>

<template>
    <div class="CreacteRoom">
        <div class="sec-wrapper">
            <div class="sec">
                <div class="sec-tit">
                    选择游戏
                </div>
                <div class="sec-con clearfix">
                    <div v-for="(item,index) in games" class="sec-item" :class="{'active':activeGame==index,'wait':item.status==0}" @click="chooseGame(item.id,index,item.status)">
                        <img v-if="item.status==0" src="../assets/img/wait.png" alt="敬请期待" width="27" height="27">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-tit">
                    对战模式
                </div>
                <div class="sec-con clearfix">
                    <div v-for="(item,index) in gameFightTypes" class="sec-item" :class="{'active':qualifying==index}" @click="switchQualifying(item.id,index)">
                        {{item.fightType.name}}
                    </div>
                </div>
            </div>
            <div class="sec">
                <div class="sec-tit">
                    段位要求
                </div>
                <div class="sec-con clearfix">
                    <div v-for="(item,index) in dan" class="sec-item" :class="{'active':danActive==index}" @click="switchDan(item.id,index)">
                        {{item.name}}
                    </div> 
                </div>
            </div>
            <div class="sec">
                <div class="sec-tit">
                    房间名称
                </div>
                <div class="sec-con">
                    <div class="select-nav" @click="showAction('房间名称')">
                        <span class="val">
                            {{roomName}}
                        </span>
                        <img src="../assets/img/right-arrow.png" class="right-arrow" width="10" height="18">
                    </div> 
                </div>
            </div>
        </div>
        <div class="btn-wrapper">
            <div class="btn-block" :class="{'active':canClick}" @click="sureCreate">
                创建
            </div>
        </div>
        <Action :show="showAct" :title="actionTitle" :data="roomNames" @hide="hideAction" @changeVal="changeAction"></Action>
        <div ref="huanxin">
            
        </div>
    </div>
</template>



<script>
//import Vue from 'vue'

import Action from "@/components/actionSheet";
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import store from '@/store/store';
import tokenMap from '@/global/token';
import roomId from '@/global/huaxinRoomId';
import newRoomId from '@/global/newRoomId';
// import conn from '@/websdk/conn';


export default {
    name: "CreacteRoom",
    components: {
        Action
    },
    data() {
        return {
            showAct: false,
            actionTitle: '房间名称',
            severId:0,
            games: [],
            gameId: 0,
            activeGame: null,
            gameFightTypes:[],
            qualifying: null,
            fightTypeId: 0,
            dan: ['青铜','白银','黄金','铂金','钻石','王者'],
            danId: 0,
            danName: '',
            danActive: null,
            roomNames: [],
            roomName:'请选择',
            hxGroupId: 0
        };
    },
    computed: {
        canClick() {
            if(this.gameId&&this.fightTypeId&&this.danName&&this.roomName&&this.roomName!='请选择') {
                return true;
            }else {
                return false;
            }
        },

    },
    methods: {
        switchQualifying(id,index) {
            this.fightTypeId = id;
            this.qualifying = index;
        },
        switchDan(id,index) {
            this.danActive = index;
            this.danName = index+1;
            this.danId = id;
        },
        showAction(title) {
            this.showAct = true;
            this.actionTitle = title;
        },
        hideAction() {
            this.showAct = false;
        },
        changeAction(val) {
            this.roomName = val;
            this.showAct = false;
        },
        sureCreate() {
            if(this.canClick) {
                this.addGameRoom();              
            }
        },
        chooseGame(id,index,status) {
            if(status!=0){
                this.gameId = id;
                this.activeGame = index;
            } 
        },
        //获取个人中心，为了拿到serverId,并且存入localstronge
        getUserGameInfo() {
            let obj = {
                //gameId: gameId.get('gameId') || sessionStorage.getItem('gameId'),  陈乐说暂时不传gameId
                token: tokenMap.get('token') || sessionStorage.getItem('token')
            }
            axios.post(api.getUserGameInfo,Qs.stringify(obj)).then(res => {
                this.severId = res.data.data.serverId;
                sessionStorage.setItem('serverId',res.data.data.serverId);
                sessionStorage.setItem('nickName',res.data.data.nickName);
            })
        },
        //获取选择游戏
        getGameList() {
            axios.get(api.gameList).then(res => {
                this.games = res.data.data;
			});
        },
        //获取排位模式
        gameFightType() {
            axios.get(api.gameFightType).then(res => {
                this.gameFightTypes = res.data.data;
			});
        },
        //获取段位
        getGameRank() {
            axios.get(api.gameRank).then(res => {
                this.dan = res.data.data;
			});
        },
        //获取房间名集合
        getRoomNames() {
            axios.get(api.gameRoomNames).then(res => {
                this.roomNames = res.data.data;
            });
        },
        //创建房间
        addGameRoom() {
            // this.hxCreateGroup().then(res=>{
            //     let obj = {
            //         roomName:this.roomName,
            //         gameId:this.gameId,
            //         hxRoomId: res || roomId.get('RoomId') || sessionStorage.getItem('hx_roomId') ,
            //         gameServerId: sessionStorage.getItem('serverId'),
            //         fightTypeId: this.fightTypeId,
            //         ranks: this.danId,
            //         token: tokenMap.get('token') || sessionStorage.getItem('token')
            //     };
            //     console.log(res);
            //     axios.post(api.addGameRoom,Qs.stringify(obj)).then(res => {
            //         if(res.data.data){
            //             newRoomId.set('newRoomId',res.data.data.id);
            //             sessionStorage.setItem('newRoomId',res.data.data.id);    
            //             sessionStorage.setItem('hx_roomeName',this.roomName);
            //             this.$router.push('JoinTeam');
            //         }else {
            //             alert(res.data.msg);
            //         }
                    
            //     });
            // });

            let obj = {
                    roomName:this.roomName,
                    gameId:this.gameId,
                    //hxRoomId: res || roomId.get('RoomId') || sessionStorage.getItem('hx_roomId') ,
                    gameServerId: this.severId,
                    fightTypeId: this.fightTypeId,
                    ranks: this.danId,
                    token: sessionStorage.getItem('token')
                };
            axios.post(api.addGameRoom,Qs.stringify(obj)).then(res => {
                if(res.data.code==5015){
                    alert(res.data.msg);
                }else{
                    if(res.data.data){
                        //newRoomId.set('newRoomId',res.data.data.id);
                        sessionStorage.setItem('roomFlag','c');     //这个表示是创建出来的房间
                        sessionStorage.setItem('cRoomId',res.data.data.id);     //存储创建出来的房间的id
                        sessionStorage.setItem('newRoomId',res.data.data.id);    //创建房间成功保存id
                        sessionStorage.setItem('hx_roomeName',this.roomName);
                        this.$router.push('JoinTeam');
                    }else {
                        alert(res.data.msg);
                    }
                }
                
            });    
        }, 
        //创建环信群组
        async hxCreateGroup() {
            return new Promise((resolve,reject)=>{
                const options = {             
                    data: {
                        groupname: this.roomName,
                        desc: this.roomName,
                        members: [sessionStorage.getItem('phone')],
                        public: true,
                        approval: false,
                        allowinvites: false
                    },
                    success: function (respData) {
                        this.hxGroupId = respData.data.groupid;
                        alert('环信房间创建成功');
                        console.log(this.hxGroupId);
                        resolve(this.hxGroupId);    //传给下个promise
                        roomId.set('RoomId',respData.data.groupid);
                        sessionStorage.setItem('hx_roomId',respData.data.groupid);
                    },
                    error: function (err) {
                        alert('环信房间创建失败');
                        console.log(err);
                    }
                };
                conn.createGroupNew(options); 
            }); 
        }  
    },
    created() {
        this.getUserGameInfo();
        this.getGameList();
        this.gameFightType();
        this.getGameRank();
        this.getRoomNames();
    },
    mounted() {
        
    },
    store
};
</script>