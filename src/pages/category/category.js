import '@/modules/css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
// import Foot from '@/components/Foot.vue'
import url from '@/modules/js/api.js'
import mixin from '@/modules/js/mixin.js'
Vue.config.productionTip = false;

new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        subData:null,
        rankData:null,
        
    },
    created(){
        this.getTopList()
        this.getSublist(0,0)
    },
    methods:{
        getTopList(){
            axios.get(url.topList).then(res=>{
                this.topLists = res.data.lists
                // console.log(res);                
            })
        },
        getSublist(id,index){
            this.topIndex = index
            if(index===0){
                this.getRank()
            }else{
                axios.get(url.subList,{id}).then(res=>{
                    this.subData = res.data.data
                })
            }
        },
        getRank(){
            axios.get(url.rank).then(res=>{                
                this.rankData = res.data.data
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    
    },
    mixins:[mixin]
    
})