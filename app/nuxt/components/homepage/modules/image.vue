<template lang="pug">
.homepage-module
    titleModule(:item='item' :status='status' :loading='!content' v-if='!status.adding' @toTop='$emit(`toTop`, item.sortOrder)' @remove='$emit(`remove`, item.sortOrder)')
    .image-panel(v-if='!content')
        .image-panel-loading
            small 加载中 
            .weui-loading
    .image-panel(v-else-if='errormsg' @click='contentGet')
        .image-panel-error
            small {{errormsg}}
    .homepage-module-1(v-if='content.length === 1')
        uploaderModule(@upload='upload_1' :size='[345, 165]')
            .homepage-module-panel.image-panel
                .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                    .weui-loading
                img(v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                template(v-else)
                    .image-add-icon
                    .text {{item._tips || '请上传图片'}}
    //- 2 ---
    //- 2 ---
    //- 2 ---
    .homepage-module-2(v-else-if='content.length === 2')
        .homepage-module-2-left
            uploaderModule(@upload='upload_1' :size='[165, 165]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                        .weui-loading
                    img(v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                    template(v-else)
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-2-right
            uploaderModule(@upload='upload_2' :size='[165, 165]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[1]._picUrl && !content[1].picUrl') 上传中，请稍后
                        .weui-loading
                    img(v-if='content[1]._picUrl || content[1].picUrl' :src='content[1]._picUrl || content[1].picUrl')
                    template(v-else)
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
    //- 3 ---
    //- 3 ---
    //- 3 ---
    .homepage-module-3(v-else-if='content.length === 3')
        .homepage-module-3-left
            uploaderModule(@upload='upload_1' :size='[113, 113]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                        .weui-loading
                    img(v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                    template(v-else)
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-3-center
            uploaderModule(@upload='upload_2' :size='[113, 113]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[1]._picUrl && !content[1].picUrl') 上传中，请稍后
                        .weui-loading
                    img(v-if='content[1]._picUrl || content[1].picUrl' :src='content[1]._picUrl || content[1].picUrl')
                    template(v-else)
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-3-right
            uploaderModule(@upload='upload_3' :size='[113, 113]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[2]._picUrl && !content[2].picUrl') 上传中，请稍后
                        .weui-loading
                    img(v-if='content[2]._picUrl || content[2].picUrl' :src='content[2]._picUrl || content[2].picUrl')
                    template(v-else)
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
    small(v-if='status.editing') 请等待图片上传后再点击完成
</template>
<script>
import titleModule from './_title'
import uploaderModule from '~/components/uploader/homepage'
export default {
    props: ['item', 'status', 'templateId'],
    components: { uploaderModule, titleModule },
    data() {
        return {
            content: false,
            errormsg: false
        }
    },
    mounted() {
        if (this.item._content) {
            this.content = this.item._content
        } else {
            this.contentGet()
        }
    },
    methods: {
        upload({ type, value, index }) {
            console.log({ type, value, index })
            if (type === 'preview') {
                this.$set(this.content[index], '_picUrl', value)
            } else if (type === 'uploaded') {
                this.$set(this.content[index], 'picUrl', value)
            }
        },
        upload_1({ type, value }) {
            this.upload({ type, value, index: 0 })
        },
        upload_2({ type, value }) {
            this.upload({ type, value, index: 1 })
        },
        upload_3({ type, value }) {
            this.upload({ type, value, index: 2 })
        },
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            let templateId = this.templateId
            this.$axios('/template/getPanelContentList', {
                params: { panelId, terminal: 1, templateId }
            })
                .then(({ data: { success, result: content, message } }) => {
                    if (!success) throw Error(message)
                    if (content && content.length) {
                        this.item._content = this.content = content
                    } else {
                        this.contentInit()
                    }
                })
                .catch(({ message }) => {
                    this.errormsg = message
                })
        },
        contentInit() {
            if (this.inited) {
                this.$nuxt.error({ message: '数据初始化出错' })
                return
            }
            this.inited = true
            let { panelId } = this.item
            let { templateId } = this
            let remark = this.item.remark && (parseInt(this.item.remark) || 2)
            let p = [
                this.$axios.post('/template/savePanelContent', {
                    panelId,
                    type: 8,
                    terminal: 1,
                    templateId
                })
            ]
            if (remark && remark > 0 && remark < 5) {
                p.push(
                    this.$axios.post('/template/savePanelContent', {
                        panelId,
                        templateId,
                        type: 8,
                        terminal: 1
                    })
                )
            }
            Promise.all(p).then(_ => {
                this.contentGet()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.image-panel {
    position: relative;
    .loading {
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        vertical-align: middle;
        padding-top: 60px;
        color: white;
        font-weight: 200;
        font-size: 12px;
        .weui-loading {
            margin-left: 5px;
        }
    }
    background: white;
    height: 165px;
    .image-add-icon {
        margin-top: 60px;
    }
    text-align: center;
    overflow: hidden;
    .text {
        padding-top: 7px;
        font-size: 14px;
        line-height: 20px;
        color: #9da2aa;
    }
    img {
        width: 100%;
        height: 165px;
        background: #efefef;
    }
    &-loading {
        height: 165px;
        line-height: 165px;
        text-align: center;
        vertical-align: middle;
    }
    &-error {
        padding: 10px;
        line-height: 1.4;
        text-align: center;
        vertical-align: middle;
        small {
            color: crimson;
        }
    }
    .homepage-module-3 & {
        .image-add-icon {
            margin-top: 31px;
        }
        height: 113px;
    }
}
</style>
