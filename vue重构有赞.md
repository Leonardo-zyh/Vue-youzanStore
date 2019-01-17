# youzan

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


# dns-prefetch  预解析，减少图片加载时间


# FastClick解决点击击穿
阻止事件冒泡    event.preventDefault();

对于没有doctype声明的页面里可以使用 document.body.scrollTop 来获取 scrollTop高度 ； 
对于有doctype声明的页面则可以使用 document.documentElement.scrollTop； 

带有V1演示的Velocity V2 beta - 它们在滚动方面完全不兼容。在V2中，它现在是滚动的元素的属性（即容器）。

#Vue实例挂载
    el:'',app.$mount()
    不能是body和html
    单vue组件，template必须，根节点一个
    data存放数据，poprs传参
    created获取axios数据

#首页
    实现：商品推荐列表数据的获取和渲染、触底加载更多数据、底部导航和头部轮播的组件化
    迁移静态页面
    增加modules下的css和js文件夹，迁移样式文件
    实例：el、data、methods、components、created、mounted
    生命周期
    模板语法
    条件渲染
    列表渲染
    事件处理
    组件: 底部导航组件、轮播组件
* UI库：mint-ui
    当即将滚动至列表底部时，自动加载更多数据
* vux
* weui
* 第三方插件
    axios
    swiper

#数据获取渲染加载数据
* UI库：mint-ui封装
~~~
v-infinite-scroll="getLists"
infinite-scroll-disabled="loading"
infinite-scroll-distance="20"
~~~
~~~
getLists(){
    if(this.allLoaded) return
    this.loading = true//开始请求
    this.$http.get(url.hotLists,{
      pageNum:this.pageNum,
      pageSize:this.pageSize,
    }).then(res=>{
      let curLists = res.data.lists
      //判断所以数据是否加载完毕 
      if(curLists.length < this.pageSize ){
        this.allLoaded = true
      }
      if(this.lists){
        this.lists = this.lists.concat(curLists)
      }else{
        this.lists = curLists
      }
      this.loading = false//结束请求
      this.pageNum +=1
    })
    },
~~~

#foot底部导航组件
* qs库，这个库可以方便我们提取出当前url后面的查询参数。
let { index } = qs.parse(location.search.substr(1));
~~~
changeNav(list, index) {
      //this.curIndex = index;
      location.href = `${list.href}?index=${index}`;
      //页面跳转
      event.preventDefault();      
    }
~~~
#轮播组件
swiper插件提供的轮播组件库
~~~
    new Swiper('.swiper-container',{
      loop:true,
      pagination: '.swiper-pagination',
      autoplay: 2000
    })
    getBanner(){//获取轮播数据
      this.$http.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
        
      })
~~~
~~~
<Swipe :lists="bannerLists" name="swipe.vue" v-if="bannerLists"></Swipe>
~~~

#mixins属性，对filters属性和底部导航栏组件的注入进行打包


#分类页实现
#列表页，商品详情页
import qs from 'qs'
let {keyword,id} = qs.parse(location.search.substr(1))
import Velocity from 'velocity'
toTop(){
            Velocity(document.documentElement,'scroll',{duration:500})
            this.isShow=false //回到顶部图标消失
        }

#solt组件，
#组件通讯bus，https://www.jianshu.com/p/4fa3bf211785
#过渡效果，https://cn.vuejs.org/v2/guide/transitions.html
#sku算法，https://www.jianshu.com/p/4a563212f431



#商品详情页
<a href="'goods.html?id='+ list.id">
<style>
    [v-cloak] {display: none}
</style>
<div v-cloak>
  {{ message }}
</div>

* 轮播图片固定宽高
* weui layers规范
* 过渡
<transition name=fade>
      <div @touchmove.prevent="" class="test" @click="showModal = false" v-show="showModal"></div>
</transition>
*  购物车弹出层
~~~
 chooseSku(type) {//显示购买菜单
      this.skuType = type
      this.showModal = true
    },
    changeSku(num) {//增减数量
      if (num < 0 && this.skuNum === 1) return
      this.skuNum += num
    },

    addCart() {//加入购物车
      $.ajax($.url.cartAdd, {
        id,
        skuNum: this.skuNum
      }).then((data) => {
        if (data.status === 200) {
          this.showModal = false
          this.showAddMsg = true //添加成功的信息
          this.isAddedCart = true //显示购物车图标
          setTimeout(() => this.showAddMsg = false, 1200)
        }
      })
    }
  },
  ~~~

#购物车
* 商品的获取渲染以及增加是否被选中属性
* 获取后台数据加载处理或动态响应式处理
* 商品选中店铺选中全选，影响价格三级联动。
* 编辑状态，其余不可切换。对数量操作，加减更改。删除，单商品删除，选中(多个)删除，商品删除店铺删除。
* 原生事件，滑动删除页面，Volecity。
* 删除多个商品进行过滤处理
* shop good

* fetch层封装，
* 同一个场景下思维层封装
* 问题呈现，左滑删除样式继承。 [0].style.left='0px'
    this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left='0px'
* ref 是非响应式的，不建议在模板中进行数据绑定，即使用唯一标识绑定
* v-for 模式使用“就地复用”策略，简单理解就是会复用原有的dom结构，尽量减少dom重排来提高性能 ( 解决方案：还原dom样式 )
* key 为每个节点提供身份标识，数据改变时会重排，最好绑定唯一标识，如果用index标识可能得不到想要的效果(绑定唯一识别key)
* 网页性能管理详解

#Volecity库
~~~
    start(e,good){
        good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex){
        let endX = e.changedTouches[0].clientX
        let left = '0'
        if(good.startX - endX > 100){
            left = '-60px'
        }
        if(endX - good.startX > 100) {
            left = '0px'
        }
        Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{
            left 
        })

    }
~~~








#路由配置
根路由，子路由配置
动态路由匹配，参数传递。
* 挂载过渡
<transition name="fade">
        <router-view></router-view>
</transition>
* 动态路由，参数传递
<router-link to="/address"  target="_self">
    <p>地址管理</p>
</router-link>

<router-link :to="{name:'form',query:{type:'add'}}" >
    <p>新增地址</p>
</router-link>

* 构造配置
~~~
let routes = [{
    path: '/',
    component: member
},{
    path:'/address',
    component: address,
    children:[{
        path:'',
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
~~~


#状态管理
vuex 插件引用,创建Store实例
实例化Store：配置state、mutations、actions
根组件注入，数据state的获取，时间的触发mutations、异步事件。
* state唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例
* mutation，改变状态的唯一方法是提交 。Vuex 中的 mutation 非常类似于事件
* Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。
* Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、
    甚至是嵌套子模块——从上至下进行同样方式的分割


#Vue去掉 You are running Vue in development mode
在main.js里面写

Vue.config.productionTip = false;
productionTip
2.2.0 新增
类型： boolean
默认值： true
用法：
设置为 false 以阻止 vue 在启动时生成生产提示。