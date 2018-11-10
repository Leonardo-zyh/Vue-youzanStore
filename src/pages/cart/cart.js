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
        total:0,
        arr:[],
        editingShop:null,
        editingShopIndex:null,
    },
    computed:{
        allSelected:{
            get(){
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop=>{
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.lists.forEach(shop=>{
                    shop.checked = newVal
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal
                    })
                })
            }
        },
        selectLists(){
            if(this.lists&&this.lists.length){
                let arr = []
                let total = 0
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                this.arr = arr
                return {total,arr}
            }
            return []
        }
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
                    shop.removeChected = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                        good.removeChected = false
                    })
                });
                this.lists = lists
            })
        },
        selectGood(shop,good){
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good=>{
                return good.checked
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good=>{
                good.checked = shop.checked
            })
        },
        selectAll(){
            this.allSelected = !this.allSelected
        },
        edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing?'完成':'编辑'
            this.lists.forEach((item,i)=>{
                if(shopIndex !==i){
                    item.editing = false
                    item.editingMsg = shop.editing ?'':'编辑'
                }
            })
            this.editingShop = shop.editing?shop:null
            this.editingShopIndex =shop.editing?shopIndex :-1
        }
    },
     mixins:[mixin]
})