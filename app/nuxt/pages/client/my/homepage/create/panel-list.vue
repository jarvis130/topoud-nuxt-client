<template lang="pug">
.container
    .loading-fullscreen(v-if='!template.list')
        .weui-loading
        small  模版加载中
    .homepage-editor-create(v-else)
        .add-more
            nuxt-link(to='./panel-add')
                .topoud-btn.text +添加更多模块
        .sotable-items(v-sortable='{animation:150, handle:`.i-sort`, onUpdate: sortCallBack}')
            nuxt-link.sotable-item(v-for='(item, index) in template.list' :key='item._hash' :to='`./panel-edit?sortOrder=${index}`')
                swiperModule( v-if='!sorting && item.type === `6`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove' :templateId='template.templateId')
                textModule(   v-else-if='!sorting && item.type === `11`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove' :templateId='template.templateId')
                imageModule(  v-else-if='!sorting && item.type === `10`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove' :templateId='template.templateId')
                videoModule(  v-else-if='!sorting && item.type === `9`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove' :templateId='template.templateId')
        .button-update
            .topoud-btn(@click='status.confirming = true' :class='{ disabled: status.updating }') 保存
                template(v-if='status.updating')
                    span 中 
                    .weui-loading
    transition(name='fade')
        .weui-mask(v-if='status.confirming' @click='status.confirming = false')
    transition(name='fade')
        .weui-dialog(v-if='status.confirming')
            .weui-dialog__hd 确认保存？
            .weui-dialog__bd
            .weui-dialog__ft
                .weui-dialog__btn.weui-dialog__btn_default(@click='status.confirming = false') 取消
                .weui-dialog__btn.weui-dialog__btn_primary(@click='status.confirming = false;templateUpdate();') 保存
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
import videoModule from '~/components/homepage/modules/video'
import { typesInit } from './panel-config'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule,
        videoModule
    },
    head() {
        return {
            title: '编辑官网'
        }
    },
    mounted() {
        if (
            window.__homepageCreatePanelList &&
            window.__templateTerminalMobileId
        ) {
            this.$nextTick(_ => {
                this.template.list = window.__homepageCreatePanelList
                this.template.id = window.__templateTerminalMobileId.id
                this.template.templateId =
                    window.__templateTerminalMobileId.templateId
            })
        } else {
            // this.templateListGet()
            this.templateGet()
        }
        if (window.__removingList) {
            this.removingList = window.__removingList
        } else {
            window.__removingList = this.removingList
        }
        if (window.__removingListContent) {
            this.removingListContent = window.__removingListContent
        } else {
            window.__removingListContent = this.removingListContent
        }
    },
    methods: {
        reSort() {
            for (let i in this.template.list) {
                this.template.list[i].sortOrder = i
            }
            this.sorting = true
            let y = window.scrollY
            this.$nextTick(_ => {
                this.sorting = false
                this.$nextTick(_ => {
                    window.scrollTo(0, y)
                })
            })
        },
        moduleTotop(sortOrder) {
            if (!sortOrder) return
            let item = this.template.list[sortOrder]
            this.template.list.splice(sortOrder, 1)
            this.template.list.splice(sortOrder - 1, 0, item)
            this.reSort()
        },
        moduleRemove(sortOrder) {
            let item = this.template.list[sortOrder]
            this.template.list.splice(sortOrder, 1)
            this.removingList.push(item)
            this.reSort()
        },
        sortCallBack({ newIndex, oldIndex }) {
            let item = this.templates[oldIndex]
            this.templates.splice(oldIndex, 1)
            this.templates.splice(newIndex, 0, item)
        },
        templateGet() {
            this.$axios('/template/getTemplateListByPage', {
                params: { type: 4 }
            })
                .then(({ data: { success, message, msg, result } }) => {
                    if (!success) throw Error(message || msg)
                    let { data } = result
                    if (!data || !data.length) {
                        this.templateInit()
                        // return
                    } else {
                        let templateId = (this.template.templateId =
                            data[0].templateId)
                        let id = (this.template.id = data[0].id)
                        window.__templateTerminalMobileId = { templateId, id }
                        this.templateListGet()
                    }
                })
                .catch(({ message }) => {
                    this.$nuxt.error({ message })
                })
        },
        templateInit() {
            if (this.template.inited) {
                return this.$nuxt.error({ message: '初始化失败' })
            }
            this.template.inited = true
            this.$axios
                .post('/template/saveTemplate', { type: 4 })
                .then(({ data: { success, message, result } }) => {
                    if (!success) throw Error(message)
                    this.templateGet()
                })
                .catch(({ message }) => {
                    this.$nuxt.error({ message })
                })
        },
        templateListGet() {
            let { templateId } = this.template
            if (!templateId) {
                return this.$nuxt.error({ message: 'templateId invalid' })
            }
            this.$axios
                .get('/template/getPanelList', {
                    params: { templateId, terminal: 1 }
                })
                .then(({ data: { success, message, result: list } }) => {
                    if (!success) throw Error(message)
                    if (!list || !list.length) {
                        this.templateListInit()
                    } else {
                        window.__homepageCreatePanelList = this.template.list = list
                    }
                })
                .catch(({ message }) => {
                    this.$nuxt.error({ message })
                })
        },
        templateListInit() {
            if (this.template.listInited) {
                return this.$nuxt.error({ message: '初始化失败' })
            }
            this.template.listInited = true
            // 类型配置 6:轮播图 1:文本 8(1):单行图 8(2):双行图
            let { templateId } = this.template
            let types = typesInit
            let p = []
            for (let i in types) {
                let { type, remark, panelName } = types[i]
                p.push(
                    this.$axios.post('/template/savePanel', {
                        type,
                        templateId,
                        remark,
                        panelName,
                        sortOrder: i,
                        terminal: 1,
                        status: 1
                    })
                )
            }
            return Promise.all(p).then(_ => this.templateListGet())
        },
        templateUpdate() {
            // if (!confirm('确认更新并发布？')) return
            // if (!window.test) {
            //     window.wx && window.wx.miniProgram.navigateBack()
            //     // window.wx &&
            //     //     window.wx.miniProgram.switchTab({
            //     //         url: '/pages/card/officialWeb/index'
            //     //     })
            //     return
            // }
            let { templateId } = this.template
            let p = []
            // console.log(this.template.list)
            for (let i in this.template.list) {
                this.template.list[i].sortOrder = i
            }
            for (let i in this.template.list) {
                let body = {},
                    item = this.template.list[i]
                for (let key in item) {
                    if (key.indexOf('_') === 0) continue
                    body[key] = item[key]
                }
                body.isEnable = true
                body.templateId = templateId
                body.terminal = 1
                body.status = 1
                p.push(
                    this.$axios
                        .post('/template/savePanel', body)
                        .then(
                            ({
                                data: {
                                    success,
                                    message,
                                    result: { panelId }
                                }
                            }) => {
                                if (!success) throw Error(message)
                                if (!item.panelId) {
                                    item.panelId = panelId
                                    item._created = true
                                }
                                return { success }
                            }
                        )
                        .catch(({ message }) => {
                            return { message }
                        })
                )
                if (item.panelId) {
                    for (let j in item._content) {
                        let content = item._content[j],
                            body = {}
                        for (let key in content) {
                            if (key.indexOf('_') === 0) continue
                            body[key] = content[key]
                        }
                        body.panelId = item.panelId
                        body.templateId = templateId
                        body.terminal = 1
                        p.push(
                            this.$axios
                                .post('/template/savePanelContent', body)
                                .then(({ data: { success, message } }) => {
                                    if (!success) throw Error(message)
                                    return { success }
                                })
                                .catch(({ message }) => {
                                    return { message }
                                })
                        )
                    }
                }
            }
            for (let i in this.removingList) {
                let { panelId } = this.removingList[i]
                if (!panelId) continue
                p.push(
                    this.$axios
                        .post('/template/deletePanel', { panelId })
                        .then(({ data: { success, message } }) => {
                            if (!success) throw Error(message)
                            return { success }
                        })
                        .catch(({ message }) => {
                            return { message }
                        })
                )
            }
            for (let i in this.removingListContent) {
                let { id } = this.removingListContent[i]
                if (!id) continue
                p.push(
                    this.$axios
                        .get('/template/deletePanelContent', {
                            params: { id }
                        })
                        .then(({ data: { success, message } }) => {
                            if (!success) throw Error(message)
                            return { success }
                        })
                        .catch(({ message }) => {
                            return { message }
                        })
                )
            }
            this.status.updating = true
            let errorList = []
            Promise.all(p)
                .then(result => {
                    this.status.updating = false
                    for (let i in result) {
                        if (!result[i].success) {
                            errorList.push(result[i].message)
                        }
                    }
                    let unSavePanel = []
                    for (let i in this.template.list) {
                        let item = this.template.list[i]
                        if (!item._created) continue
                        for (let j in item._content) {
                            let content = item._content[j],
                                body = {}
                            for (let key in content) {
                                if (key.indexOf('_') === 0) continue
                                body[key] = content[key]
                            }
                            body.panelId = item.panelId
                            body.templateId = templateId
                            body.terminal = 1
                            p.push(1)
                            unSavePanel.push(
                                this.$axios
                                    .post('/template/savePanelContent', body)
                                    .then(({ data: { success, message } }) => {
                                        if (!success) throw Error(message)
                                        return { success }
                                    })
                                    .catch(({ message }) => {
                                        return { message }
                                    })
                            )
                        }
                    }
                    if (unSavePanel.length) {
                        return Promise.all(unSavePanel).then(result => {
                            this.status.updating = false
                            for (let i in result) {
                                if (!result[i].success) {
                                    errorList.push(result[i].message)
                                }
                            }
                        })
                    }
                })
                .then(_ => {
                    let { id } = this.template
                    return this.$axios.post('/template/saveTemplate', {
                        templateId,
                        id,
                        type: 4,
                        isPub: true,
                        isDefault: true
                    })
                })
                .then(_ => {
                    if (!errorList.length) {
                        this.$message.success('保存成功')
                        this.removingList.length = '0'
                        // window.wx && window.wx.miniProgram.navigateBack()
                        setTimeout(_ => {
                            try {
                                window.wx &&
                                    window.wx.miniProgram.switchTab({
                                        url: '/pages/card/home/index'
                                        // url: '/pages/card/officialWeb/index'
                                    })
                            } catch (e) {
                                alert(JSON.stringify(e))
                            }
                            // window.wx && window.wx.miniProgram.navigateBack()
                            // this.$router.go(-2)
                        }, 1500)
                    } else {
                        console.log(errorList)
                        this.$message.error(
                            '部分接口出错' + `(${errorList[0]})(${errorList.length}/${p.length})`
                        )
                    }
                })
                .catch(({ message }) => {
                    this.$message.error(message)
                })
        },
        _templateCreateHash() {
            for (let i in this.template.list) {
                if (!this.template.list[i]) {
                    this.template.list[i]._hash =
                        this.template.list[i]._hash || Math.random()
                }
            }
            this.reSort()
        }
    },
    computed: {
        listLength() {
            return this.template.list && this.template.list.length
        }
    },
    watch: {
        listLength() {
            this._templateCreateHash()
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            template: {
                inited: false,
                listInited: false,
                list: false,
                templateId: false
            },
            status: {
                confirming: false,
                updating: false,
                editInList: true
            },
            removingList: [],
            removingListContent: [],
            // 同样类型的组件在排序变化时不会重新渲染， 需要通过sorting控制重新绘制
            sorting: false
        }
    }
}
</script>
<style lang="less" scoped>
.textarea-auto {
    line-height: 1.8;
    padding-top: 10px;
    padding-bottom: 10px;
}
.icons {
    float: right;
    .el-icon-circle-close {
        margin-left: 5px;
    }
}
.swiper-slide {
    img {
        width: 200px;
        height: 200px;
    }
}
.button-update {
    background: white;
    padding: 8px 15px;
    .weui-flex__item {
        padding-right: 7.5px;
    }
    .weui-flex__item + .weui-flex__item {
        padding-left: 7.5px;
        padding-right: 0px;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.17);
}
.left {
    padding-right: 5px;
}
.right {
    padding-left: 5px;
}
.type-image2 {
    line-height: 1;
    img {
        width: 100%;
        height: 100px;
    }
    .image-add {
        height: 200px;
    }
}
.type-swiper5 {
    .img-control {
        line-height: 1;
        .image {
            position: relative;
            display: inline-block;
            .el-icon-circle-close {
                position: absolute;
                right: 4px;
                top: -6px;
                line-height: 14px;
                font-size: 14px;
                color: #666;
            }
        }
        img,
        .image-add {
            display: inline-block;
            margin-right: 10px;
            width: 40px;
            height: 40px;
        }
    }
}
.add-more {
    padding: 15px 15px 0 15px;
    text-align: right;
}
</style>