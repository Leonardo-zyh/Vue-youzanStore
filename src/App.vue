<template>
  <div id="app">
    
    <img src="./assets/logo.png">
    <router-view></router-view>
    <list/>

  </div>
</template>

<script>
import list from './components/list'//引入
export default {
  name: "App",
  components:{  //使用组件
    list
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 18px
}
</style>
