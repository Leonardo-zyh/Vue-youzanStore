import Vue from 'vue'
import 'css/common.css'
import './category.css'
import $ from 'js/util'
// import BottomNav from 'components/BottomNav'
import mixin from 'js/mixin'

import {
  isPrimitive
} from 'util'

new Vue({
  el: '#app',
  data: {
    topCategory: [],
    categoryIndex: 0,
    rankData: null,
    subCategory: {}
  },
  methods: {
    getTopCategory() {
      $.ajax($.url.topCategory).then((data) => {
        this.topCategory = data.list
      })
    },
    changeCategory(index, item) {
      this.categoryIndex = index
      if (index === 0) {
        this.getRankData()
      } else {
        this.getSubCategory(item.id)
      }
    },
    getRankData() {
      $.ajax($.url.rank).then(data => this.rankData = data.data)
    },
    getSubCategory(id) {
      $.ajax($.url.subCategory, {
        id
      }).then(data => this.subCategory = data.data)
    },
    search(item) {
      location.href = `search.html?keyword=${item.name}&id=${item.id}`
    }
  },
  created() {
    this.getTopCategory()
    this.getRankData()
  },
  mixins: [mixin]
})
