import axios from 'axios'
import Vue from 'vue'
import { seajs } from 'seajs/dist/sea'
const signatureUrl = `https://${
    process.env.APP_ENV !== 'production' ? 'test-' : ''
}icard.yjmp.net/api/wechat/getSignPackage?wechatId=${
    process.env.APP_ENV === 'production' ? 5 : 8
}&url=`
export default _ => {
    let test = true
    if (test || Vue.prototype.$terminal.isWechat) {
        const imgUrl0 = 'https://www.xxx.com/share-icon-min.jpg',
            title0 = '默认标题',
            desc0 = '默认描述'
        seajs.use('https://res2.wx.qq.com/open/js/jweixin-1.4.0.js', _ => {
            axios(signatureUrl + encodeURIComponent(location.href)).then(
                ({
                    data: {
                        result: { appId, timestamp, nonceStr, signature }
                        // url
                    }
                }) => {
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
                }
                Vue.prototype.$wechatShareUpdate()
            })
        })
    }
}
