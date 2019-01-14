import Foot from '@/components/Foot.vue'
//filters属性和底部导航栏组件的注入进行打包， mixins:[mixin]
let mixin = {
    filters :{
        currency(price){
            let priceStr = ''+ price
            if(priceStr.indexOf('.') >-1){
                let arr = priceStr.split('.')
                return arr[0]+ '.' + (arr[1] + '0').substr(0,2)
            }else{
                return priceStr + '.00'
            }
        }
    },
    components:{
        Foot
    },
}

export default mixin