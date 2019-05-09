<template lang="pug">
.homepage-module
    .homepage-module-panel.swiper
        .empty
            .image-add-icon
            br
            .text 点击添加幻灯片
                br
                small 最多添加5张

</template>
<script>
export default {
    props: ['imgs']
}
</script>
<style lang="less" scoped>
.swiper {
    height: 160px;
    .empty {
        padding-top: 47px;
        text-align: center;
        .text {
            padding-top: 5px;
            color: #9da2aa;
            small {
                color: #9da2aa;
            }
            font-size: 14px;
        }
    }
}
</style>
