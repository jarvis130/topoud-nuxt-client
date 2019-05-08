import axios from 'axios'
import Vue from 'vue'
import { seajs } from 'seajs/dist/sea'
export default _ => {
    if (Vue.prototype.$terminal.isWechat) {
        const imgUrl0 = 'https://www.xxx.com/share-icon-min.jpg',
            title0 = '默认标题',
            desc0 = '默认描述'
        seajs.use('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js', _ => {
            axios(
                'https://api.xxx.com/node-api/wechat/jssdk/get-signature?url=' +
                    encodeURIComponent(location.href)
            ).then(
                ({ data: { appId, timestamp, nonceStr, signature, url } }) => {
                    let config = {
                        appId,
                        timestamp,
                        nonceStr,
                        signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'updateAppMessageShareData',
                            'updateTimelineShareData'
                        ]
                        // debug: true
                    }
                    return window.wx.config(config)
                }
            )
            window.wx.ready(function() {
                Vue.prototype.$wechatShareUpdate = window.$wechatShareUpdate = function(
                    _
                ) {
                    // if (!_) {
                    //     if (Vue.prototype.shareReloaded) {
                    //         return
                    //     } else {
                    //         Vue.prototype.shareReloaded = true
                    //     }
                    // } else {
                    //     Vue.prototype.shareReloaded = false
                    // }
                    let { imgUrl, title, desc } = _ || {}
                    imgUrl = imgUrl || window.__wechatShareImgUrl || imgUrl0

                    delete window.__wechatShareImgUrl
                    title = title || document.title || title0
                    let descItem = document.querySelector(
                        'meta[name="description"]'
                    )
                    desc = desc || (descItem && descItem.content) || desc0
                    window.wx.updateAppMessageShareData({
                        type: 'link',
                        title,
                        link: location.href,
                        imgUrl,
                        desc
                    })
                    window.wx.updateTimelineShareData({
                        type: 'link',
                        title,
                        link: location.href,
                        imgUrl
                    })
                    // ;(window.__wechatShareInited
                    //     ? window.wx.updateAppMessageShareData
                    //     : window.wx.onMenuShareAppMessage)({
                    //     type: 'link',
                    //     title,
                    //     link: location.href,
                    //     imgUrl,
                    //     desc
                    // })
                    // ;(window.__wechatShareInited
                    //     ? window.wx.updateTimelineShareData
                    //     : window.wx.onMenuShareTimeline)({
                    //     type: 'link',
                    //     title,
                    //     link: location.href,
                    //     imgUrl
                    // })
                    // if (!window.__wechatShareInited) {
                    //     window.__wechatShareInited = true
                    // }
                }
                Vue.prototype.$wechatShareUpdate()
            })
        })
    }
}
