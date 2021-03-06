import Vue from 'vue'
import App from './App'

//饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入网络请求
import request from './libs/http'
Vue.use(request)

//导入路由
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    //挂载到vue实例上
    router
}).$mount('#app')
