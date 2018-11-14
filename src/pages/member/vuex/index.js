// vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from '@/modules/js/addressService.js'

// 创建Store实例
const store = new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init(state,lists){
            state.lists = lists
        }
    },
    actions:{
        getLists({commit}){
            Address.list().then(res=>{
                commit('init',res.data.lists)                
              })
        }
    }
})

export default store