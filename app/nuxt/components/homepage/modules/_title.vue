<template lang="pug">    
.homepage-module-title
    br(v-if='loading')
    template(v-else)
        .homepage-module-title-text(v-if='!controllOnly')
            input(v-model='item.panelName' v-if='status.editing' placeholder='(请填写标题)')
            span(v-else) {{item.panelName || `(请填写标题)`}}
        .homepage-module-title-action(v-if='status.editInList')
            span
                .icon.i-totop(@@click.stop.prevent='$emit(`toTop`)')
                | 置顶
            span(@click.stop.prevent='remove')
                .el-icon-close
                | 删除
    .clearfix
</template>
<script>
export default {
    props: ['item', 'status', 'loading', 'controllOnly'],
    methods: {
        remove() {
            if (!confirm(`确认删除${this.item.panelName || '当前模块'}?`)) {
                return
            }
            this.$set(this.item, `_removing`, true)
        }
    }
}
</script>
