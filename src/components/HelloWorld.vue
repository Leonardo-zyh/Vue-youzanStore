<template>
  <div class="hello">
    <h1>Hellow World</h1>
    <h2>{{ msg }}</h2>
    <h2>{{$route.params.msg}}</h2>
    <button @click="getData">GET发送请求</button>
    <button @click="getData">POST发送请求</button>
    
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics")
        .then((res)=> {
          //此处的this指向的不是当前vue实例
          this.items = res.data.data;
          console.log(res.data.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: red;
}
</style>
