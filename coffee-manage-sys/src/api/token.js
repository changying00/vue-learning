import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import API from './index.js';

const ACCESS_TOKEN_KEY = "ACCESS-ADMIN-TOKEN" ;
const REFRESH_TOKEN_KEY = "REFRESH-ADMIN-TOKEN" ;
const REMEMBER_KEY = "remember-me" ;


export default {

    removeCurrentUser() {
        // 删除 Cookie
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REMEMBER_KEY)
        sessionStorage.clear()
        localStorage.clear()
    },
    saveToken(access, refresh, remember=false) {
        // 解析访问令牌
        let {exp, iat, sub, name, role} =  jwtDecode(access)
        // 获取 令牌的过期时间间隔
        let duration = exp - iat - 30 ;

        Cookies.set(ACCESS_TOKEN_KEY, access, {expires: duration / (60 * 60 * 24)})

        if (remember) {
            // 解析 刷新令牌 
            ({exp, iat } = jwtDecode(refresh))
            let refresh_duration = exp - iat - 30;
            // 存储刷新令牌
            Cookies.set(REMEMBER_KEY, refresh, {expires: refresh_duration / (60 * 60 * 24)})
        } else {
            // 存储到 Session 中、浏览器关闭 清空即可
            sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh) ;
        }
        // 返回要存储到 Pinia 中的数据
        return {sub, name, role} ;
    },

    getRefreshToken() {
        let refresh = sessionStorage.getItem(REFRESH_TOKEN_KEY);
        if (refresh == null) {
            // 从 cookie 中获取 
            refresh = Cookies.get(REMEMBER_KEY)
        }
        return refresh ;
    },

    async getAccessToken() {
        // 获取 刷新令牌 
        const refreshToken = this.getRefreshToken();
        // 如果刷新令牌未空
        if (refreshToken == null) {
            Cookies.remove(ACCESS_TOKEN_KEY) // 移除访问令牌
            return null 
        }
        // 尝试获取访问令牌 
        const accessToken = Cookies.get(ACCESS_TOKEN_KEY) 
        if (accessToken != null) return accessToken
        // 如果 访问令牌过期、则 通过刷新令牌换取 新的令牌 
        let {access, refresh} = await API.getAccessToken(refreshToken)
        // 更新 令牌 
        this.saveToken(access, refresh, Cookies.get(REMEMBER_KEY) != null)
        // 返回访问令牌
        return access
    }

}