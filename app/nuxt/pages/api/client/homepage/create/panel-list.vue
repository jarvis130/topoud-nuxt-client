<template lang="pug">
.container
    .loading-fullscreen(v-if='!template.list')
        .weui-loading
        small  模版加载中
    .homepage-editor-create(v-else)
        .add-more
            nuxt-link(to='./panel-add')
                .topoud-btn.text +添加更多模块
        .sotable-items(v-sortable='{animation:150,handle:`.i-sort`,onUpdate: sortCallBack}')
            nuxt-link.sotable-item(v-for='(item, index) in template.list' :key='item._hash' :to='`./panel-edit?sortOrder=${index}`')
                swiperModule( v-if='item.type === `6`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove')
                textModule(   v-else-if='item.type === `1`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove')
                imageModule(  v-else-if='item.type === `8`' :item='item' :status='status' @toTop='moduleTotop' @remove='moduleRemove')
        .button-update
            .topoud-btn(@click='templateUpdate') 保存
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
import { typesInit } from './panel-config'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule
    },
    head() {
        return {
            title: '编辑官网'
        }
    },
    mounted() {
        if (window.__homepageCreatePanelList) {
            this.$nextTick(_ => {
                this.template.list = window.__homepageCreatePanelList
            })
        } else {
            this.templateListGet()
        }
    },
    methods: {
        moduleTotop(sortOrder) {
            if (!sortOrder) return
            let item = this.template.list[sortOrder]
            this.template.list.splice(sortOrder, 1)
            this.template.list.splice(sortOrder - 1, 0, item)
            // this.template.list.unshift(item)
            for (let i in this.template.list) {
                this.template.list[i].sortOrder = i
            }
        },
        moduleRemove(sortOrder) {
            let item = this.template.list[sortOrder]
            this.template.list.splice(sortOrder, 1)
            this.removingList.push(item)
            for (let i in this.template.list) {
                this.template.list[i].sortOrder = i
            }
        },
        sortCallBack({ newIndex, oldIndex }) {
            let item = this.templates[oldIndex]
            this.templates.splice(oldIndex, 1)
            this.templates.splice(newIndex, 0, item)
        },
        templateListGet() {
            this.$axios
                .get('/template/getPanelList')
                .then(({ data: { success, message, result: list } }) => {
                    if (!success) throw Error(message)
                    if (!list || !list.length) {
                        this.templateInit()
                    } else {
                        window.__homepageCreatePanelList = this.template.list = list
                    }
                })
                .catch(({ message }) => {
                    this.$nuxt.error(message)
                })
        },
        templateInit() {
            // 类型配置 6:轮播图 1:文本 8(1):单行图 8(2):双行图
            let types = typesInit
            let p = []
            for (let i in types) {
                let { type, remark, panelName } = types[i]
                p.push(
                    this.$axios.post('/template/savePanel', {
                        type,
                        remark,
                        panelName,
                        sortOrder: i
                    })
                )
            }
            return Promise.all(p).then(_ => this.templateListGet())
        },
        templateUpdate() {
            if (!confirm('确认更新并发布？')) return
            let p = []
            console.log(this.template.list)
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
                        console.log(body)
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
            this.status.updating = true
            let errorList = []
            Promise.all(p)
                .then(result => {
                    this.status.updating = false
                    for (let i in result) {
                        if (!result[i].success) {
                            this.errorList.push(result[i].message)
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
                                    this.errorList.push(result[i].message)
                                }
                            }
                        })
                    }
                })
                .then(_ => {
                    if (!errorList.length) {
                        this.$message.success('保存成功')
                        this.removingList.length = '0'
                    } else {
                        console.log(errorList)
                        this.$message.error(
                            '部分接口出错' + `(${errorList.length}/${p.length})`
                        )
                    }
                })
        },
        _templateCreateHash() {
            for (let i in this.template.list) {
                if (!this.template.list[i]) {
                    this.template.list[i]._hash =
                        this.template.list[i]._hash || Math.random()
                }
            }
        }
    },
    watch: {
        'this.template.list.length'() {
            console.log('?')
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
                list: false
            },
            status: {
                editInList: true
            },
            removingList: []
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
    z-index: 20;
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