
<template>
	<div class="container">
		<div
            class="loading-fullscreen"
            v-if="!template.list">
			<div class="weui-loading"></div>
			<small> 模版加载中</small>
		</div>
		<div class="homepage-editor-create">
			<div class="sotable-items">
				<div
                    class="sotable-item"
                    v-for="(item, index) in template.list"
                    :key="index">
					<swiperModule
                        v-if="item.type === 6"
                        :item="item"
                        :status="status"
                    ></swiperModule>
					<textModule
                        v-else-if="item.type === 11"
                        :item="item"
                        :status="status"
                    ></textModule>
					<imageModule
                        v-else-if="item.type === 10"
                        :item="item"
                        :status="status"
                    ></imageModule>
					<videoModule
                        v-else-if="item.type === 9"
                        :item="item"
                        :status="status"
                    ></videoModule>
				</div>
			</div>
			<div class="contact-us">
				<div class="title">
					联系我们吧<br />
					<small>
						<img :src="meaninglessItem" style="height: 8px;margin-bottom: 3px;" />
						CONTACT US
						<img :src="meaninglessItem" style="height: 8px;margin-bottom: 3px;" />
					</small>
					<div style="line-height: 1;margin-bottom: 15px;">
						<img :src="meaninglessItem2" style="height: 9px;" />
					</div>
				</div>
				<a class="some-btn" :href="`tel:${storeInfo.phone}`">
					<img :src="meaninglessItem3" />
					{{storeInfo.phone}}
				</a>
				<div class="map" @click="openLocation" v-if="storeInfo.mapUrl">
					<img :src="storeInfo.mapUrl" />
				</div>
				<div class="address">
					<div class="icon i-locationfill"></div>
					详细地址:{{storeInfo.address}}
				</div>
			</div>
		</div>
		<template v-if="pd">
			<br />
			<nuxt-link class="btn-area" to="/client/my/homepage/create" replace="replace">
				<div class="topoud-btn">编辑我的官网</div>
			</nuxt-link>
		</template>
	</div>
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
import videoModule from '~/components/homepage/modules/video'
const qqMapKey = '5DRBZ-DZIKF-N77JW-JB2QB-TZE7E-3GBGY'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule,
        videoModule
    },
    computed: {
        pd: function() {
            if (this.$store.getters.userInfo.channelInfo) {
                if (this.$store.getters.userInfo.userStoreId && parseInt(this.$route.params.storeId) === parseInt(this.$store.getters.userInfo.userStoreId.officialId)) {
                    if (this.$store.getters.userInfo.channelInfo[0].roleType > 0) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                if (this.$store.getters.userInfo.userStoreId && parseInt(this.$route.params.storeId) === parseInt(this.$store.getters.userInfo.userStoreId.officialId)) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    head() {
        let {
                template: { list },
                storeInfo
            } = this,
            description,
            industries
        if (list) {
            for (let i in list) {
                let item = list[i]
                if (
                    item.name === '企业介绍' &&
                    item.panelContents &&
                    item.panelContents.length
                ) {
                    description = item.panelContents[0].productName || ''
                    break
                }
            }
        }
        if (storeInfo) {
            industries = storeInfo.industries || ''
        }
        return {
            title: this.storeInfo.storeName,
            meta: [
                {
                    name: 'description',
                    content: description
                },
                {
                    name: 'keywords',
                    content: '云柬,云柬名片,电子名片' + industries
                }
            ]
        }
    },
    methods: {
        openLocation() {
            let {
                storeName: name,
                address,
                longitude,
                latitude
            } = this.storeInfo
            if (!this.storeInfo) return
            // if (!window.wx) {
            console.log(latitude + longitude + name + address)
            location.href = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${name};address:${address}`
            // return
            // }
            // window.wx.miniProgram.navigateTo({
            //     url: `/pages/webview/location-open?name=${name}&address=${address}&longitude=${longitude}&latitude=${latitude}`
            // })
        }
    },
    asyncData({ params: { storeId }, app: { $axios }, error }) {
        return Promise.all([
            $axios(`/storeWeb/wapHome?storeId=${storeId}&wechatId=1`),
            $axios('/storeWeb/getStoreInfo', { params: { storeId } }),
            $axios('/icard/getIndustryTree?type=2')
        ])
            .then(([resTemplates, resInfo, resIndustry]) => {
                if (!resTemplates.data.success) {
                    throw Error(resTemplates.data.message)
                }
                if (!resInfo.data.success) {
                    throw Error(resInfo.data.message)
                }
                let template, storeInfo
                template = { list: resTemplates.data.result }
                for (let i in template.list) {
                    template.list[i]._content = template.list[i].panelContents
                }
                let {
                    data: {
                        result: {
                            address,
                            longitude,
                            latitude,
                            phone,
                            storeName,
                            industryId: industryId0
                        }
                    }
                } = resInfo
                let industries
                if (
                    industryId0 &&
                    resIndustry.data &&
                    resIndustry.data.result
                ) {
                    let { result: industryList } = resIndustry.data
                    for (let i in industryList) {
                        if (industries) break
                        let {
                            children,
                            industryId,
                            industryName
                        } = industryList[i]
                        if (industryId0 === industryId) {
                            industries = ',' + industryName
                            break
                        }
                        for (let j in children) {
                            let {
                                industryId: industryId1,
                                industryName: industryName1
                            } = children[j]
                            if (industryId0 === industryId1) {
                                industries =
                                    ',' + industryName + ',' + industryName1
                                break
                            }
                        }
                    }
                }
                let xy = `${latitude},${longitude}`
                let mapUrl =
                    Number(longitude) > 0 && Number(latitude) > 0
                        ? `https://apis.map.qq.com/ws/staticmap/v2/?key=${qqMapKey}&center=${xy}&zoom=16&labels=anchor:3|border:0|${storeName.substr(
                              0,
                              12
                          )}|${xy}&size=450*180`
                        : false
                storeInfo = {
                    address,
                    longitude,
                    latitude,
                    phone,
                    storeName,
                    industries,
                    mapUrl
                }
                return { template, storeInfo }
            })
            .catch(({ message }) => {
                error({ message })
            })
    },
    // mounted() {
    //     let { latitude, longitude, storeName } = this.storeInfo
    //     let xy = `${latitude},${longitude}`
    //     let mapUrl =
    //         longitude && latitude
    //             ? `https://apis.map.qq.com/ws/staticmap/v2/?key=${
    //                   this.qqMapKey
    //               }&center=${xy}&zoom=16&labels=anchor:3|border:0|${storeName.substr(
    //                   0,
    //                   12
    //               )}|${xy}&size=450*180`
    //             : false
    //     this.storeInfo.mapUrl = mapUrl
    // },
    mounted: function() {
        window.localStorage.removeItem('storeId')
        window.localStorage.setItem('storeId', this.$route.params.storeId)
    },
    data() {
        return {
            template: {
                list: false
            },
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            storeInfo: false,
            status: { view: true },
            meaninglessItem3:
                'data:image/png;base64,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',
            meaninglessItem2:
                'data:image/png;base64,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',
            meaninglessItem:
                'data:image/png;base64,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'
        }
    }
}
</script>

<style lang="less">
.homepage-module {
    padding: 10px 15px 15px 15px;
    &-title {
        &-text {
            font-size: 18px;
            line-height: 25px;
            color: #0b0e15;
            &::before {
                display: block;
                position: absolute;
                height: 13px;
                width: 3px;
                left: 0px;
                top: 8px;
                background: #d4a356;
                content: ' ';
                border-radius: 1px;
            }
        }
        position: relative;
        padding-left: 10px;
        padding-bottom: 6px;
        input {
            background: none;
            font-size: 18px;
            line-height: 25px;
            color: #0b0e15;
            width: 200px;
            border: none;
        }
        &-action {
            float: right;
            font-size: 12px;
            line-height: 17px;
            color: #9da2aa;
            span {
                padding: 8px 11px;
                &:last-child {
                    padding-right: 0px;
                }
            }
            .el-icon-close {
                font-weight: bolder;
                margin-right: 4px;
            }
            .icon {
                margin-right: 4px;
            }
        }
    }
    &-panel {
        background: white;
        border-radius: 4px;
        overflow: hidden;
    }
    &-2 {
        &-left,
        &-right {
            float: left;
            width: 50%;
        }
        &-left {
            padding-right: 7.5px;
        }
        &-right {
            padding-left: 7.5px;
        }
        &:after {
            content: ' ';
            display: block;
            clear: both;
        }
    }
    &-3 {
        &-left,
        &-center,
        &-right {
            float: left;
            width: 33.333%;
        }
        &-left,
        &-center {
            padding-right: 1.5px;
        }
        &-right,
        &-center {
            padding-left: 1.5px;
        }
        &:after {
            content: ' ';
            display: block;
            clear: both;
        }
    }
    &-9 {
        &-item {
            float: left;
            width: 33.3333%;
            margin-bottom: 3px;
            &:nth-child(3n-1),
            &:nth-child(3n-2) {
                padding-right: 1.5px;
            }
            &:nth-child(3n-1),
            &:nth-child(3n) {
                padding-left: 1.5px;
            }
        }
    }
}
.btn-area {
    z-index: 40;
    padding: 8px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
}
.contact-us {
    margin: 15px;
    .title {
        font-size: 20px;
    }
    text-align: center;
    .some-btn {
        display: block;
        // vertical-align: middle;
        color: white;
        font-size: 16px;
        height: 40px;
        border-radius: 4px;
        line-height: 40px;
        background: linear-gradient(to right, #c3af91, #9a7654);
        img {
            margin-bottom: 3px;
            margin-right: 10px;
            vertical-align: middle;
            height: 18px;
            width: 18px;
        }
    }
    .map {
        background: #dfdfdf;
        margin: 15px 0 0 0;
        min-height: 50px;
        border-radius: 4px;
        img {
            width: 100%;
        }
    }
    .address {
        margin-top: 15px;
        color: #979da5;
        font-size: 14px;
        font-weight: 300;
        .icon {
            font-size: 18px;
            vertical-align: middle;
            margin-right: 6px;
        }
    }
}
img {
    vertical-align: middle;
}
</style>