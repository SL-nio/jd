import axios from 'axios';
import { reject, resolve } from 'core-js/fn/promise';

const instance =axios.create({
    baseURL:'https://www.fastmock.site/mock/2bb22f8b871338cc372e171c6506f21b/jd'
});

const post = (url,data={})=>{
    return  new Promise((resolve,reject)=>{
    instance.post(url,data,{
        headers:{
            'Content-Type' : 'application/json'
        }
    }).then((response)=>{
        resolve(response)
    },(error)=>{
        reject(error)   
        }
    )
    })
}

const get = (url,params={})=>{
    return  new Promise((resolve,reject)=>{
    instance.get(url,{ params }).then((response)=>{
        resolve(response)
    },(error)=>{
        reject(error)   
        }
    )
    })
}

export {post,get}