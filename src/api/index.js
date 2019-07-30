 import Vue from 'vue' //引入vue
 import axios from 'axios' //引入axios
import { resolve } from 'path';

 //构造函数 具备vue的所有属性
 const vue = new Vue()

 //axios配置 封装axios
 axios.defaults.timeout = 10000 //请求接口时间
 axios.defaults.baseURL = 'http://localhost:3000'

 // 返回状态判断
 axios.interceptors.response.use((res) => {
    if(res.data.code !== 200){
        // 之前已经定义一个方法，并挂载到vue原型链上了 api:toast hideLoading
        vue.$toast('网络异常')
        vue.$hideLoading()
        return Promise.reject(res)
    }
    return res
 }, (error) =>{
    vue.$toast('网络异常')
    vue.$hideLoading()
    return Promise.reject(error)
 })

 // 接口传参 调用fetchGet写入参数 可以获取axios.get中的数据
 export function fetchGet(url,param){
     return new Promise((resolve,reject) => {
         axios.get(url, {
             params: param
         })
         .then(response => {
             resolve(response.data)
         },err =>{
             reject(err)
         })
         .catch((error) => {
             reject(error)
         })
     })
 }

 // 用户登录
 export default {
     Login(params){
         return fetchGet('/login',params)
     },
     // banners 滑动的图片
     BannerList() {
        return fetchGet('/banner')
     },
     // 歌单
     DiscLists(params){
        return fetchGet ('/top/playlist', params)
     },
     // 歌单详情              
     SongList(params){
        return fetchGet('/playlist/detail', params)
     },
    //  歌曲搜索方法
    MusicSearch (params){
        return fetchGet('/search', params)
    },
    // 热搜
    HotSearchKey(){
        return fetchGet('/search/hot')
    },
    // 获取歌词
    MusicLyric(id){
        return fetchGet('/lyric', {
            id
        })
    },
    MusicUrl(id){
        return fetchGet('/song/url', {id})
    }
 }
 