<template>
  
    <div class="bottom-nav">
    <ul>
      <li :class="{active:index==curIndex}" v-for="(list,index) in navConfig" :key="index"
      @click="changeNav(list,index)">
          <a  >
          <i :class="list.icon"></i>
          <div>{{list.name}}</div>
          </a>
        </li>
    </ul>
  </div>
  
</template>

<script>
import qs from "qs";
let { index } = qs.parse(location.search.substr(1));

let navConfig = [
  {
    name: "有赞",
    icon: "icon-home",
    href: "index.html"
  },
  {
    name: "分类",
    icon: "icon-category",
    href: "category.html"
  },
  {
    name: "购物车",
    icon: "icon-cart",
    href: "cart.html"
  },
  {
    name: "我",
    icon: "icon-user",
    href: "member.html"
  }
];
export default {
  name: "Foot",
  data() {
    return {
      navConfig,
      curIndex: parseInt(index) || 0
    };
  },
  methods: {
    changeNav(list, index) {
      //this.curIndex = index;
      location.href = `${list.href}?index=${index}`;
      console.log(location.href);
      event.preventDefault();
    }
  }
};
</script>

<style>
.bottom-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
  -o-border-image: url(https://b.yzcdn.cn/v2/image/wap/border-line-2.png) 2
    stretch;
  border-image: url(https://b.yzcdn.cn/v2/image/wap/border-line-2.png) 2 stretch;
  border-top: 2px solid #e5e5e5;
}

</style>
