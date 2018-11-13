import address from '@/modules/js/address.json'
import Address from '@/modules/js/addressService.js'

export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            type:'',
            instance:'',
            addressData: address,
            cityList:null,
            districtList:null,
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance                
    },
    methods:{
        add(){
            // 需要做非空合法性效验
            let {name,tel,provinceValue,cityValue,districtValue,address} = this
            let data = {name,tel,provinceValue,cityValue,districtValue,address}
            if(this.type === 'add'){
                Address.add(data).then(res=>{
                    this.$router.go(-1)
                })
            }
        }
    },
    watch:{
        provinceValue(val){
            if(val === -1) return
            let list = this.addressData.list
            let index = list.findIndex(item=>{
                return item.value === val
            })
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1s
        },
        cityValue(val){
            if(val=== -1) return
            let list = this.cityList
            let index = list.findIndex(item=>{
                return item.value === val
            })
            this.districtList = list[index].children
            this.districtValue = -1
        }
    }
}