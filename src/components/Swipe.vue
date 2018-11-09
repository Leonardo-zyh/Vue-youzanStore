
<template>
  
    <div class="swiper-container">
            <div class="swiper-wrapper" >
                <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
 
</template>

<script>
// swiper是对dom节点操作
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: "swipe",
  // props:['lists']
  props:{
    lists:{
      // type:Array,
      required:true
    },
    lists:{},
    name:{}
  },
  created(){
    console.log(this.lists);
  },
  mounted(){
    new Swiper('.swiper-container',{
      loop:true,
      pagination: '.swiper-pagination',
      autoplay: 2000
    })
  },
  methods: {
    init() {
      new Swiper('.swiper-container',{
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 2000
     })
    }
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
.swiper-slide img {
  width: 100%;
  height: 100%;
}


</style>
