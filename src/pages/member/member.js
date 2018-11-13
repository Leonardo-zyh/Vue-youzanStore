import './components/member_base.css'
import './components/member.css'
import member from './components/member.vue'
import address from './components/address.vue'
import all from './components/all.vue'
import form from './components/form.vue'
import './member.css'
// vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
    path: '/',
    component: member
},{
    path:'/address',
    component: address,
    children:[{
        path:'',
        // component: all,
        redirect:'all'
    },{
        path:'all',
        name:'all',
        component: all,
    },{
        path:'form',
        name:'form',
        component: form,
    }]
}]



// router实例
let router = new Router({
    routes
})

// 根组件
new Vue({
    el:'#app',
    router
})