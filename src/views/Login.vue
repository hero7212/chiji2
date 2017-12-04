<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import '../stylus/varibles.styl'
    .Login 
        .input-wrapper 
            margin-top 10px
            background secBg
            height 96px
            padding-left 15px
            //display flex 
            flex-direction column
            .input-area
                height 49px
                font-size 15px  
                //flex 1
                display flex
                line-height 49px 
                &:first-child 
                    border-bottom 1px solid lineColor
                .lab 
                    flex 1
                    height 100%
                    line-height 48px
                    min-width 60px
                .input 
                    flex 4
                    display flex
                    input 
                        display block
                        flex 2 
                        height 24px
                        margin-top 12px
                        max-width 130px
                    .btn 
                        position relative 
                        z-index 1026
                        flex 1
                        //height 100% 
                        // display flex 
                        // justify-content flex-end
                        //align-items center
                        //padding-right 15px
                        .resend-btn 
                            width 98px
                            height 25px
                            color primaryColor
                            background activeColor
                            text-align center 
                            line-height 25px 
                            border-radius 3px  
                            position absolute 
                            top 13px 
                            right 15px
                            &.disabled 
                                background disabledBg      
        .tip 
            padding-left 15px  
            font-size 12px
            color textColor 
            margin-top 15px 
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
    <div class="Login">
        <div class="input-wrapper">
            <div class="input-area">
                <div class="lab">
                    手机号：
                </div>
                <div class="input">
                    <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="telNum" ref="phoneInp" class="txt">
                    <div class="btn">
                        <div @click="getVerificationCode" class="resend-btn" :class="{'disabled':btnDisabled}">
                            {{sendVal}}    
                        </div>   
                    </div>
                </div>
            </div>
            <div class="input-area">
                <div class="lab">
                    验证码：
                </div>
                <div class="input">
                    <input type="text" maxlength="4" minlength="4" placeholder="请输入验证码" v-model="verificationCode" class="txt">
                </div>
            </div>
        </div>
        <div class="tip">
            温馨提示：未注册电竞帮的手机号，登录时将自动注册。
        </div>
        <div class="btn-wrapper">
            <div class="btn-block" :class="{'active':canClick}" @click="doLogin">
                登录
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import store from '@/store/store'
import tokenMap from '@/global/token'
import phone from '@/global/phone'
// import conn from '@/websdk/conn';

export default {
    name: "Login",
    data() {
        return {
            telNum: '',
            verificationCode: '',
            resend: false,
            count: 60,
            sendVal:'获取验证码',
            btnDisabled:false
        };
    },
    computed:{
        canClick() {
            if(this.telNum&&this.verificationCode) {
                return true;
            }else {
                return false;
            }
        }
    },
    methods: {
        //获取验证码
        getVerificationCode() {
            let getMsmObj = {
                account:this.telNum,
                type:3
            };

            axios.post(api.getMsm,Qs.stringify(getMsmObj)).then(res => {
                if(res.data.code==200){
                    this.btnDisabled = true;
                    this.sendVal = `重新获取${this.count}`;
                    let timer=setInterval(()=>{
                        --this.count;
                        this.sendVal = `重新获取${this.count}`;
                        if(this.count<1){
                            clearInterval(timer);
                            this.btnDisabled = false;
                            this.sendVal = '重新获取';
                        }
                    },1000)
                }else{
                    alert(res.data.msg);
                }
            }).catch(err=>{
                alert(JSON.stringify(err));
            });
            
        },
        doLogin() {
            // let nickName = `adyx_${phone.get('phone') || sessionStorage.getItem('phone')}`;
            // let userName = phone.get('phone') || sessionStorage.getItem('phone');
            let va = this.$refs.phoneInp.value;
            let [nickName,userName] = [`adyx_${va}`,va];

            if(this.telNum&&this.verificationCode) {
                let system = () => {
                    let uA = navigator.userAgent;
                    if(uA.indexOf('Android') > -1 || uA.indexOf('Adr') > -1){
                        return 'Android'
                    }else {
                        return 'IOS'
                    }
                };
                let loginObj = {
                    account:this.telNum,
                    code: this.verificationCode,
                    system: system(),
                    registration_id: 1,
                    source: '吃鸡'
                } 
                axios.post(api.login,Qs.stringify(loginObj)).then(res => {
                    if(res.data.code==5014){
                        //this.hxRAndL(userName,nickName);
                    }

                    console.log(nickName);
                    phone.set('phone',this.telNum);
                    sessionStorage.setItem('phone',this.telNum);
                    sessionStorage.setItem('token',res.data.data.token);
                    

                    if(res.data.data.isUpdate==0){  //用户没有完善过信息
                        this.$router.push('EVPI');
                    }else{
                        let obj = {
                            //gameId: gameId.get('gameId') || sessionStorage.getItem('gameId'),  陈乐说暂时不传gameId
                            token: res.data.data.token
                        }
                        axios.post(api.getUserGameInfo,Qs.stringify(obj)).then(res => {
                            sessionStorage.setItem('serverId',res.data.data.serverId);
                            sessionStorage.setItem('nickName',res.data.data.nickName);
                        })
                        this.$router.push('/');
                    }
                    
                });
            }   
        },
        //环信注册加登录
        // hxRAndL(userName,nickName) {
        //     //注册
        //     const options0 = {
        //         username: userName,
        //         password: '123456',
        //         nickname: nickName,
        //         appKey: WebIM.config.appkey,
        //         success: function (suc) {
        //             console.log(suc);
        //             login1();
        //         },
        //         error: function (error) {
        //             console.log(error)
                    
        //         },
        //         apiUrl: WebIM.config.apiURL
        //     };
        //     conn.registerUser(options0);
        //     //拿hx_token登录
        //     function login1() {
        //         const options1 = {
        //             apiUrl: WebIM.config.apiURL,
        //             user: userName,
        //             pwd: '123456',
        //             appKey: WebIM.config.appkey,
        //             success: function (h_token) {
        //                 console.log(h_token);
        //                 let token = h_token.access_token;
        //                 hx_token.set('hx_token',token);
        //                 sessionStorage.setItem('hx_token',token);
        //                 alert('环信token存了');
        //                 login2();
        //             },
        //             error: function(err){
        //                 console.log(err);
        //             }
        //         };
        //         conn.open(options1);
        //     }
        //     //用hx_token登录
        //     function login2() {
        //         const options2 = {
        //             apiUrl: WebIM.config.apiURL,
        //             user: userName,
        //             accessToken: hx_token.get('hx_token') || sessionStorage.getItem('hx_token'),
        //             appKey: WebIM.config.appkey
        //         };
        //         conn.open(options2);
        //     } 
        // }
    },
    created() {
         
    },
    store
};
</script>