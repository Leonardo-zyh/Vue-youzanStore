import "css/common.css";
import "./search.css";
import Vue from "vue";
import url from "url";
import $ from "js/util";
import mixin from "js/mixin";

const {
  keyword,
  id
} = url.parse(location.href, true).query;

new Vue({
  el: ".container",
  data: {
    searchList: [],
    isLoading: false,
    isFinished: false,
    pageNum: 0,
    pageSize: 6,
    keyword,
    isShow: false
  },
  methods: {
    getSearchList() {
      if (this.isLoading || this.isFinished) return;
      this.isLoading = true;
      $.ajax(`${$.url.searchList}?keyword=${keyword}&id=${id}`).then(data => {
        const list = data.list;
        this.searchList = this.searchList.concat(list);
        this.pageNum++;
        if (list.length < this.pageSize) this.isFinished = true;
        this.isLoading = false;
      });
    },
    loadMore() {
      if (
        window.pageYOffset + window.innerHeight + 200 >=
        document.body.scrollHeight
      ) {
        this.getSearchList();
      }
    },
    showToTop() {
      this.isShow = window.pageYOffset > 100 ? true : false;
    },
    toTop() {
      $.scrollToTop(400);
      this.isShow = false;
    },
    url(item){
      if(!item.isOut){
        window.location.href='goods.html?id='+item.id
      }
      
    }
  },
  created() {
    this.getSearchList();
  },
  computed:{
    url(){
        'goods.html?id='+this.item.id
      
    },
  },
  mixins: [mixin]
});
