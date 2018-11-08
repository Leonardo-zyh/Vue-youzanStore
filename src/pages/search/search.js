import '@/modules/css/common.css'
import './search.css'


import Vue from 'vue'
import axios from 'axios'
// Vue.prototype.$http = axios
import url from '@/modules/js/api.js'
import qs from 'qs'
import mixin from '@/modules/js/mixin.js'
import Velocity from '_velocity-animate@1.5.2@velocity-animate/velocity.js'

let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        isShow:false
    },
    created(){
        this.getSearchList()
       
    },
    methods:{
        getSearchList(){
            axios.get(url.searchList,{keyword,id}).then(res=>{
                this.searchList = res.data.lists
                console.log(res);
                
            })
        },
        move(){
            if(document.documentElement.scrollTop > 100){
                this.isShow = true
            }else{
                this.isShow = false
            }
            // console.log(document.documentElement.scrollTop);
        },
        toTop(){
            Velocity(document.documentElement,'scroll',{duration:500})
        }

    },
    mixins:[mixin]
    // filters:{
    //     number(price){
    //         let priceStr = ''+ price
    //         if(priceStr.indexOf('.') >-1){
    //             let arr = priceStr.split('.')
    //             return arr[0]+ '.' + (arr[1] + '0').substr(0,2)
    //         }else{
    //             return priceStr + '.00'
    //         }
    //     }
    // }
})