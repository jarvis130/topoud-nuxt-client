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
    .homepage-module-panel.text-panel
</template>
<script>
export default {
    props: ['item']
}
</script>

<style lang="less" scoped>
.text-panel {
    height: 103px;
}
</style>
