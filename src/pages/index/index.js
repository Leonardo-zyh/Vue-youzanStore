import '@/modules/css/common.css'
import './index.css'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
Vue.prototype.$http = axios
import url from '@/modules/js/api.js'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from '@/components/Foot'
import Swipe from '@/components/Swipe'




Vue.config.productionTip = false



  new Vue({
  el: '#app',
  data:{
    lists:null,
    pageNum:1,
    loading:false,
    allLoaded:false,
    pageSize:6,
    bannerLists:null,
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  methods:{
    getLists(){
    if(this.allLoaded) return
    this.loading = true
    this.$http.get(url.hotLists,{
      pageNum:this.pageNum,
      pageSize:this.pageSize,
    }).then(res=>{
      console.log(res);
      let curLists = res.data.lists
       
      if(curLists.length < this.pageSize ){
        this.allLoaded = true
      }
      if(this.lists){
        this.lists = this.lists.concat(curLists)
      }else{
        this.lists = curLists
      }
      this.loading = false
      this.pageNum +=1
    })
    },
    getBanner(){
      this.$http.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
        console.log(res.data.lists);
        
      })
    }
  },
  router,
  components: { Foot,Swipe },
  // template: '<App/>'
})
