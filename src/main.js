// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import rt from './router/index'
import router from 'vue-router'   //引用路由
import HelloWorld from './components/HelloWorld'



Vue.use(router)   //使用路由
Vue.config.productionTip = false

/*配置路由
var rt = new router({
  routes: [{
    path: '/',//指定要跳转的路径
    component: HelloWorld//指定要跳转的组件
  }]
})

//创建状态仓库，注意Store,state不能改
var store = new Vuex.Store({
  state:{
    num:888
  },
  mutations；{
    increase(){
      
    }
  }
  })
  //直接通过this.$sore.state.XXX拿到全局状态

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:rt,
  components: { App },
  template: '<App/>'
})
