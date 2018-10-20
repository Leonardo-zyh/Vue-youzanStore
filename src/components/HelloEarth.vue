<template>
      <div class="hello">
    <h1>Hellow Earth</h1>
    <h2>{{ msg }}</h2>
     <h2>{{$route.params.msg}}</h2>
    
  </div>
</template>
<script>
export default {
    name:'HelloEarth',
    data(){
        return {
      msg: 'Welcome to Your Vue.js App '
    }
    }
}
</script>
<style scoped>
  h1{color: blue;}
</style>
