// import localIp from '../../../.localip'
// const apiHost = localIp
import Axios from 'axios'
import entities from 'entities'
Axios.defaults.withCredentials = true
let baseURL, localURL, icardURL, shopURL
switch (process.env.APP_ENV) {
    case 'production':
        baseURL = `https://icard.yjmp.net/api`
        localURL = `https://home.yjmp.net`
        icardURL = `https://icard.yjmp.net`
        shopURL = `https://shop.yjmp.net`
        // baseURL = `https://mall.topoud.com/api`
        break
    case 'test':
        baseURL = `https://test-icard.yjmp.net/api`
        localURL = `https://test-home.yjmp.net`
        icardURL = `https://test-icard.yjmp.net`
        shopURL = `https://test-shop.yjmp.net`
        break
    default:
        baseURL = `https://test-icard.yjmp.net/api`
        localURL = `https://test-home.yjmp.net`
        icardURL = `https://test-icard.yjmp.net`
        shopURL = `https://test-shop.yjmp.net`
    // baseURL = `http://192.168.0.118:8081/api`
}
const axios = Axios.create({
    baseURL
})
axios.baseURL = baseURL
axios.localURL = localURL
axios.icardURL = icardURL
axios.shopURL = shopURL
axios.interceptors.request.use(function(request) {
    if (process.browser) {
        request.headers.Authorization = `Bearer ${axios.$topoudToken}`
        // console.log(request)
        // axios.lastRequestHeader = request.headers
    }
    return request
})
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response
    },
    function(error) {
        let response = error.response
        if (response) {
            if (/json/.test(response.headers['content-type'])) {
                error.message = response.data.message
            } else {
                let r = response.data.match(/Error:\s*(.*?)<br>/)
                error.message = r ? entities.decodeHTML(r[1]) : response.message
            }
            error.message = error.message || response.statusText
        }
        // Do something with response error
        return Promise.reject(error)
    }
)
export default axios
