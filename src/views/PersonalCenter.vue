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
    <div class="PersonalCenter">
        <div class="logo">
            <img src="../assets/img/logo.png" alt="电竞邦" width="146" height="43">
        </div>
        <div class="select-wrapper">
            <div class="select-nav">
                {{personal.gameInfo.name}}
            </div> 
            <div class="select-nav">
                {{personal.serverInfo.serverName}}
            </div> 
            <div class="select-nav">
                {{personal.nickName}}
            </div>
        </div>
 
        <div class="btn-wrapper">
            <div class="btn-block active" @click="exitAccount">
                退出登录
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import gameId from '@/global/gameId';
import tokenMap from '@/global/token';
import store from '@/store/store';

export default {
    name: "PersonalCenter",
    data() {
        return {
            personal:{}
        };
    },
    computed:{
        
    },
    methods: {
        //返回首页
        toHome() {
            this.$router.push('/');
        },

        //获取个人中心
        getUserGameInfo() {
            let obj = {
                //gameId: gameId.get('gameId') || sessionStorage.getItem('gameId'),  陈乐说暂时不传gameId
                token: tokenMap.get('token') || sessionStorage.getItem('token')
            }
            axios.post(api.getUserGameInfo,Qs.stringify(obj)).then(res => {
                this.personal = res.data.data
            })
        },
        //退出登录
        exitAccount() {
            sessionStorage.clear();
            this.$router.push('/');
            location.reload(); 
        }
    },
    created() {
        this.getUserGameInfo();
    }
};
</script>