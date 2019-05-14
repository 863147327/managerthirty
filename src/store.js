import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 实例化
const store =  new Vuex.Store({
    state:{
        menulist: []
    },
    // 暴露出去的方法
    mutations: {
        changeMenulist(state,newmenulist){
            // console.log(newmenulist)
            state.menulist = newmenulist
        }
    }
})

export default store