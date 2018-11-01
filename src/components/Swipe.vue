
<template>
  
    <div class="swiper-container">
            <div class="swiper-wrapper" >
                <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
            </div>
 
</template>

<script>
// swiper是对dom节点操作
import Swiper from '_swiper@4.4.1@swiper/dist/js/swiper.js'
import '_swiper@4.4.1@swiper/dist/css/swiper.css'
export default {
  name: "swipe",
  // props:['lists']
  props:{
    lists:{
      // type:Array,
      required:true
    },
    name:{}
  },
  created(){
    console.log(this.lists);
  },
  mounted(){
    new Swiper('.swiper-container',{
      loop:true,
      pagination:'.swiper-pagination'
    })
  },
  // watch:{
  //   lists(val,oldVal){

  //   }
  // }
}
</script>

<style>
  
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 1;
}


</style>
