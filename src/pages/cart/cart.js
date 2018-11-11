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
        editingShopIndex:-1,
        removePopup:false,
        removeData:null,
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
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good=>[
                        good.removeChecked = newVal
                    ])
                }
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
        },
        removeLists(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                this.removeLists = arr
                return arr
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
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                        good.removeChecked = false
                    })
                });
                this.lists = lists
            })
        },
        selectGood(shop,good){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good=>{
                return good[attr]
            })
        },
        selectShop(shop){
            let attr = this.editingShop?'removeChecked':'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good=>{
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop?'allRemoveSelected':'allSelected'
            this[attr] = !this[attr]
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
        },
        reduce(good){
            if(good.number===1) return
                axios.get(url.cartReduce,{
                    id:good.id,
                    number:1,
                }).then(res=>{
                    good.number-=1
                })            
            
        },
        add(good){
            axios.get(url.cartAdd,{
                id:good.id,
                number:1,
            }).then(res=>{
                good.number+=1
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
        },
        removeConfirm(){
            let {shop,shopIndex,good,goodIndex} = this.removeData
            axios.get(url.cartRemove,{
                id:good.id
            }).then(res=>{
                shop.goodsList.splice(goodIndex,1)
                if(!shop.goodsList.length){
                    this.lists.splice(shopIndex,1)
                    this.removeShop()
                }
                this.removePopup = false
            })
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop=>{
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        }
    },
     mixins:[mixin]
})