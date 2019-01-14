import '@/modules/css/common.css'
import './index.css'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios
import url from '@/modules/js/api.js'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from '@/components/Foot'
import Swipe from '@/components/Swipe'
import bus from '@/modules/js/bus'



Vue.config.productionTip = false



  new Vue({
  el: '#app',
  data:{
    lists:null,
    pageNum:1,
    loading:false,//加载数据
    allLoaded:false,
    pageSize:6,
    bannerLists:null,
    obj:{
      age:21
    }
  },
  created() {
    this.getLists()
    this.getBanner()
    bus.$on('change',(age)=>{      
      this.obj.age = age
    })
  },
  methods:{
    changeAge(){
      this.obj.age = age
    },
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
    getBanner(){//轮播数据
      this.$http.get(url.banner).then(res=>{
        this.bannerLists = res.data.lists
        
      })
    }
  },
  components: { Foot,Swipe },

})
