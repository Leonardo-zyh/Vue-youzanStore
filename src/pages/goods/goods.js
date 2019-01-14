import 'css/common.css'
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import Vue from 'vue';
import $ from 'js/util'
import mixin from 'js/mixin'
import Carousel from 'components/carousel'
import url from "url";

let {
  id
} = url.parse(location.href, true).query

const tabConfig = ['商品详情', '本店成交']

new Vue({
  el: '#app',
  data: {
    id,
    banners: [],
    detail: null,
    tabConfig,
    tabIndex: 0,
    salesList: null,
    isLoading: false,
    isFinished: false,
    pageNum: 0,
    pageSize: 5,
    skuType: null,
    showModal: false,
    skuNum: 1,
    showAddMsg: false,
    isAddedCart: false
  },
  components: {
    Carousel
  },
  methods: {
    getDetail() {
      $.ajax($.url.goodDetail, {
        id
      }).then(data => {
        let detail = data.data
        this.detail = detail
        this.banners = detail.imgs.map(img => {
          return {
            clickUrl: '',
            image: img
          }
        })
      })
    },
    //焦点状态切换
    changeTab(index) {
      this.tabIndex = index
      if (index === 1 && !this.salesList) {

        this.getSalesList()
      }
    },
    //获取交易列表
    getSalesList() {
      if (this.isLoading || this.isFinished) return
      this.isLoading = true
      $.ajax($.url.salesList, {
        id,
        pageNum: this.pageNum
      }).then((data) => {
        const list = data.list.sort((a, b) => a.time < b.time)
        if (!this.salesList) {
          this.salesList = list
        } else {
          this.salesList = this.salesList.concat(list)
        }
        this.pageNum++;
        if (list.length < this.pageSize) {
          this.isFinished = true
        }
        this.isLoading = false
      })
    },

    chooseSku(type) {//显示购买菜单
      this.skuType = type
      this.showModal = true
    },
    changeSku(num) {//增减数量
      if (num < 0 && this.skuNum === 1) return
      this.skuNum += num
    },

    addCart() {//加入购物车
      $.ajax($.url.cartAdd, {
        id,
        skuNum: this.skuNum
      }).then((data) => {
        if (data.status === 200) {
          this.showModal = false
          this.showAddMsg = true //添加成功的信息
          this.isAddedCart = true //显示购物车图标
          setTimeout(() => this.showAddMsg = false, 1200)
        }
      })
    }
  },
  computed: {
    post() {
      if (this.detail) {
        return this.detail.postage === 0 ? '免运费' : this.detail.postage
      }
    }
  },
  mixins: [mixin],
  created() {
    this.getDetail()
  }
})
