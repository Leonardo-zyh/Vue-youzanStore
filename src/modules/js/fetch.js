import axios from 'axios'
import url from './api.js'

//购物车接口管理
function fetch(url,data){
    return new Promise((resolve,reject)=>{
        axios.get(url,data).then(res=>{
            let status = res.data.status
            // if(status===200){
            //     resolve(res)
            // }
            // if(status===300){
            //     location.href = 'login.html'
            //     reject(res)
            // }
            // reject(res)
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export default fetch

