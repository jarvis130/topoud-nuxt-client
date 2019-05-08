import Vue from 'vue'
import axios from './axios'
export default ({ app, req }) => {
    let terminal = {}
    // console.log(app)
    if (process.client) {
        let ua = window.navigator.userAgent
        terminal.isMobile =
            window.innerWidth <= 768 || /iphone|android|ipad/i.test(ua)
        terminal.isWechat = /MicroMessenger/i.test(ua)
        terminal.isWechatMini = /miniProgram/i.test(ua)
        terminal.isMacOs = /mac os/i.test(ua)
    } else {
        let ua = req.headers['user-agent']
        terminal.isMobile = /iphone|android|ipad/i.test(ua)
        terminal.isWechat = /MicroMessenger/i.test(ua)
        terminal.isWechatMini = /miniProgram/i.test(ua)
        terminal.isMacOs = /mac os/i.test(ua)
    }
    app.$terminal = terminal
    Vue.prototype.$ELEMENT = terminal.isMobile
        ? { size: 'large' }
        : { size: 'medium' }
    Vue.prototype.$terminal = terminal
    Vue.prototype.$axios = axios
    app.$axios = axios
}
