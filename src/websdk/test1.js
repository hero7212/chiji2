import Vue from 'vue';
import websdk from 'easemob-websdk'

function doWS() {
    let webIM = window.WebIM = websdk 
    Vue.prototype.$WebIM = webIM
    const imConn = new webIM.connection({
        isMultiLoginSessions: webIM.config.isMultiLoginSessions,
        https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
        url: webIM.config.xmppURL,
        heartBeatWait: webIM.config.heartBeatWait,
        autoReconnectNumMax: webIM.config.autoReconnectNumMax,
        autoReconnectInterval: webIM.config.autoReconnectInterval,
        apiUrl: webIM.config.apiURL,
        isAutoLogin: true
    })
    Vue.prototype.$imConn = imConn
    
    // var options = { 
            // 	username: 'adyx18913005834',
            // 	password: '123456',
            // 	nickname: 'adyx18913005834',
            // 	appKey: Vue.prototype.$WebIM.config.appkey,
            // 	success: function (suc) {
            //         console.log(suc)
            //      },  
            // 	error: function (e) {
            //         console.log(e)
            //      }, 
            // 	apiUrl: Vue.prototype.$WebIM.config.apiURL
            // };
            // Vue.prototype.$imConn.registerUser(options);
    
    var options1 = {
        apiUrl: Vue.prototype.$WebIM.config.apiURL,
        user: 'adyx18913005835',
        pwd: '123456',
        appKey: Vue.prototype.$WebIM.config.appkey,
        success: function (token) {
            var token = token.access_token;
            localStorage.setItem('hxToken',token)
            //WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
        },
        error: function(){
        }
    };
    Vue.prototype.$imConn.open(options1);
    
    var _token = localStorage.getItem('hxToken')
    var options2 = {
        apiUrl: Vue.prototype.$WebIM.config.apiURL,
        user: 'adyx18913005835',
        accessToken: _token,
        appKey: Vue.prototype.$WebIM.config.appkey
    };
    
    
    Vue.prototype.$imConn.open(options2);
    
    Vue.prototype.$imConn.listen({
        onOpened: function ( message ) {          //连接成功回调
            alert('连接成功');
            // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
            // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
            // 则无需调用conn.setPresence();             
        },  
        onClosed: function ( message ) {
            console.log('已经关闭了');
        },         //连接关闭回调
        
    });
}

export default doWS;
