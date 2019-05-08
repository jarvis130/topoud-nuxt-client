import Vue from 'vue'
import Vuex from 'vuex'

import user from './_user'
// import config from './config'
// import city from './city'
// import geolocation from './geolocation'
// import login from './login';

Vue.use(Vuex)
const store = () =>
    new Vuex.Store({
        modules: {
            user
            // config,
            // geolocation,
            // city
            // login
        }
    })
export default store
