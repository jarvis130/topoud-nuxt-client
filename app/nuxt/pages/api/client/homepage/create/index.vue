<template lang="pug">
.homepage-create
    .weui-panel
    .weui-panel
        .weui-cell.top
            .weui-label 企业名称
            .weui-cell__bd
                input.weui-input(placeholder='一个月只能修改一次')
            .weui-cell__ft
                .topoud-btn.plain.small 认证
        .weui-cell.top
            .weui-label 企业地址
            .weui-cell__bd
                input.weui-input(placeholder='默认读取名片的地址')
            .weui-cell__ft
                .topoud-btn.plain.small 获取地址
        .weui-cell.top
            .weui-label 联系电话
            .weui-cell__bd
                input.weui-input(placeholder='023-66664155')
    .weui-panel
        .weui-cell.weui-cell_access(@click='industrySelecting=true')
            .weui-label 行业
            .weui-cell__bd
                .input-selector {{'点击选择'}}
            .weui-cell__ft
    transition
        .weui-mask(v-if='industrySelecting' @click='industrySelecting=false')
    transition
        .weui-actionsheet.weui-actionsheet_toggle(v-if='industrySelecting')
            //- .weui-actionsheet__title
                .weui-actionsheet__title-text title
            .weui-actionsheet__menu
                .weui-actionsheet__cell 行业1
                .weui-actionsheet__cell 行业2
                .weui-actionsheet__cell 行业3
                .weui-actionsheet__cell 行业4
            //- .weui-actionsheet__action
                .weui-actionsheet__cell(@click='industrySelecting=false') action
    .btn-area
        nuxt-link(to='./create/template-select')
            .topoud-btn 下一步
</template>
<script>
export default {
    head() {
        return { title: '官网基础设置' }
    },
    data() {
        return { industrySelecting: false }
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
