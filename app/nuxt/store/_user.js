// import Cookie from 'js-cookie'
import axios from '~/plugins/axios'
import moment from 'moment'
// import nodeEmoji from 'node-emoji'
let firstUserInfo = false
export default {
    state: {
        userInfo: false,
        userLoading: true
    },
    mutations: {
        userInfoSet(state, userInfo) {
            if (userInfo) {
                userInfo.time = Date.now()
                userInfo.userName =
                    userInfo.nickname ||
                    (userInfo.realname || '').replace(/.(.*)$/, '**$1') ||
                    userInfo.mobile ||
                    userInfo.email
                if (userInfo.birthday) {
                    userInfo.birthday = moment(userInfo.birthday).format(
                        'YYYY-MM-DD'
                    )
                }
            }
            state.userInfo = userInfo
            state.userLoading = false
        },
        userLoadingStart(state) {
            state.userLoading = true
        },
        userLoadingFinish(state) {
            state.userLoading = false
        },
        logout(state) {
            state.userInfo = false
        }
    },
    getters: {
        userLoading(state) {
            return state.userLoading
        },
        userInfo(state) {
            return state.userInfo
        }
    },
    actions: {
        userAsync({ commit, getters, dispatch }, { token, userId }) {
            commit('userLoadingStart')
            return axios
                .get('/member/loginWithToken', { params: { token, userId } })
                .then(({ data: { success, msg, message } }) => {
                    if (!success) {
                        throw new Error(msg || message)
                    }
                })
                .catch(({ message }) => {
                    console.error('loginWithToken', message)
                })
                .then(_ => {
                    dispatch('userInfoGet')
                })
        },
        userInfoGet({ commit, getters }) {
            if (firstUserInfo && getters.userLoading) {
                return
            }
            firstUserInfo = true
            let info = getters.userInfo
            if (info) {
                if (Date.now() - info.time <= 1000 * 600) {
                    return Promise.resolve({ info })
                }
            } else {
                commit('userLoadingStart')
            }
            return (
                axios
                    // .get('/user/info/settings')
                    .get('/icard/member/checkLogin?wechatId=9&storeId=1')
                    .then(({ data: { success, result, msg: message } }) => {
                        if (!success) {
                            throw new Error(message)
                        }
                        info = result
                        // info.nickname = nodeEmoji.emojify(info.nickname)
                        // info.user_name = nodeEmoji.emojify(info.user_name)
                        commit('userInfoSet', info)
                        return { info }
                    })
                    .catch(({ response }) => {
                        commit('userInfoSet', false)
                        if (!response) return { info }
                        let {
                            data: { message, unionkey }
                        } = response
                        return { info, message, unionkey }
                    })
            )
        },
        logout({ commit }) {
            if (!confirm('确认退出登陆？')) return Promise.reject(new Error())
            return axios.get('/user/logout').then(_ => {
                location.reload()
                // commit('logout')
            })
        }
    }
}
