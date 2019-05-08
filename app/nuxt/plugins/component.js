import Vue from 'vue'
import VueBus from 'vue-bus'
import VueMoment from 'vue-moment'
import moment from 'moment'
import userLoading from '~/components/user/loading'
Vue.use(VueBus)
Vue.use(VueMoment, {
    moment
})
moment.locale('zh-cn')
Vue.component('userLoading', userLoading)
