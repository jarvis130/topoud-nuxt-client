<template lang="pug">
.homepage-module
    .homepage-module-title {{item.title}}
        .homepage-module-title-action
            span
                .icon.i-totop
                | 置顶
            span
                .el-icon-close
                | 删除
    .homepage-module-1(v-if='item.count === 1')
        uploaderModule(@preview='preview_1' @uploaded='uploaded_1' :size='[345, 165]')
            .homepage-module-panel.image-panel
                img(v-if='item.imgs && item.imgs[0]' :src='item.imgs[0]')
                template(v-else)
                    .image-add-icon
                    .text {{item.tips || '请上传图片'}}
    .homepage-module-2(v-else-if='item.count === 2')
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
import uploaderModule from '~/components/uploader/homepage'
export default {
    props: ['item', 'status'],
    components: { uploaderModule },
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
        }
    }
}
</script>

<style lang="less" scoped>
.image-panel {
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
}
</style>
