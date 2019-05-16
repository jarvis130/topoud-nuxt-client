<template lang="pug">
.homepage-module
    titleModule(:item='item' :status='status' :loading='!content')
    .image-panel(v-if='!content')
        .image-panel-loading
            small 加载中 
            .weui-loading
    .image-panel(v-else-if='errormsg' @click='contentGet')
        .image-panel-error
            small {{errormsg}}
    template(v-else-if='status.editing')
        .homepage-module-1(v-if='content.length === 1')
            uploaderModule(@preview='preview_1' @uploaded='uploaded_1' :size='[345, 165]')
                .homepage-module-panel.image-panel
                    img(v-if='item.imgs && item.imgs[0]' :src='item.imgs[0]')
                    template(v-else)
                        .image-add-icon
                        .text {{item.tips || '请上传图片'}}
        .homepage-module-2(v-else-if='content.length === 2')
            .homepage-module-2-left
                uploaderModule(@preview='preview_1' @uploaded='uploaded_1' :size='[165, 165]')
                    .homepage-module-panel.image-panel
                        img(v-if='item.imgs && item.imgs[0]' :src='item.imgs[0]')
                        template(v-else)
                            .image-add-icon
                            .text {{item.tips || '请上传图片'}}
            .homepage-module-2-right
                uploaderModule(@preview='preview_2' @uploaded='uploaded_2' :size='[165, 165]')
                    .homepage-module-panel.image-panel
                        img(v-if='item.imgs && item.imgs[1]' :src='item.imgs[1]')
                        template(v-else)
                            .image-add-icon
                            .text {{item.tips || '请上传图片'}}
</template>
<script>
import titleModule from './_title'
import uploaderModule from '~/components/uploader/homepage'
export default {
    props: ['item', 'status'],
    components: { uploaderModule, titleModule },
    data() {
        return {
            content: false,
            errormsg: false
        }
    },
    mounted() {
        this.contentGet()
    },
    methods: {
        preview_1(url, index) {
            if (!this.item.imgs) this.$set(this.item, 'imgs', [])
            this.$set(this.item.imgs, index || 0, url)
        },
        preview_2(url, index) {
            this.preview_1(url, 1)
        },
        uploaded_1(url) {
            this.preview_1(url, 0)
        },
        uploaded_2(url) {
            this.preview_1(url, 1)
        },
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            this.$axios('/template/getPanelContentList', {
                params: { panelId }
            })
                .then(({ data: { success, result: content, message } }) => {
                    if (!success) throw Error(message)
                    if (content && content.length) {
                        this.content = content
                    } else {
                        this.contentInit()
                    }
                })
                .catch(({ message }) => {
                    this.errormsg = message
                })
        },
        contentInit() {
            let panelId = this.item.panelId
            let remark = parseInt(this.item.remark) || 2
            let p = []
            if (remark > 0 && remark < 5) {
                p.push(
                    this.$axios.post('/template/savePanelContent', {
                        panelId,
                        type: 8
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
}
</style>
