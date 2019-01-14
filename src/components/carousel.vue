<template>
  <div class="wrap" :style="scale">
    <mt-swipe :auto="4000" class="container">
      <mt-swipe-item v-for="(banner,index) in banners" :key="index">
        <a :href="banner.clickUrl">
          <img :src="banner.image" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
import { Swipe, SwipeItem } from "mint-ui";

export default {
  props: {
    banners: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: 100
    },
    height: {
      type: [String, Number],
      default: 100
    }
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  computed: {
    scale() {
      return { "padding-top": this.height / this.width * 100 + "%" };
    }
  }
};
</script>

<style scoped>
.wrap {
  /* padding-top: 48%; */
  position: relative;
}

.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

a {
  display: block;
}

img {
  vertical-align: top;
  width: 100%;
}
</style>
