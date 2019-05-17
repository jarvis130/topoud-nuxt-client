<template lang="pug">    
.homepage-module-title
    br(v-if='loading')
    template(v-else)
        .homepage-module-title-text(v-if='!controllOnly')
            input(v-model='item.panelName' v-if='status.editing' placeholder='(请填写标题)')
            span(v-else) {{item.panelName || `(请填写标题)`}}
        .homepage-module-title-action(v-if='status.editInList')
            span(@click.stop.prevent='$emit(`toTop`)' v-if='item.sortOrder && item.sortOrder > 0')
                .icon.i-totop
                | 上移
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
            if (!confirm(`确认删除${this.item.panelName || '当前板块'}？`)) {
                return
            }
            this.$emit(`remove`)
        }
    }
}
</script>
