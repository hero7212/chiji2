import Vue from 'vue';
import websdk from 'easemob-websdk'
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