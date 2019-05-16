<template lang="pug">
.container
    .cate-title
        .cate-title-item(v-for='cate in typesAll' :key='cate.cate') {{cate.cate}}
</template>
<script>
import { typesAll } from './panel-config'
export default {
    head() {
        return { title: '添加模块' }
    },
    data() {
        return {
            typesAll
        }
    }
}
</script>
<style lang="less" scoped>
.cate-title {
}
</style>
