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
            nuxt-link.sotable-item(v-for='item in template.list' :key='item.id' :to='`./panel-edit?sortOrder=${item.sortOrder}`')
                swiperModule( v-if='item.type === `6`' :item='item' :status='status' @toTop='moduleTotop')
                textModule(   v-else-if='item.type === `1`' :item='item' :status='status' @toTop='moduleTotop')
                imageModule(  v-else-if='item.type === `8`' :item='item' :status='status' @toTop='moduleTotop')
        .button-update
            .topoud-btn(:class='{disabled: !status.editing}') 保存
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
        moduleTotop() {},
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
            }
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
<style lang="less">
.homepage-module {
    padding: 10px 15px 15px 15px;
    &-title {
        &-text {
            display: inline-block;
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
            margin-top: 8px;
            span + span {
                margin-left: 22px;
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
}
</style>
