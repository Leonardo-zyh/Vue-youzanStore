# my-project
# 运行   npm run div

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).




#vue-­router路由基本加载
1. 安装
npm install --save vue-router
2. 引用
import router from 'vue-router'
Vue.use(router)

3. 配置路由文件，并在vue实例中注入
~~~
var rt = new router({
routes:[{
path:'/',//指定要跳转的路径
component:HelloWorld//指定要跳转的组件
}]
})
new Vue({
el: '#app',
router:router,
components: { App },
template: '<App/>'
})
~~~
4. 确定视图加载的位置
<router-view></router-view>




#  vue-­router路由的跳转

<router-link to="/"></router-link>
<template>
    <ul>
        <li>
            <router-link to="/helloworld">HELLO WORLD</router-link>
        </li>
        <li>
            <router-link to="/helloearth">HELLO EARTH</router-link>
        </li>
    </ul>
</template>


*  <router-link to="/helloworld">路由的跳转
*  对组件路由设置
    import HelloWorld from '@/components/HelloWorld'
    Vue.use(router)
    {
      path: '/helloworld',         //指定要跳转的路径
      name: 'HelloWorld',     
      component: HelloWorld   //指定要跳转的组件
    }



#  vue­router路由参数的传递
1. 必须在路由内加入路由的name
2. 必须在path后加/: + 传递的params参数 或 name和params参数

<router-link
    :to="{name: 'HelloWorld',params:{msg: '只有一个世界'}}">
    HELLO WORLD
</router-link>
读取参数： $route.params.XXX
方式：===/helloworld/你好世界

<router-link
    :to="{path: '/helloearth',query:{msg: '只有一个地球'}}">
    HELLO WORLD
</router-link>
方式：===/helloworld?name=XX&count=xxx

函数模式
你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

{ path: '/search', component: SearchUser, props: (route) => ({
query: route.query.q }) }



# Axios之get请求详解

##axios的简介：
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
从浏览器中创建 XMLHttpRequest
从 node.js 发出 http 请求
支持 Promise API
拦截请求和响应
转换请求和响应数据
取消请求
自动转换JSON数据
客户端支持防止 CSRF/XSRF


#子父级传递数据
绑定和props，触发监听




# Vuex之store
用来管理状态，共享数据，在各个组件之间管理外部状态

第一步：引入vuex，并通过use方法使用它
第二步： 创建状态仓库
第三步：通过this.$sore.state.XXX直接拿到需要的数据
~~~
    //创建状态仓库，注意Store,state不能改
    var store = new Vuex.Store({
        state:{
            XXX：xxx
        }
    })
    //直接通过this.$sore.state.XXX拿到全局状态
~~~



#Vuex的相关操作
vuex状态管理的流程
`view———­>actions———–>mutations—–>state————­>view`

~~~
//创建状态仓库，注意Store,state不能改
var store = new Vuex.Store({
  state: {
    XXX：xxx
  },
  mutations: {
  }
})
this.$store.commit(XXX);
    此处的XXX是你在mucations中定义的方法名
    
var store = new Vuex.Store({
  state: {
    XXX：xxx
  },
  mucations: {
    a: function (state) {
    }
  },
  actions: {
    b: function (context) {
      context.commit('a');
    }
  }
})
如何调用
this.$store.dispatch(XXX);
getters: {
}
this.$store.getters.getCount
~~~
注意：actions提交的是mutation,而不是直接变更状态
actions可以包含异步操作，但是mutation只能包含同步操作