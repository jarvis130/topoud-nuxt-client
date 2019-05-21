<template lang="pug">
.homepage-module(v-if='!status.view || (content.productName || setting.titleOnly) || (item.name || item.panelName || setting.contentOnly)')
    //- template(v-if='status.adding || !setting.contentOnly')
    titleModule(v-if='!status.editing' :setting='setting' :item='item' :status='status' :loading='!content' @toTop='$emit(`toTop`, item.sortOrder)' @remove='$emit(`remove`, item.sortOrder)')
    template(v-else-if='!setting.contentOnly')
        .homepage-module-panel.text-panel
            textarea-autosize.text-panel-textarea(:placeholder='item._panelName || "请输入标题"' :min-height='32' rows='1' v-model='item.panelName' maxlength='15')
            .icon.i-edit(v-if='!item.panelName' :style='{left: (15 + ((item._panelName && item._panelName.length) || 5) * 14) + "px"}')
    template(v-if='!setting.titleOnly')
        .homepage-module-panel.text-panel.text-body(v-if='content.productName || !status.view')
            .text-panel-loading(v-if='!content')
                small 加载中 
                .weui-loading
            .text-panel-error(v-else-if='errormsg' @click='contentGet')
                small {{errormsg}}
            template(v-else-if='status.editing')
                textarea-autosize.text-panel-textarea(:class='{bolder: setting.bolder, center: setting.center}' :placeholder='content._productName || "请输入文字描述"' :min-height='90' v-model='content.productName')
            .text-panel-preview.empty(:class='{bolder: setting.bolder, center: setting.center}' v-else-if='!content.productName') {{content._productName || (status.view ? "" : "请输入文字描述")}}
            .text-panel-preview(:class='{bolder: setting.bolder, center: setting.center}' v-else v-html='content.productName && content.productName.replace(\/\\n\/g,`<br\>`)')
            .icon.i-edit(v-if='content && !content.productName && !setting.center && !status.view' :style='{left: (19 + ((content._productName && content._productName.length) || 7) * 14) + "px"}')
        .text-btns(v-if='status.editing')
            .text-btn(@click='setting.bolder = !setting.bolder' :class='{active: setting.bolder}')
                img(src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAEaklEQVR4Xu2cb0xVZRzHP08kL7y4GQqb0IuotVhNZf1BoBKXiYVUTm0GM1ymLkguU2xLRYFCW/Ui58pqrkzn5uakQoKRiDqthfknSxHUoi1cNnoRcoGxtI577riL4NyL5xwOl3Pu87w72/N7dr+f5/v8znnOee5PMKhpmnYfUADMAxKA8YP7uOy6F/gd+Ar4SAhxcaA+EbjQNC0KeAcoAsa5DMKtyrkOvAesF0L8I4P8gDRNux2oBrJvdSSX96sD5gshrgcAbQWKXS7aqLytQojVQtO0B4CzgHSRav8RuAGkSEAfAIWKjC6B7RJQC5CsAOkSaJWAeiLgVm52/nslIM1sdCTEKUDDzLICpABZSwTKQcpBykHWCCgHWeOncpBykHKQNQLKQdb4qRykHOQAB129+gfnzjcb+qUTJsQQGxvLnYkJeDweQ7Ej2XlUltjBhkYWLMo1/bsz0tPIfjqLvNzFxMfHmR7HTKAjAAWExcR4eKN8Iy8vW0pUlPxKZX9zFKAAjrUlxZRv2mA/HfldbDTeKFpdYnok6uuqeezRdNshORaQhCMh2d3CDujkieNMmhTr19nV5aOvrw+fz8fJU2eoqvqS02d+CMrg4oWzJCbK4wP2tbADavu5mfg4/TuThJXz3CKamr7XJVBbU0XmzMftozMWclAoQFL5Z7v2sMq7RhfC5/v3kjVndmQDCpXglYOAbe9/yPoNZbouifgc1Nb2K/OeXUh7+5UhgGY/MYvqL/bZurzk4GFP0sXeQjzj/7/X6rzWyaXLv3Do0GFdAPKJ+mhjPcnJ8jCcvS3sgIzKS5gyhT27PyE19WGjoab6OwrQ0vwlVL65iTsmTjQl1kyQowBJgbMyZ1K06hXmZj1pRq/hGMcBCigsLFjJW5srbN/Vhx3QU3PnEB0dPWRm5Xaj+UILHR1/Bp11b1EBWyorDLvCSEDYAQ33JN3S0krJa+s4dvxbXV0NX9eQnjbDiGZDfcc8IKmmy+cj5cE0XTflvvA8Oz6WxyztaY4AJKUvzs2ntq5+CAV527/U+qM9dMbCg+JwSyygPG/JSxyoqdUF0X2tI7IBydce9099KGjCjmhAf3V2UlZeyac7d+u6ZEbqIzQ26DtrJGwV9hyktxfr6e3B5+vmt/YrNDWdoLtbnlTWbyWrvVSUl44EC90xwg7IijK5af3umyMkJd1lZZiQsY4GVFFWSskar21w5MCOBbRyxTLefXuz+7caRqdfPvese30t+S/m2Q7HEQ5KmT6NyXGTuefuJJ7JySYjI43ocaP3h8hRWWJGXTKW+itAw8yGAqQAWVuwykHKQcpB1ggoB1njp3KQcpBykDUCykHW+KnCAqH5+QsLqNIUwSH5S1Oo4ibBAW2TgGR5nJ+A26ytVtdF/wtMCxRY2gEsd51Ea4K2CyFeDQCSxysOApnWxnRNdIMsVyaEuDGwyJusQLWlv1TX0PMortEeUsjf/UXeSiUc/zvpwd01Tbu3vyJVTgSWCZTL6vJAJjcBUQd1g/pAeQUAAAAASUVORK5CYII=')
            .text-btn(@click='setting.center = false' :class='{active: !setting.center}')
                img(src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAACMklEQVR4Xu2cvUpkQRBGT6lrsAhmBuaiICy+gbka+BAmroiYirGByYrgIPgUghjoS4iJu2y+gZmwGvjX0sNcnR38W6vn0vZ8N7twq7l1+lR1R2V0PCGEcWARmAVGga+d3xT2fgX8AQ6AXTP71Z6fVS8hhH5gE1gGvhQG4b3p3AA/gDUzu4tBTUAhhAFgH5h570qFf3cIzJvZTQVoC1gpPOn/TW/LzFYthDAJnADRIj1PBG6BqQhoB/guMs8SaERAZ8CEAD1L4GcEdNkDR/lH9/8qAgofje6FOAF6Y5cFSIB8jUAGySAZ5CMgg3z81INkkAzyEZBBPn7qQTIoM4OGhkd8f+SM/ntx7lzh3/DkJSZAb+yPAAlQ0hL+9Isl70GfnkhHAgKke5DP6eQGeU+x1PcYHx4QoLpLTAZ1+R5UfIl5az63+OQ9KLcEvf8jQHU3ae+O5Raf3CDvKeYFlLrJC1DdJSaDunwPKr7EvAnmFp+8B+WWoPd/BKjuJu3dsdzikxvkPcVS32O8wAWo7hKTQV2+BxVfYt6azy0+eQ/KLUHv/whQ3U3au2O5xcsgGeRzUgbJIBnkIyCDfPzUg2SQDPIRkEE+fhos8Dq/5mABjaZ4GVJzNIWGm7wMaLsaj3MK9Pmqtbjoe+BbNWBpD1goLkVfQg0zW6oADQJHwLRvzWKij+O4MjO7bR/yFidQbbRGdUVgvfhct4a8rUc4EcAjoIpGCGGsNZFqrgfHBMay+t1uxgO5mmp0XdiOEAAAAABJRU5ErkJggg==')
            .text-btn(@click='setting.center = true'  :class='{active: setting.center}')
                img(src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAACN0lEQVR4Xu2csU5UQRSGv6NgQUzoKOiNJibGN7BHCh7CBo0xtsbawkZiwsaEpyAhFPAShAYIvQUdCVIIOmQ2e2XZLA5wZm+Guf90N3PPZM43/zkz1W+MjBDCU2AZeA3MAzOj/1T2fQr8BDaAH2Z2MJyfNR8hhIfAV+A9MF0ZhJumcwZ8Az6Z2Z8Y1AcUQpgC1oGFm65U+X+bwJKZnTWAVoAPlSd92/RWzOyjhRCeAztAVJHGJYFz4GUEtAq8FZmxBHoR0B7wTIDGEtiPgH514Cq/6/mfRkDhrtFdiBOgxCkLkAD5GoEUJAVJQT4CUpCPn3qQFCQF+QhIQT5+6kFSUGEKejw759uRM/rk+Mi5wtXw7CUmQInzESABylrC936x7D3o3hMZSUCA9A7yabp1BXlvudzvnBQ+ASqtxKSgCb+Tqi+xVM2XNt96DyoNQGo/AlRak06dWGnz2RXkvaW8gHI3cQFqu8SkoAm/c6ovMW+CpcVn70GlJejdjwC13aS9J1ZafOsK8t5yud85qQMRoNJKTAqa8Dup+hJL1Xxp8633oNIApPYjQKU16dSJlTYvBUlBPk1KQVKQFOQjIAX5+KkHSUFSkI+AFOTjJ2OB//PrGwvImuJ6SH1rCpmbXA/oe2OPsws88FVrddF/gReNwdIa8Ka6FH0J9czsXQPoEbAFvPKtWU30drQrM7PzYZO36ED1ZWDVFYF1cfwemLx9jnAigH+AGhohhCcDR6rFDtoExrI6HFbGBbltanROWVWhAAAAAElFTkSuQmCC')
    .hidden {{remark}}
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
    props: ['item', 'status', 'templateId'],
    data() {
        return {
            content: false,
            errormsg: false,
            setting: {
                inited: false,
                center: false,
                bolder: false,
                titleOnly: false,
                contentOnly: false
            }
        }
    },
    mounted() {
        if (this.item._content || this.item.panelContents) {
            this.content = this.item._content[0] || this.item.panelContents[0]
        } else {
            this.contentGet()
        }
    },
    computed: {
        remark() {
            if (!this.content) return
            let {
                    inited,
                    center,
                    bolder,
                    titleOnly,
                    contentOnly
                } = this.setting,
                remark0 = []
            if (inited) {
                if (center) remark0.push('center')
                if (bolder) remark0.push('bolder')
                if (titleOnly) remark0.push('titleOnly')
                if (contentOnly) remark0.push('contentOnly')
                this.item.remark = remark0 = remark0.join(';')
            } else {
                this.item.remark = this.item.remark || ''
                this.setting.inited = true
                this.setting.center = this.item.remark.indexOf('center') >= 0
                this.setting.bolder = this.item.remark.indexOf('bolder') >= 0
                this.setting.titleOnly =
                    this.item.remark.indexOf('titleOnly') >= 0
                this.setting.contentOnly =
                    this.item.remark.indexOf('contentOnly') >= 0
            }
            return remark0
        }
    },
    methods: {
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            let { templateId } = this
            this.$axios('/template/getPanelContentList', {
                params: { panelId, terminal: 1, templateId }
            })
                .then(({ data: { success, result: content, message } }) => {
                    if (!success) throw Error(message)
                    // console.log(content)
                    if (content && content.length) {
                        this.item._content = content
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
            if (this.inited) {
                this.$nuxt.error({ message: '数据初始化出错' })
                return
            }
            this.inited = true
            let { panelId } = this.item
            let { templateId } = this
            this.$axios
                .post('/template/savePanelContent', {
                    panelId,
                    type: 1,
                    templateId,
                    terminal: 1
                })
                .then(_ => {
                    this.contentGet()
                })
        }
    },
    watch: {
        'item.panelName'(to) {
            if (to.length > 15) {
                let text = this.item.panelName.substr(0, 15)
                // this.item.panelName = ''
                console.log(to, text)
                this.item.panelName = text
            }
        }
    }
}
</script>

<style lang="less" scoped>
.text-panel {
    &.text-body {
        min-height: 103px;
    }
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
    & + .text-panel {
        margin-top: 15px;
    }
}
.text-panel-textarea,
.text-panel-preview {
    padding: 5px 6px;
    font-size: 14px;
    line-height: 20px;
    &.empty {
        color: #ccc;
    }
    &.center {
        text-align: center;
    }
    &.bolder {
        font-weight: bolder;
    }
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
    // left: 117px;
    top: 15px;
}
.text-btn {
    img {
        width: 36px;
        height: 36px;
    }
    opacity: 0.6;
    &.active {
        opacity: 1;
    }
    margin-top: 15px;
    display: inline-block;
    & + .text-btn {
        margin-left: 15px;
    }
}
</style>
