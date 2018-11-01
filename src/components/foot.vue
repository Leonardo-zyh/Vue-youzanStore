<template>
  
    <div class="bottom-nav">
    <ul>
      <li class="active">
          <a href="index.html">
          <i class="icon-home"></i>
          <div>有赞</div>
          </a>
        </li>
      <li>
          <a href="https://maijia.youzan.com/mars/category">
          <i class="icon-category"></i>
          <div>分类</div>
          </a>
        </li>
      <li>
          <a href="https://h5.youzan.com/v2/trade/cart?f_platform=yzapp&amp;source=yzapp">
          <i class="icon-cart"></i><div>购物车</div></a>
        </li>
      <li>
          <a href="https://h5.youzan.com/v2/buyer/member">
          <i class="icon-user"></i>
          <div>我</div>
          </a>
        </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: "Foot"
};
</script>

<style>
.bottom-nav {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  background-color: #fff;
  z-index: 8;
  -o-border-image: url(https://b.yzcdn.cn/v2/image/wap/border-line-2.png) 2
    stretch;
  border-image: url(https://b.yzcdn.cn/v2/image/wap/border-line-2.png) 2 stretch;
  border-top: 2px solid #e5e5e5;
}
</style>
