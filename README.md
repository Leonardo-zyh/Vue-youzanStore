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


# dns-prefetch


# FastClick解决点击击穿
阻止事件冒泡    event.preventDefault();

对于没有doctype声明的页面里可以使用 document.body.scrollTop 来获取 scrollTop高度 ； 
对于有doctype声明的页面则可以使用 document.documentElement.scrollTop； 

带有V1演示的Velocity V2 beta - 它们在滚动方面完全不兼容。在V2中，它现在是滚动的元素的属性（即容器）。


#购物车
* 商品的获取渲染以及增加是否被选中属性
* 获取后台数据加载处理或动态响应式处理
* 商品选中店铺选中全选，影响价格三级联动。
* 编辑状态，其余不可切换。对数量操作，加减更改。删除，单商品删除，选中(多个)删除，商品删除店铺删除。
* 原生事件，滑动删除页面，Volecity。
* 删除多个商品进行过滤处理

* fetch层封装，
* 同一个场景下思维层封装

* 问题呈现，左滑删除样式继承。 [0].style.left='0px'
* 

#路由配置
根路由，子路由配置
动态路由匹配，参数传递。


#状态管理
vuex 插件引用,创建Store实例
* state唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例
* mutation，改变状态的唯一方法是提交 。Vuex 中的 mutation 非常类似于事件
* Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。
* Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、
    甚至是嵌套子模块——从上至下进行同样方式的分割