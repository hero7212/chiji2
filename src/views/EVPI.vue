<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '../stylus/varibles.styl'
.logo 
    height 170px
    display flex
    justify-content center
    align-items center
.select-wrapper 
    padding 0 10px
    border-radius 0 0 5px 5px
    .select-nav 
        padding 0 10px
        background secBg
        height 45px
        line-height 45px
        border-bottom 1px solid #eeeeee
        position relative
        .val 
            position absolute
            right 30px
        .right-arrow 
            float right
            margin-top 16px
.tip
    font-size 11px
    color textColor
    text-align left      
    margin-top 18px  
    padding-left 10px 
.btn-wrapper 
    margin-top 44px
    padding 0 10px
    .btn-block 
        height 49px
        line-height 49px
        text-align center
        color primaryColor
        background disabledBg 
        font-size 18px
        border-radius 5px
        &.active 
            background primaryBg
</style>

<template>
    <div class="EVPI">
        <div class="logo">
            <img src="../assets/img/logo.png" alt="电竞邦" width="146" height="43">
        </div>
        <div class="select-wrapper">
            <div class="select-nav" @click="showAction('关联游戏')">
                <span class="lab">
                    关联游戏
                </span>
                <span class="val">
                    {{gameVal}}
                </span>
                <img src="../assets/img/right-arrow.png" class="right-arrow" width="10" height="18">
            </div> 
            <div class="select-nav" @click="showAction('区服')">
                <span class="lab">
                    选择区服
                </span>
                <span class="val">
                    {{severArea}}
                </span>
                <img src="../assets/img/right-arrow.png" class="right-arrow" width="10" height="18">
            </div> 
            <div class="select-nav">
                <input type="text" maxlength="7" placeholder="输入您的角色昵称" v-model="playName">
            </div>
        </div>
        <div class="tip">
            昵称与游戏内昵称不一致，是拿不到平台奖励的哦！
        </div>
        <div class="btn-wrapper">
            <div class="btn-block" :class="{'active':canClick}" @click="toCreate">
                保存
            </div>
        </div>
        <Action :show="showAct" :title="actionTitle" :data="actionData" :sucFn="actSucFn" :labelName="actLabelName" @hide="hideAction" @changeVal="changeAction"></Action>
    </div>
</template>

<script>
import Action from "@/components/actionSheet";
import axios from 'axios';
import api from '@/api/api';
import Qs from 'qs';
import store from '@/store/store';
import tokenMap from '@/global/token';
import gameId from '@/global/gameId';
import phone from '@/global/phone';
import hx_token from '@/global/huanxinToken';
// import conn from '@/websdk/conn';

export default {
    name: "EVPI",
    components: {
        Action
    },
    data() {
        return {
            showAct: false,
            actionTitle: '',
            actLabelName: '',
            actionData: null,
            actSucFn: null,
            games: [],
            gameVal: '',
            gameId: 0,
            severAreas: [],
            severArea:'',
            serverId: 0,
            playName:'',
        };
    },
    computed:{
        canClick() {
            if(this.gameVal&&this.severArea&&this.playName) {
                return true;
            }else {
                return false;
            }
        }
    },
    methods: {
        showAction(title) {
            if(title=='关联游戏') {
                this.actLabelName = 'name';
                this.actionData = this.games;
                this.actSucFn = this.getGameServerList;
            }else {
                this.actLabelName = 'serverName';
                this.actionData = this.severAreas;
                this.actSucFn = null;
            }
            this.showAct = true;
            this.actionTitle = title;
        },
        hideAction() {
            this.showAct = false;
        },
        changeAction(val) {
            if(this.actionTitle=='关联游戏') {
                this.gameVal = val.name;
                this.gameId = val.id;
            }else {
                this.severArea = val.serverName;
                this.serverId = val.id;
                //this.$store.state.serverId = val.id;
                sessionStorage.setItem('serverId',val.id);
            }
            this.showAct = false;
        },
        toCreate() {
            if(this.canClick) {
                this.updateUserGameInfo();
            }
        },
        //获取关联游戏
        getGameList() {
            axios.get(api.gameList).then(res => {
                this.games = res.data.data;
			});
        },
        //获取选择区服
        getGameServerList() {
            let obj = {
                gameId: this.gameId
            };
            axios.get(api.gameServerList,{params:obj}).then(res => {
                this.severAreas = res.data.data;
			});
        },
        //确认完善游戏信息
        updateUserGameInfo() {
            
            // this.hxRegister(userName,nickName).then(this.hxLogin(userName)).then(this.hxLogin2(userName)).then(()=>{
            //     let obj = {
            //         gameId: this.gameId,
            //         serverId: this.serverId,
            //         nickName: this.playName,
            //         //token: this.$store.state.token
            //         token: tokenMap.get('token') || sessionStorage.getItem('token')
            //     };
            //     axios.post(api.updateUserGameInfo,Qs.stringify(obj)).then(res => {
            //         this.$router.push('PersonalCenter');
            //         gameId.set('gameId',this.gameId);
            //         sessionStorage.setItem('gameId',this.gameId);
            //         sessionStorage.setItem('nickName',this.playName);
            //     });
            // });
            
            let obj = {
                gameId: this.gameId,
                serverId: this.serverId,
                nickName: this.playName,
                token: tokenMap.get('token') || sessionStorage.getItem('token')
            };
            axios.post(api.updateUserGameInfo,Qs.stringify(obj)).then(res => {
                alert('您的信息已经成功完善！');
                this.$router.push('/');
                gameId.set('gameId',this.gameId);
                sessionStorage.setItem('gameId',this.gameId);
                sessionStorage.setItem('nickName',this.playName);
                //this.hxRAndL(userName,nickName);
            });
        },
        //环信注册
        // async hxRegister(userName,nickName) {
        //     return new Promise((resolve,reject)=>{
        //         const options = {
        //             username: userName,
        //             password: '123456',
        //             nickname: nickName,
        //             appKey: WebIM.config.appkey,
        //             success: function (suc) {
        //                 console.log(suc)
        //                 resolve();
        //             },
        //             error: function (error) {
        //                 console.log(error)
        //             },
        //             apiUrl: WebIM.config.apiURL
        //         };
        //         conn.registerUser(options);
        //     });      
        // },
        //环信登录第一步
        // async hxLogin(userName) {
        //     return new Promise((resolve,reject)=>{
        //         const options1 = {
        //             apiUrl: WebIM.config.apiURL,
        //             user: userName,
        //             pwd: '123456',
        //             appKey: WebIM.config.appkey,
        //             success: function (h_token) {
        //                 console.log(h_token);
        //                 let token = h_token.access_token;
        //                 hx_token.set('hx_token',token);
        //                 sessionStorage.setItem('hx_token',token)
        //                 resolve();
        //             },
        //             error: function(err){
        //                 console.log(err);
        //             }
        //         };
        //         conn.open(options1);
        //     })   
        // },
        //环信登录第二部
        // async hxLogin2(userName) {
        //     return new Promise((resolve,reject)=>{
        //         const options = {
        //             apiUrl: WebIM.config.apiURL,
        //             user: userName,
        //             accessToken: hx_token.get('hx_token') || sessionStorage.getItem('hx_token'),
        //             appKey: WebIM.config.appkey
        //         };
        //         conn.open(options);
        //         resolve();
        //     })   
        // },
        
        
    },
    created() {
        this.getGameList();
        //this.hxRegister(userName,nickName).then(this.hxLogin(userName));//调用环信注册
        //this.hxLogin(userName);//调用环信登录
    },
    store
};
</script>