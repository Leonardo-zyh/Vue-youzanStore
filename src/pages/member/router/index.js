
// vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import member from '../components/member.vue'
import address from '../components/address.vue'
import all from '../components/all.vue'
import form from '../components/form.vue'

let routes = [{
    path: '/',
    component: member
},{
    path:'/address',
    component: address,
    //子路由配置
    children:[{
        path:'',
        //component:require('./components/all.vue')
        redirect:'all'  //重定向
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

export default router