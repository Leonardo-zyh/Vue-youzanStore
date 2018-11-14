import './components/member_base.css'
import './components/member.css'

import './member.css'
import Vue from 'vue'
import router from './router'
import store from './vuex'

// 根组件
new Vue({
    el:'#app',
    router,
    store,
})