import axios from 'axios'
import Vue from 'vue'
import router from '../router'

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// axios拦截器
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 统一设置token
    config.headers.Authorization = sessionStorage.getItem('token')
    // console.log('发请求')
    // console.log(config)
    return config;
}, function (error) {
    // 数据错误
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log('响应回来')
    // console.log(response)
    if(response.data.meta.status == 400 && response.data.meta.msg == '无效token'){
        new Vue().$message.error('小子,伪造token是没有用滴')
        // 编程式导航
        router.push('login')
        // 删除token
        sessionStorage.clear('token')
        response.data.data = []
    }else{
        Vue.prototype.$message.success(response.data.meta.msg)
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// 抽取网络请求
const request = {
    login(params){
       return axios.post('login',params)
    },
    // 获取用户列表
    getUsers(params){
        return axios.get('users',{
            params,
            // headers: { Authorization: sessionStorage.getItem('token') }
        })
    },
    // 改变用户状态
    updateStatus(params){
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    // 添加用户
    addUser(params){
        return axios.post('users',params)
    },
    // 删除用户
    deleteUser(id){
        return axios.delete(`users/${id}`,)
    },
    // 根据id查询用户信息
    getUserById(id){
        return axios.get(`users/${id}`)
    },
    // 编辑用户提交
    updateUser(params){
        return axios.put(`users/${params.id}`,{
            email: params.email,
            mobile: params.mobile
        })
    },
    // 获取角色列表
    getRoles(){
        return axios.get(`roles`)
    },
    // 添加角色
    addRoles(params){
        return axios.post('roles',params)
    },
    //通过id查询角色
    getRolesById(id){
        return axios.get(`roles/${id}`)
    },
    // 编辑提交角色
    editRoles(params){
        return axios.put(`roles/${params.id}`,{
            roleName: params.roleName,
            roleDesc: params.roleDesc
        })
    },
    // 删除角色
    deleteRoles(id){
        return axios.delete(`roles/${id}`)
    },
    // 获取所有权限列表
    getRights(type){
        return axios.get(`rights/${type}`)
    },


    // 获取展示的数据
    getReports(){
        return axios.get('reports/type/1')
    },

    // 获取订单数据列表
    getOrderslist(params){
        return axios.get('orders',{
            params
        })
    },

    // 删除角色制定权限
    deleteRight(params){
        return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    },

    // 角色授权
    setRoleRights(params){
        return axios.post(`roles/${params.roleId}/rights`,{
            rids: params.rids
        })
    },

    // 获取左侧菜单栏
    getMenus(){
        return axios.get('menus')
    },

    // 商品列表数据
    getGoods(params){
        return axios.get('goods',{
            params
        })
    }
}

export default {
    install(Vue){
        Vue.prototype.$request = request
    }
}