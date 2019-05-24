import Vue from 'vue'
import toast from '~/components/weui/toast'
const ToastConstructor = Vue.extend(toast)
let instance
const Toast = function(options) {
    if (Vue.prototype.$isServer) return
    if (typeof options === 'number') {
        options = { duration: options }
    } else if (typeof options === 'string') {
        options = { message: options }
    } else if (!options) {
        options = {}
    }
    if (!instance) {
        instance = new ToastConstructor()
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
    }
    instance.vm.start(options)
}
;['success', 'error'].forEach(type => {
    Toast[type] = options => {
        if (typeof options === 'number') {
            options = { duration: options }
        } else if (typeof options === 'string') {
            options = { message: options }
        } else if (!options) {
            options = {}
        }
        options[type] = true
        return Toast(options)
    }
})
Toast.close = function() {
    return instance && instance.vm.close()
}
Vue.prototype.$toast = Toast
