//导入vue
import Vue from 'vue'

//导入vue-router
import VueRouter from 'vue-router'

//use一下
Vue.use(VueRouter)

//写组件
import login from './components/login.vue'
import index from './components/index.vue'
import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'

//写规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: index,
        children: [
            {
                path: 'users',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            }
        ]
    }
]

//实例化router
const router = new VueRouter({
    routes
})

//暴露出去
export default router