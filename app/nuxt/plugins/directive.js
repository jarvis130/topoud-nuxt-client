import Vue from 'vue'
import StickySidebar from 'sticky-sidebar/dist/sticky-sidebar.min.js'
import ResizeSensor from 'resize-sensor'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import 'swiper/dist/css/swiper.css'
import Sortable from 'sortablejs'
import ScrollTo from 'vue-scrollto'
/*
 * @Author: 刘盾Bach (bach109109@qq.com, liudun@zbj.com)
 * @Date: 2018-05-15 16:56:06
 * @Last Modified by: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Last Modified time: 2019-05-08 14:48:45
 */
/**
 * 吸顶
 * https://www.npmjs.com/package/sticky-sidebar
 */
window.ResizeSensor = ResizeSensor
let configDefault = {
    bottomSpacing: 0,
    topSpacing: 0
}
let getConfig = value => {
    if (typeof value !== 'object') return value
    for (let key in configDefault) {
        if (value && value[key] === undefined) {
            value[key] = configDefault[key]
        }
    }
    return value
}
Vue.directive('sticky', {
    inserted(el, { value }) {
        if (value === false) {
            return
        }
        el.__sticky = new StickySidebar(el, getConfig(value))
        el.__stickyValue = value
    },
    update(el, { value }) {
        if (value === el.__stickyValue) return
        if (el.__sticky) {
            el.__sticky.destroy()
            delete el.__sticky
            let wrapper = el.childNodes[0]
            while (wrapper.childNodes.length) {
                let child = wrapper.childNodes[0]
                if (child.className !== 'resize-sensor') {
                    el.appendChild(child)
                } else {
                    child.remove()
                }
            }
            wrapper.remove()
        }
        if (value !== false) {
            el.__sticky = new StickySidebar(el, getConfig(value))
        }
    },
    unbind(el) {
        if (el.__sticky) {
            el.__sticky.destroy()
            delete el.__sticky
            delete el.__stickyValue
        }
    }
})
/**
 * 懒加载
 * https://www.npmjs.com/package/vue-lazyload
 */
Vue.use(VueLazyload, {
    attempt: 1
})
/**
 * 滑块
 */

Vue.use(VueAwesomeSwiper)
/**
 * sortable
 */
Vue.directive('sortable', {
    inserted(el, { value }) {
        if (value === false) {
            if (!el.__sortable) return
            el.__sortable.destroy()
            delete el.__sortable
            return
        }
        value.onSort = evt => {
            if (value.__sorting) return
            value.__sorting = true
            let { oldIndex, newIndex, item, to, from } = evt
            from.insertBefore(
                item,
                from.childNodes[
                    oldIndex + Number(to === from && oldIndex > newIndex)
                ]
            )
            value.onSortUpdate && value.onSortUpdate(evt)
            setTimeout(_ => {
                value.__sorting = false
            }, 300)
        }
        el.__sortable = new Sortable(el, value)
    },
    unbind(el) {
        if (el.__sortable) {
            el.__sortable.destroy()
            delete el.__sortable
        }
    }
})
Vue.use(ScrollTo, {
    container: 'body',
    duration: 500,
    easing: 'ease',
    offset: 0,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})
