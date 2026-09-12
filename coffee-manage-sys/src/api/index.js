import axios from 'axios';
import { layer } from 'vue3-layer';
import Token from './token.js'
import router from '../router/index.js'

const service = axios.create({
    baseURL: 'http://43.108.11.236:8082',
    timeout: 5000,
});

service.interceptors.request.use(async (config)=> {
    const controller = new AbortController();
    config.headers["signal"] = controller.signal ;
    if (config.loading) {
        const loadingIndex = layer.load(2) ;
        config.loadingIndex = loadingIndex ;
    }
    // 判断是否需要认证 
    if (config.permission) {
         // 获取 令牌 
        const token = await Token.getAccessToken() 
        // 如果 没有获取、则 进行登录
        if (token == null) {
            router.push({name: "LoginView"});
            // 取消请求
            controller.abort();
        }else {
            // 否则携带令牌 
            config.headers["Authorization"] = "Bearer " + token
        }
    }
    return config
}, error=> {
    return Promise.reject(error);
})

service.interceptors.response.use((response)=>{
    const result = response.data; 
    if (response.config.loading) {
        layer.close(response.config.loadingIndex);
    } 
    return result
}, error=> {
    if (error.response && error.response.config.loadingIndex) {
        layer.close(error.response.config.loadingIndex);
    } 
    if (error.response) {
        layer.msg('服务器异常')
    }else {
        layer.msg('网络错误')
    }
    return Promise.reject(error)
})

export default {
    getAccessToken(refresh) {
        return service.put("/api/token", {refresh}, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        })
    },
    login({tel, password, role}) {
        // 登录接口
        return service.post("/api/token", {tel, password, role}, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            loading: true,
        })
    },
    registerUser({tel, password, name, className, role}) {
        return service.post("/register",{tel, password, name, className, role});
    }
};