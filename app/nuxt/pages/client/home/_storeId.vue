<template lang="pug">
.container
    .loading-fullscreen(v-if='!template.list')
        .weui-loading
        small  模版加载中
    .homepage-editor-create(v-else)
        .sotable-items
            .sotable-item(v-for='(item, index) in template.list')
                swiperModule( v-if='item.type === 6' :item='item' :status='status')
                textModule(   v-else-if='item.type === 1' :item='item' :status='status')
                imageModule(  v-else-if='item.type === 8' :item='item' :status='status')
        .homepage-module(v-if='storeInfo')
            .weui-panel(style='border-radius: 4px; overflow: hidden;')
                .weui-cell
                    .weui-label 联系电话:
                    .weui-cell__bd 
                        a(:href='`tel:${storeInfo.phone}`') {{storeInfo.phone}}
                .weui-cell
                    .weui-label 企业地址:
                    .weui-cell__bd {{storeInfo.address}}
                div(style='line-height: 1; margin-bottom: -2px;')
                    img(:src='storeInfo.mapUrl' style='width: 100%; padding:0; margin:0; max-height: 180px;background:#efefef;')
    template(v-if='$route.params.storeId == $store.getters.userInfo.storeId')
        br
        nuxt-link(to='/client/my/homepage/create' replace).btn-area
            .topoud-btn 编辑我的官网
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule
    },
    head() {
        return {
            title: '官网'
        }
    },
    mounted() {
        let { storeId } = this.$route.params
        this.$axios(`/storeWeb/wapHome?storeId=${storeId}&wechatId=1`)
            .then(({ data: { success, message, result } }) => {
                if (!success) throw Error(message)
                this.template.list = result
                for (let i in result) {
                    result[i]._content = result[i].panelContents
                }
            })
            .catch(({ message }) => {
                this.$nuxt.error({ message })
            })
        this.$axios('/store/getStoreInfo', { params: { storeId } })
            .then(
                ({
                    data: {
                        success,
                        message,
                        result: {
                            address,
                            longitude,
                            latitude,
                            phone,
                            storeName
                        }
                    }
                }) => {
                    if (!success) throw Error(message)
                    let xy = `${latitude},${longitude}`
                    let mapUrl = `https://apis.map.qq.com/ws/staticmap/v2/?key=${
                        this.qqMapKey
                    }&center=${xy}&zoom=16&labels=anchor:3|${storeName.substr(
                        0,
                        12
                    )}|${xy}&size=450*180`
                    // let mapUrl = `https://apis.map.qq.com/ws/staticmap/v2/?size=450*300&key=${
                    //     this.qqMapKey
                    // }&center=${xy}&labels=${address}|${xy}`
                    this.storeInfo = {
                        address,
                        longitude,
                        latitude,
                        phone,
                        mapUrl
                    }
                }
            )
            .catch(({ message }) => {
                this.$nuxt.error({ message })
            })
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
            qqMapKey: '5DRBZ-DZIKF-N77JW-JB2QB-TZE7E-3GBGY'
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
</style>