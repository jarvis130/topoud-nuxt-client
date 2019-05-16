<template lang="pug">    
.homepage-module-title
    br(v-if='loading')
    template(v-else)
        input(v-model='item.itemName' v-if='status.editing' placeholder='(请填写标题)')
        span(v-else) {{item.itemName || `(请填写标题)`}}
        .homepage-module-title-action(v-if='status.editing')
            span
                .icon.i-totop
                | 置顶
            span
                .el-icon-close
                | 删除
</template>
<script>
export default {
    props: ['item', 'status', 'loading']
}
</script>
