// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import App from './App'
// import router from './router'

import Vue from 'vue'
import './index.css'
import 'css/common.css'
import $ from 'js/util'
import {
  InfiniteScroll
} from 'mint-ui'



import Carousel from 'components/carousel'
// import BottomNav from 'components/BottomNav'
import mixin from 'js/mixin'


Vue.use(InfiniteScroll)
Vue.config.productionTip = false


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   // router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  el: '#app',
  data: {
    hotList: [],
    loading: false,
    isFinished: false,
    pageNum: 1,
    pageSize: 6,
    banners: []
  },
  components: {
    Carousel,
    // BottomNav
  },
  methods: {
    getHotList() {
      if (this.isFinished) return
      this.loading = true
      $.ajax($.url.hotList, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        const list = data.list;
        this.hotList = this.hotList.concat(list)
        this.pageNum++;
        if (list.length < this.pageSize) this.isFinished = true
        this.loading = false
      })
    },
    getBanners() {
      $.ajax($.url.banners).then((data) => {
        this.banners = data.list
      })
    }
  },
  created() {
    this.getHotList()
    this.getBanners()
  },
  mixins: [mixin]
})
