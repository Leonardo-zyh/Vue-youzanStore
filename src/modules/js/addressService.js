import fetch from './fetch.js'
import url from './api.js'

class Address{
    static list(){
        return fetch(url.addressLists)
    }
    static add(data){
        return fetch(url.addressAdd,data)
    }
    static remove(id){
        return fetch(url.addressRemove,id)
    }
    static update(data){
        return fetch(url.addressUpdate,data)
    }
    static setDefault(id){
        return fetch(url.addressSetDefault,id)
    }
}

export default Address