<template lang="pug">
.homepage-create
    .loading-fullscreen(v-if='!store')
        .weui-loading
        | 获取店铺信息中
    template(v-else)
        .weui-panel
        .weui-panel
            .weui-cell.top
                .weui-label 企业名称
                .weui-cell__bd
                    input.weui-input(placeholder='一个月只能修改一次' maxlength='15' v-model='store.storeName')
                //- .weui-cell__ft
                    .topoud-btn.plain.small 认证
            .weui-cell.top
                .weui-label 企业地址
                .weui-cell__bd
                    input.weui-input(placeholder='默认读取名片的地址' v-model='store.address')
                    //- small(v-if='store.longitude && store.latitude') 坐标:{{store.longitude}},{{store.latitude}}
                    //- small(v-else) 还未获取地址经纬度
                .weui-cell__ft(@click='getLocation')
                    .topoud-btn.plain.small 获取地址
            .weui-cell.top
                .weui-label 联系电话
                .weui-cell__bd
                    input.weui-input(placeholder='' v-model='store.phone')
        .weui-panel
            .weui-cell.weui-cell_access(@click='industryTree.list=industryTree.value')
                .weui-label 行业
                .weui-cell__bd
                    .input-selector {{(industryTree.kv[store.industryId] && industryTree.kv[store.industryId].industryName) || '点击选择'}}
                .weui-cell__ft
        transition
            .weui-mask(v-if='industryTree.list' @click='industryTree.list=false')
        transition
            .weui-actionsheet.weui-actionsheet_toggle(v-if='industryTree.list')
                //- .weui-actionsheet__title
                    .weui-actionsheet__title-text title
                .weui-actionsheet__menu(style='max-height: 310px; overflow: auto;')
                    .weui-actionsheet__cell(v-for='(item, index) in industryTree.list' @click='industrySelect(index)') {{item.industryName}}
                //- .weui-actionsheet__action
                    .weui-actionsheet__cell(@click='industrySelecting=false') action
        .btn-area(@click.stop.capture='nextStep')
            //- nuxt-link(to='./create/template-select')
            //- nuxt-link(to='./create/panel-list')
            .topoud-btn(:class='{disabled: loading}') 下一步
                .weui-loading(v-if='loading')
</template>
<script>
import reg from '~/assets/js/reg'
export default {
    head() {
        return { title: '官网基础设置' }
    },
    data() {
        return {
            loading: false,
            store: false,
            industryTree: { value: false, list: false, kv: {} },
            keysNeccesary: {
                storeName: '企业名称',
                address: '企业地址',
                phone: '联系电话',
                industryId: '行业'
            }
        }
    },
    methods: {
        nextStep() {
            if (this.loading) return
            for (let key in this.keysNeccesary) {
                if (!this.store[key]) {
                    this.$message.error('请填写' + this.keysNeccesary[key])
                    return
                }
            }
            let { phone } = this.store
            if (!reg.landline.test(phone) && !reg.mobile.test(phone)) {
                this.$message.error('联系电话格式错误')
                return
            }
            this.loading = true
            this.$axios
                .post('/store/saveStore', this.store)
                .then(({ data: { success, message, result } }) => {
                    if (!success) throw Error(message)
                    this.$router.push('./create/panel-list')
                    this.loading = false
                })
                .catch(({ message }) => {
                    this.loading = false
                    this.$nuxt.error(message)
                })
        },
        industrySelect(index) {
            if (!this.industryTree.list) return
            if (this.industryTree.list[index].children) {
                let list = this.industryTree.list[index].children
                this.industryTree.list = false
                setTimeout(_ => {
                    this.industryTree.list = list
                }, 200)
                return
            }
            this.store.industryId = this.industryTree.list[index].industryId
            this.industryTree.list = false
        },
        getLocationRequest(index) {
            if (this.getLocationRequestIndex !== index) return
            if (this.getLocationRequestTimes > 30) return
            this.getLocationRequestTimes++
            let { getLocationRequestHash: hash } = this
            this.$axios(
                this.$axios.baseURL.replace(/\/api$/, '') +
                    '/client/my/homepage/create/location-hash-get',
                { params: { hash } }
            )
                .then(({ data: { success, message, result } }) => {
                    if (!success) throw Error(message)
                    if (!result) {
                        setTimeout(_ => {
                            this.getLocationRequest(index)
                        }, 1000)
                        return
                    }
                    let [longitude, latitude, address] = result.split(',')
                    this.store.longitude = longitude
                    this.store.latitude = latitude
                    this.store.address = address
                })
                .catch(({ message }) => {
                    this.$nuxt.error('请求出错，请重新获取地址:' + message)
                })
        },
        getLocation() {
            if (!window.wx) return
            let hash = this.$random.string(32)
            window.wx.miniProgram.navigateTo({
                url: `/pages/webview/location?hash=${hash}`
            })
            this.getLocationRequestHash = hash
            this.getLocationRequestIndex = this.getLocationRequestIndex || 0
            this.getLocationRequestIndex++
            this.getLocationRequestTimes = 0
            this.getLocationRequest(this.getLocationRequestIndex)

            // setTimeout(_ => {
            //     this.$axios.post(
            //         this.$axios.baseURL.replace(/\/api$/, '') +
            //             '/client/my/homepage/create/location-hash-set',
            //         { hash, value: '109.0235,29.235754' }
            //     )
            // }, 3500)
        },
        storeInfoGet() {
            this.$axios('/store/getStoreInfo')
                .then(({ data: { success, message, result: store } }) => {
                    if (!success) throw Error(message)
                    if (!store) {
                        throw Error('store id invalid')
                        // this.storeInit()
                    } else {
                        this.store = store
                        if (!store.storeName) {
                            this.$axios('/icard/getDefaultCard').then(
                                ({
                                    data: {
                                        result: { company,address,telephone }
                                    }
                                }) => {
                                    this.store.storeName = company
                                    this.store.address = address
                                    this.store.phone = telephone
                                }
                            )
                        }
                    }
                })
                .catch(({ message }) => {
                    this.$nuxt.error(message)
                })
        },
        // storeInit() {
        //     this.$axios
        //         .post('/store/saveStore', {})
        //         .then(({ data: { success, message, result } }) => {
        //             if (!success) throw Error(message)
        //             this.storeInfoGet()
        //         })
        //         .catch(({ message }) => {
        //             this.$nuxt.error(message)
        //         })
        // },
        industryTreeGet() {
            this.$axios('/icard/getIndustryTree')
                .then(({ data: { success, message, result } }) => {
                    if (!success) throw Error(message)
                    this.industryTree.value = result
                    for (let i in result) {
                        let item = result[i]
                        this.$set(
                            this.industryTree.kv,
                            parseInt(item.industryId),
                            item
                        )
                        for (let j in item.children || []) {
                            let item1 = item.children[j]
                            this.$set(
                                this.industryTree.kv,
                                parseInt(item1.industryId),
                                item1
                            )
                        }
                    }
                })
                .catch(({ message }) => {
                    this.$nuxt.error(message)
                })
        }
    },
    mounted() {
        this.storeInfoGet()
        this.industryTreeGet()
    }
}
</script>
<style lang="less" scoped>
.weui-label {
    width: 85px;
}
.btn-area {
    padding: 8px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
}
.input-selector {
    color: #979da5;
}
</style>
