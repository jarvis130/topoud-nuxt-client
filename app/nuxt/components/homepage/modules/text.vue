<template lang="pug">
.homepage-module
    titleModule(:item='item' :status='status' :loading='!content')
    .homepage-module-panel.text-panel
        .text-panel-loading(v-if='!content')
            small 加载中 
            .weui-loading
        .text-panel-error(v-else-if='errormsg' @click='contentGet')
            small {{errormsg}}
        template(v-else-if='status.editing')
            textarea-autosize.text-panel-textarea(placeholder='请输入文字描述' :min-height='90' v-model='content.product_name')
            .icon.i-edit(v-if='!content.product_name')
        .text-panel-preview(v-else v-html='content.product_name.replace(\/\\n\/g,`<br\>`)')
</template>
<script>
import titleModule from './_title'

import Vue from 'vue'
import textareaAutoSize from 'vue-textarea-autosize'
if (process.browser) {
    Vue.use(textareaAutoSize)
}

export default {
    components: { titleModule },
    props: ['item', 'status'],
    data() {
        return {
            content: false,
            errormsg: false
        }
    },
    mounted() {
        this.contentGet()
    },
    methods: {
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            this.$axios('/template/getPanelContentList', {
                params: { panelId }
            })
                .then(({ data: { success, result: content, message } }) => {
                    if (!success) throw Error(message)
                    if (content && content.length) {
                        this.content = content[0]
                    } else {
                        this.contentInit()
                    }
                })
                .catch(({ message }) => {
                    this.errormsg = message
                })
        },
        contentInit() {
            let panelId = this.item.panelId
            this.$axios
                .post('/template/savePanelContent', { panelId, type: 1 })
                .then(_ => {
                    this.contentGet()
                })
        }
    }
}
</script>

<style lang="less" scoped>
.text-panel {
    min-height: 103px;
    padding: 5px;
    line-height: 1;
    position: relative;
    &-loading {
        height: 103px;
        line-height: 103px;
        text-align: center;
        vertical-align: middle;
    }
    &-error {
        padding: 10px;
        line-height: 1.4;
        text-align: center;
        vertical-align: middle;
        small {
            color: crimson;
        }
    }
}
.text-panel-textarea,
.text-panel-preview {
    padding: 5px 6px;
    font-size: 14px;
    line-height: 20px;
}
.text-panel-textarea {
    background: #fafafa;
    width: 100%;
    border: none;
}
.i-edit {
    color: #ddd;
    font-size: 11px;
    width: 11px;
    height: 11px;
    position: absolute;
    left: 117px;
    top: 15px;
}
</style>
