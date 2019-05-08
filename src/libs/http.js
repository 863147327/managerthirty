import axios from 'axios'

//抽取网络请求
const request = {
    axios(){
        axios
    },
    sayHi(){
        console.log('你好吗')
    }
}

export default {
    install(Vue){
        Vue.prototype.$request = request
    }
}