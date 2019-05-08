import axios from 'axios'
import Vue from 'vue'


//设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

//axios拦截器
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //统一设置token
    config.headers.Authorization = sessionStorage.getItem('token')
    // console.log('发请求')
    // console.log(config)
    return config;
}, function (error) {
    //数据错误
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log('响应回来')
    // console.log(response)
    Vue.prototype.$message(response.data.meta.msg)
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//抽取网络请求
const request = {
    login(params){
       return axios.post('login',params)
    },
    //获取用户列表
    getUsers(params){
        return axios.get('users',{
            params,
            // headers: { Authorization: sessionStorage.getItem('token') }
        })
    },
    //改变用户状态
    updateStatus(params){
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    //添加用户
    addUser(params){
        return axios.post('users',params)
    },
    //删除用户
    deleteUser(id){
        return axios.delete(`users/${id}`,)
    }
    //编辑用户

}

export default {
    install(Vue){
        Vue.prototype.$request = request
    }
}