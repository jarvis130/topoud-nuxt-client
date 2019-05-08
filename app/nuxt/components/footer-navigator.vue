<template lang="pug">
div(style='height: 53px; color: #666;')
    .weui-tabbar.fixed
        router-link.weui-tabbar__item(v-for='(item, path) in routes' :to='path' :key='path')
            .icon.weui-tabbar__icon(:class='`i-${item.icon}${path === $route.path?"_fill":""}`')
            .weui-tabbar__label {{item.name}}
</template>
<script>
import routes from './routes-first'
export default {
    data: () => ({
        routes
    })
}
</script>

<style lang="less" scoped>
.icon:before {
    font-size: 23px;
    line-height: 31px;
}
</style>
