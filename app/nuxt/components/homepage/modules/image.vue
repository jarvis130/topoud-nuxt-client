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
    .homepage-module-2
        .homepage-module-2-left
            .homepage-module-panel.image-panel
                .image-add-icon
                .text 添加证书照片
        .homepage-module-2-right
            .homepage-module-panel.image-panel
                .image-add-icon
                .text 添加证书照片
</template>
<script>
export default {
    props: ['item']
}
</script>

<style lang="less" scoped>
.image-panel {
    height: 165px;
    padding-top: 60px;
    text-align: center;
    .text {
        padding-top: 7px;
        font-size: 14px;
        line-height: 20px;
        color: #9da2aa;
    }
}
</style>
