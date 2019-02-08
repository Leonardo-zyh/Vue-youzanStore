import BottomNav from 'components/BottomNav'

const mixin = {
  components: {
    BottomNav
  },
  filters: {
    currency(price) {
      if (!price) return '0.00'
      price = String(price)
      if (price.indexOf('.') > -1) {
        let [int, float] = price.split('.')
        return int + '.' + (float + '00').substr(0, 2)
      } else {
        return price += '.00'
      }
    }
  }
}

export default mixin
