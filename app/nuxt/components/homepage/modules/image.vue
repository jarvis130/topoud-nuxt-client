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
    .homepage-module-1(v-if='content.length === 1 && (!status.view || content[0].picUrl)')
        uploaderModule(@upload='upload_1' :size='[375, 180]')
            .homepage-module-panel.image-panel
                .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                    .weui-loading
                img(@click='imgPreview(content[0].picUrl)' v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                template(v-else-if='!status.view')
                    .image-add-icon
                    .text {{item._tips || '请上传图片'}}
    //- 2 ---
    //- 2 ---
    //- 2 ---
    .homepage-module-2(v-else-if='content.length === 2')
        .homepage-module-2-left(v-if='!status.view || content[0].picUrl')
            uploaderModule(@upload='upload_1' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[0].picUrl)' v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-2-right(v-if='!status.view || content[1].picUrl')
            uploaderModule(@upload='upload_2' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[1]._picUrl && !content[1].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[1].picUrl)' v-if='content[1]._picUrl || content[1].picUrl' :src='content[1]._picUrl || content[1].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
    //- 3 ---
    //- 3 ---
    //- 3 ---
    .homepage-module-3(v-else-if='content.length === 3')
        .homepage-module-3-left(v-if='!status.view || content[0].picUrl')
            uploaderModule(@upload='upload_1' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[0]._picUrl && !content[0].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[0].picUrl)' v-if='content[0]._picUrl || content[0].picUrl' :src='content[0]._picUrl || content[0].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-3-center(v-if='!status.view || content[1].picUrl')
            uploaderModule(@upload='upload_2' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[1]._picUrl && !content[1].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[1].picUrl)' v-if='content[1]._picUrl || content[1].picUrl' :src='content[1]._picUrl || content[1].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .homepage-module-3-right(v-if='!status.view || content[2].picUrl')
            uploaderModule(@upload='upload_3' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[2]._picUrl && !content[2].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[2].picUrl)' v-if='content[2]._picUrl || content[2].picUrl' :src='content[2]._picUrl || content[2].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
    //- 9 ---
    //- 9 ---
    //- 9 ---
    .homepage-module-9(v-else-if='content.length === 9')
        .homepage-module-9-item(v-for='index in [0,1,2,3,4,5,6,7,8]' v-if='!status.view || content[index].picUrl')
            uploaderModule(@upload='upload_9($event, index)' :size='[375, 375]')
                .homepage-module-panel.image-panel
                    .loading(v-if='content[index]._picUrl && !content[index].picUrl') 上传中，请稍后
                        .weui-loading
                    img(@click='imgPreview(content[index].picUrl)' v-if='content[index]._picUrl || content[index].picUrl' :src='content[index]._picUrl || content[index].picUrl')
                    template(v-else-if='!status.view')
                        .image-add-icon
                        .text {{item._tips || '请上传图片'}}
        .clearfix
</template>
<script>
import titleModule from './_title'
// import uploaderModule from '~/components/uploader/homepage-image'
import uploaderModule from '~/components/uploader/homepage-image-with-cropper'
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
                this.$set(this.content[index], 'picUrl', false)
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
        upload_9({ type, value }, index) {
            this.upload({ type, value, index })
        },
        imgPreview(current) {
            if (!window.wx) return
            if (!status.view) return
            let urls = []
            let wx = window.wx
            this.content.map(({ picUrl }) => picUrl && urls.push(picUrl))
            wx.previewImage({
                current,
                urls
            })
        },
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            let templateId = this.templateId
            let storeId = localStorage.getItem('storeId')
            this.$axios('/template/getPanelContentList', {
                params: { panelId, terminal: 1, templateId, storeId }
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
            let storeId = localStorage.getItem('storeId')
            let p = [
                this.$axios.post('/template/savePanelContent', {
                    panelId,
                    type: 8,
                    terminal: 1,
                    templateId,
                    storeId
                })
            ]
            if (remark && remark > 0 && remark < 5) {
                p.push(
                    this.$axios.post('/template/savePanelContent', {
                        panelId,
                        templateId,
                        type: 8,
                        terminal: 1,
                        storeId
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
        // height: 165px;
        height: 100%;
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
    .homepage-module-3 &,
    .homepage-module-9 & {
        .image-add-icon {
            margin-top: 31px;
        }
        height: 113px;
    }
}
</style>
