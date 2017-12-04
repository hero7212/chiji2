import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    token:'',   //"u+2dac9NHDoCRQ5spg/D7OA338NBeCFlsvedcq31vkHrLKidjbpBdyNb53XdEmrq"
    serverId: 1,  //1
    roomId: 1,  //房间的id 不是roomId
    hadRoom: false
}

const mutations={
    saveToke(token){
        state.token = token;
    },
    changeRoomId(id){
        state.roomId = id;
    },
    changeHadRoom(hadRoom){
        state.hadRoom = hadRoom;
    }
}

export default new Vuex.Store({
    state,
    mutations
})