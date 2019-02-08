<template>
    <div class="container " style="min-height: 597px;" v-cloak>
    <div class="block-list address-list section section-first js-no-webview-block" v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item "
        v-for="list in lists" :key="list.id"
       @click="toEdit(list)" 
       :class="{'address-item-default':list.isDefault}">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}} </p>
        <!-- <a href="" class="address-edit"></a> -->
      </a>
    </div>
    <div v-if="lists&&!lists.length">
      没有地址，请添加      
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
      :to="{name:'form',query:{type:'add'}}" >
            新增地址
      </router-link>
    </div>
  </div>
</template>
<script>
// import Address from './js/Address.js'
export default {
   computed:{
    lists(){
      return this.$store.state.lists
    }
  },
  created(){
    if(!this.lists){
      this.$store.dispatch('getLists')
    }
    
  },
  methods: {
    toEdit(list) {
      //编程式导航
      this.$router.push({ name: "form",query:{
        type:'edit',
        instance:list,
      } });
    }
  }

};
</script>


<style scoped>
[v-cloak] {
  display: none;
}
</style>

