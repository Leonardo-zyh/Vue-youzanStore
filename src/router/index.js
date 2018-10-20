import Vue from 'vue'
import router from 'vue-router'   //引用路由
import HelloWorld from '@/components/HelloWorld'
import HelloEarth from '@/components/HelloEarth'

Vue.use(router)

export default new router({
  routes: [
    {
      path: '/helloworld',         //指定要跳转的路径
      name: 'HelloWorld',     
      component: HelloWorld   //指定要跳转的组件
    },    {
      path: '/helloearth',         //指定要跳转的路径
      name: 'HelloEarth',     
      component: HelloEarth   //指定要跳转的组件
    }
  ]
})
