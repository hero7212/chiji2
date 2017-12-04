<style lang="stylus">
	@import './stylus/varibles.styl'
	#app 
		position absolute
		top 0
		left 0 
		right 0
		bottom 0
		background bodyBg
	.nav-bar
		height 44px
		line-height 44px
		font-size 18px
		color titleColor
		background secBg
		border-top 1px solid #d1d1d1 
		border-bottom 1px solid #d1d1d1 
		position relative
		&.titleBgBlack
			background blackBg
			color #fff
		.left-arrow
			display inline-block
			width 10px
			height 18px
			position absolute
			left 10px
			top 13px
			cursor pointer
		.head 
			position absolute
			left 10px
			top 12px
			cursor pointer	
		.add 	
			position absolute
			right 10px
			top 14px
			cursor pointer
		.quit 
			position absolute
			right 10px
			top 0
			font-size 14px
			cursor pointer			
		.title
			text-align center	
</style>

<template>
	<div id="app">
		<div class="nav-bar" :class="{'titleBgBlack':titleBgBlack}">
			<span v-if="!isJoinTeam">
				<img v-if="!isHomePage" class="left-arrow" src="./assets/img/left-arrow.png" @click="toBack">
			</span>
			<img v-if="isHomePage" class="head" src="./assets/img/head.png" width="22" height="22" @click="toWhich">
			<div class="title">
				{{navTitle}}
			</div>
			<img v-if="isHomePage" class="add" src="./assets/img/add.png" width="18" height="18" @click="toWho">
			<!--
			<span v-if="showQuit" class="quit" @click="disbandRoom">{{doRoom}}</span>
			-->
		</div>
		<router-view/>
	</div>
</template>

<script>
import store from '@/store/store';
import {mapState} from 'vuex';
import axios from 'axios';
import Qs from 'qs';
import api from '@/api/api';
import titleName from '@/global/titleName';
import tokenMap from '@/global/token';
import gameId from '@/global/gameId';
import newRoomId from '@/global/newRoomId';

export default {
	name: 'app',
	data() {
		return {
			isFirstLoad: true,
			isJoinTeam: false,
			titleName: '',
			isHomePage: false,
			showQuit: false,
			doRoom: '退出',
			titleBgBlack: false,
		}
	},
	computed:{
		navTitle() {
			switch(this.$route.name)
			{
				case 'CreacteRoom':
					this.isHomePage = false; 
					this.showQuit = false;
					this.isJoinTeam =false;
					this.titleBgBlack = false;
					return '创建房间'
				break;
				case 'EVPI': 
					this.isHomePage = false;
					this.showQuit = false;
					this.titleBgBlack = false;
					return '完善信息'
				break;
				case 'PersonalCenter': 
					this.isHomePage = false;
					this.showQuit = false;
					this.titleBgBlack = false;
					return '个人中心'
				break;
				case 'Login':
					this.isHomePage = false; 
					this.showQuit = false;
					this.titleBgBlack = false;
					return '登录'
				break;
				case 'Rule': 
					this.isHomePage = false;
					this.showQuit = false;
					this.isJoinTeam = false;
					this.titleBgBlack = false;
					return '活动规则'
				break;
				case 'JoinTeam': 
					this.isHomePage = false;
					this.isJoinTeam = true;
					this.showQuit = true;
					this.titleBgBlack = true;
					return titleName.get('roomName') || '我的房间'
				break;
				default: 
					this.isHomePage = true;
					this.showQuit = false;
					this.titleBgBlack = false;
					return '电竞帮-吃鸡大厅'
			}
		},
	},
	methods: {
		toWhich() {
			if(sessionStorage.getItem('token')) {
				this.toPersonalCenter();
			}else {
				this.toLogin();
			}
		},
		toWho() {
			if(sessionStorage.getItem('token')){
				this.toCreate();
			}else{
				this.toLogin();
			}
			
		},
		toLogin() {
			this.isHomePage = false;
			this.$router.push('Login');
		}, 
		toCreate() {
			this.isHomePage = false;
			this.$router.push('CreacteRoom');
		},
		toPersonalCenter() {
			this.isHomePage = false;
			this.$router.push('PersonalCenter');
		},
		toBack() {
			this.$router.go(-1);
		},
		//解散房间
		// disbandRoom() {
		// 	let obj = {
		// 		roomDetailId: newRoomId.get('newRoomId') || sessionStorage.getItem('newRoomId'),
		// 		token:tokenMap.get('token') || sessionStorage.getItem('token')
		// 	}

		// 	axios.post(api.disbandRoom,Qs.stringify(obj)).then(res => {
		// 		this.$router.push('/');
		// 		this.showQuit = false;
		// 	});
		// }
	},
	beforeCreate() {
		localStorage.clear();
	},
	created() {
		
	},
	store
}
</script>