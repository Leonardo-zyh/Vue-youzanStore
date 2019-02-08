import "./cart_base.css";
import "./cart_trade.css";
import "./cart.css";
import $ from "js/util";
import mixin from "js/mixin";
import Vue from "vue";
import anime from "animejs";

new Vue({
  el: "#app",
  data: {
    cartList: null,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    popupMsg: "",
    removeType: ""
  },
  methods: {
    getCartList() {
      $.ajax($.url.cartList).then(data => {
        let list = data.cartList;
        list.forEach(shop => {
          shop.checked = true;
          shop.removeChecked = false;
          shop.editing = false;
          shop.editingMsg = "编辑";
          shop.goodList.forEach(good => {
            good.checked = true;
            good.removeChecked = false;
          });
        });
        this.cartList = list;
      });
    },
    selectGood(shop, good) {
      const attr = this.editingShop ? "removeChecked" : "checked";
      good[attr] = !good[attr];
      shop[attr] = shop.goodList.every(good => good[attr]);
    },
    selectShop(shop) {
      const attr = this.editingShop ? "removeChecked" : "checked";
      shop[attr] = !shop[attr];
      shop.goodList.forEach(good => (good[attr] = shop[attr]));
    },
    selectAll() {
      const attr = this.editingShop ? "allRemoveSelected" : "allSelected";
      this[attr] = !this[attr];
    },
    editGood(shop, shopIndex) {
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key)) {
          const element = this.$refs[key];
          if (element.length) {
            element[0].style.transform = "translateX(0)";
          }
        }
      }
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? "完成" : "编辑";
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = -shop.editing ? shopIndex : -1;
      this.cartList.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false;
          item.editingMsg = shop.editing ? "" : "编辑";
        }
      });
    },
    cartTrade(good, quantity) {
      var quantity = Math.floor(Number(quantity))
      if (!quantity) return;
      if (quantity <= -1 && good.quantity === 1) return;
      $.ajax($.url.cartAdd, {
        id: good.id,
        quantity
      }).then(data => {
        if (data.status === 200) {
          if (quantity === 1 || quantity === -1) {
            good.quantity += quantity;
          } else {
            if (quantity >= good.stock) {
              good.quantity = good.stock;
              return
            }
            good.quantity = quantity;
          }
        }
      });
    },
    blur(good) {
      !good.quantity && (good.quantity = 1)
    },
    removeGood(shop, shopIndex, good, goodIndex) {
      this.removeType = "single";
      this.popupMsg = "确定删除该商品?";
      this.removePopup = true;
      this.removeData = {
        shop,
        shopIndex,
        good,
        goodIndex
      };
    },
    removeGoods() {
      this.removeType = "multi";
      this.popupMsg = `确定删除所选的${this.removeList.length}个商品`;
      this.removePopup = true;
    },
    removeConfirm() {
      if (this.removeType === "single") {
        let {
          shop,
          shopIndex,
          good,
          goodIndex
        } = this.removeData;
        $.ajax($.url.cartRemove, {
          id: good.id
        }).then(data => {
          if (data.status === 200) {
            this.removePopup = false;
            shop.goodList.splice(goodIndex, 1);
            if (shop.goodList.length === 0) {
              this.cartList.splice(shopIndex, 1);
              this.removeShop();
            }
          }
        });
      } else {
        let GoodIds = this.removeList.map(good => good.id);
        $.ajax($.url.cartRemove, {
          GoodIds
        }).then(data => {
          if (data.status === 200) {
            // 改变goodList 和 重新给goodList赋值,2选1
            this.removePopup = false;
            const list = this.editingShop.goodList;
            const removeList = this.removeList;
            removeList.forEach(good => {
              let index = list.indexOf(good)
              if (index > -1) {
                list.splice(index, 1);
              }
            })
            if (list.length === 0) {
              this.cartList.splice(this.editingShopIndex, 1);
              this.removeShop();
            }
          }
        });
      }
    },
    removeShop() {
      this.editingShop = null;
      this.editingShopIndex = -1;
      this.cartList.forEach(shop => {
        shop.editing = false;
        shop.editingMsg = "编辑";
      });
    },
    cancelPopup() {
      this.removePopup = false;
    },
    move(ev, good, shopIndex, goodIndex) {
      let touchMoveX = ev.changedTouches[0].clientX - good.touchStartX
      good.touchMoveX = touchMoveX
      if (touchMoveX > 0 || this.editingShop) {
        return;
      }
      this.$refs[`good-${shopIndex}-${goodIndex}`][0].style.transform = `translateX(${touchMoveX > -60 ? touchMoveX : -60 + 0.4 * (touchMoveX + 60)}px)`
    },
    touch(ev, good) {
      good.touchStartX = ev.changedTouches[0].clientX
    },
    end(ev, good, shopIndex, goodIndex) {
      if (!good.touchMoveX || this.editingShop) return;
      anime({
        targets: this.$refs[`good-${shopIndex}-${goodIndex}`],
        translateX: (good.touchMoveX = good.touchMoveX > -30 ? 0 : -60),
        easing: "easeOutQuad",
        duration: 300
      });
    }
  },
  computed: {
    allSelected: {
      get() {
        if (this.cartList && this.cartList.length) {
          return this.cartList.every(shop => shop.checked);
        }
        return false;
      },
      set(newVal) {
        if (this.cartList) {
          this.cartList.forEach(shop => {
            shop.checked = newVal;
            shop.goodList.forEach(good => {
              good.checked = newVal;
            });
          });
        }
      }
    },
    total() {
      let total = 0;
      if (this.cartList) {
        this.cartList.forEach(shop => {
          shop.goodList.forEach(good => {
            if (good.checked) {
              total += good.price * good.quantity;
            }
          });
        });
      }
      return total;
    },
    selectList() {
      let selectList = [];
      if (this.cartList) {
        this.cartList.forEach(shop => {
          shop.goodList.forEach(good => {
            good.checked && selectList.push(good);
          });
        });
      }
      return selectList;
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked;
        }
      },
      set(newVal) {
        this.editingShop.removeChecked = newVal;
        this.editingShop.goodList.forEach(
          good => (good.removeChecked = newVal)
        );
      }
    },
    removeList() {
      let removeList = [];
      if (this.editingShop) {
        this.editingShop.goodList.forEach(good => {
          if (good.removeChecked) {
            removeList.push(good);
          }
        });
      }
      return removeList;
    }
  },
  created() {
    this.getCartList();
  },
  mixins: [mixin],
});
