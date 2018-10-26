// import 'css/common.css'
// import './index.css'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import url from './js/api.js'

Vue.config.productionTip = false



  new Vue({
  el: '#app',
  data:{
    lists:null
  },
  created() {
    axios.post(url.hotLists,{
      pageNum:1,
      pageSize:6,
    }).then(res=>{
      console.log(res);
      this.list = res.data.lists
    })
  },
  router,
  components: { App },
  template: '<App/>'
})
