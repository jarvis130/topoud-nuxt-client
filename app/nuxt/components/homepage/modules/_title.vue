<template lang="pug">    
.homepage-module-title(v-if='item.name || item.panelName || !status.view')
    br(v-if='loading')
    template(v-else)
        .homepage-module-title-text(v-if='!controllOnly && (status.adding || !(setting && setting.contentOnly))' :class='{editInList: status.editInList}')
            input(style='width: 100%' v-model='item.panelName' v-if='status.editing' :placeholder='`(${item._panelName || "请填写标题"})`' maxlength='152')
            span(v-else) {{item.name || item.panelName || item._panelName || (status.view ? '' : `(请填写标题)`)}}
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
    props: ['item', 'status', 'loading', 'controllOnly', 'setting'],
    methods: {
        remove() {
            if (!confirm(`确认删除${this.item.panelName || '当前板块'}？`)) {
                return
            }
            this.$emit(`remove`)
        }
    },
    watch: {
        'item.panelName'(to) {
            if (to.length > 15) {
                console.log(to)
                this.item.panelName = this.item.panelName.substr(0, 15)
            }
        }
    }
}
</script>
