import '@/modules/css/common.css'
import './index.css'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import axios from 'axios'
import url from '@/modules/js/api.js'
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

Vue.config.productionTip = false



  new Vue({
  el: '#app',
  data:{
    lists:null,
    pageNum:1,
    loading:false,
    allLoaded:false,
    pageSize:6
  },
  created() {
    this.getLists()
  },
  methods:{
    getLists(){
      this.loading = true
    axios.post(url.hotLists,{
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
    }
  },
  router,
  // components: { App },
  // template: '<App/>'
})
