import axios from 'axios'

const apiPath = 'https://easy-mock.com/mock/5b14e7fd647ea43344eeccef/'
//let apiPath = 'https://easy-mock.com/mock/5c49c60e0ae62c756dd9b01b'

const util = {
  url: {
    hotList: 'index/hotList',
    banners: 'index/banner',
    topCategory: 'category/topCategory',
    rank: 'category/rank',
    subCategory: 'category/subCategory',
    searchList: 'search/list',
    goodDetail: 'goods/details',
    salesList: 'goods/sales',
    cartList: '/cart/list',
    cartAdd: 'cart/add',
    cartRemove: 'cart/remove',
    cartReduce: 'cart/reduce',
    cartUpdate: 'cart/update', //直接修改数量
    addressList: 'address/list',
    addressAdd: 'address/add',
    addressRemove: 'address/remove',
    addressUpdate: 'address/update',
    addressSetDefault: 'address/setDefault' //设置默认地址
  },
  //https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery
  scrollToTop(scrollDuration) {
    let cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollY === 0) return;
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
}

util.ajax = axios.create({
  baseURL: apiPath,
  method: 'post',
})

util.ajax.interceptors.response.use(res => res.data)

export default util
