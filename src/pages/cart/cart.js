import './cart_base.css'
import './cart_trade.css'
import './cart.css'

// import Mock from 'mock.js'
// let Random = Mock.Random

// let data = Mock.mock({
//     'cartList|3' :[{
        
//     }]
// })

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'
import mixin from '@/modules/js/mixin.js'

new Vue({
    el:'.container',
    data:{
        lists:null,
    },
    computed:{

    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                    })
                });
                this.lists = lists
            })
        },
        selectGood(good){
            good.checked = !good.checked
        }
    },
     mixins:[mixin]
})