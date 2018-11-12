import fetch from './fetch.js'
import url from './api.js'

class Cart{
    static add(id){
        return fetch(url.cartAdd,{
            id,
            number: 1
        })
    }
    static reduce(id){
        return fetch(url.cartReduce,{
            id,
            number: 1
        })
    }
    static cartRemove(id){
        return fetch(url.cartRemove,{id})
    }
    static cartMremove(id){
        return fetch(url.cartMremove,{id})
    }
    static updata(id,number){
        return fetch(url.updata,{
            id,
            number
        })
    }
}


export default Cart