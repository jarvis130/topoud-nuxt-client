import Vue from 'vue'
let loginPath = '/login'

Vue.prototype.$goLogin = function() {
    let fromurl = this.$route.fullPath
    // 单页内部跳转
    this.$router.push({
        path: loginPath,
        query: {
            fromurl
        }
    })
}
Vue.prototype.$userAsync = function({ token, userId }, callback) {
    return this.$store.dispatch('userAsync', { token, userId })
}
Vue.prototype.$userCheck = function(callback) {
    if (!this.$axios.$topoudToken) {
        if (this.$route.query.topoudToken) {
            this.$axios.$topoudToken = window.localStorage.topoudToken = this.$route.query.topoudToken
        } else if (window.localStorage.topoudToken) {
            this.$axios.$topoudToken = window.localStorage.topoudToken
        }
    }
    return this.$store
        .dispatch('userInfoGet')
        .then(_ => {
            let { info, message, unionkey } = _ || {}
            // 强制停止自动跳转登陆
            if (callback && callback(info) === 'stop') {
                return { message, unionkey }
            }
            // 未登录的情况
            if (!info) {
                // 想登陆页跳转
                if (
                    this.$route.path !== loginPath &&
                    location.origin + this.$route.path !== loginPath
                ) {
                    let fromurl = this.$route.fullPath
                    // 多页外部跳转
                    if (/^(?:http(?:s)?:)?\/\//.test(loginPath)) {
                        location.href = `${loginPath}?formurl=${location.origin +
                            fromurl}`
                    } else {
                        // 单页内部跳转
                        this.$router.replace({
                            path: loginPath,
                            query: {
                                fromurl
                            }
                        })
                    }
                }
                return { message, unionkey }
            }
            // 已登录的情况
            if (
                this.$route.path === loginPath ||
                location.origin + this.$route.path === loginPath
            ) {
                let fromurl = this.$route.query.fromurl || '/'
                this.$router.replace({
                    path: fromurl
                })
            }
            return { success: true, info }
        })
        .then(({ success, message, unionkey, info }) => {
            if (message !== 'online on other device') {
            } else if (window.localStorage.onlineOnOtherDevice) {
            } else {
                window.localStorage.onlineOnOtherDevice = true
                Vue.prototype.$confirm(
                    '您的账号已在其他设备登陆，\n建议重新登陆并修改密码'
                )
            }
            return { success, message, unionkey, info }
            // alert('您的账号已在其他设备登陆，建议重新登陆并修改密码')
        })
}
