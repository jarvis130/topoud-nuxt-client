import Vue from 'vue'
import axios from './axios'

const create = ({ len, lib }) => {
    let maxPos = lib.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += lib.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}
const stringLib =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1** **/
const numberLib = '0123456789'
const string = len => {
    return create({ len, lib: stringLib })
}
const number = len => {
    return create({ len, lib: numberLib })
}

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

    if (process.browser) {
        Vue.prototype.$random = { string, number }
    }
}
