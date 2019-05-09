<template lang="pug">
.homepage-template-select
    .weui-panel.tips 选择模板之后，可以直接在模板内对板块进行编辑，#[br]替换图片、移动、删除等操作。#[br]选择模板之后，如果更换模板，会清空数据
    .weui-panel.template-items
        .template-item-container(v-for='item in template.list')
            .template-item(@click='templateSelect(item)' :class='{active: item === template.index}') {{item}}
                .template-item-mask
                .template-item-text 通用模板
                    .check-round
                    transition(name='fade')
                        svg.check-round-checked(v-if='template.index === item' width='11.949', height='11.352', viewBox='0 0 11.949 11.352')
                            path(fill='#fff' d='M28.873,47.476a65.733,65.733,0,0,1,3.771-6.137,35.757,35.757,0,0,1,3.5-4.12l-.405-1.1a30.759,30.759,0,0,0-4.167,3.465,29.558,29.558,0,0,0-3.348,4.232l-2.859-2.6-1.169,1.21,4.679,5.048Z', transform='translate(-24.194 -36.124)')
        .clearFix
    .btn-area(@click='next')
        .topoud-btn(:class='{disabled: !template.index}') 下一步
</template>
<script>
export default {
    head() {
        return { title: '模版选择' }
    },
    data() {
        return {
            template: { list: [1, 2, 3, 4, 5, 6], index: 0 }
        }
    },
    methods: {
        next() {
            if (!this.template.index) return
            this.$router.push({ path: './editor' })
        },
        templateSelect(index) {
            this.template.index = index
        }
    }
}
</script>
<style lang="less" scoped>
.weui-cell > small {
    width: 66px;
    padding-top: 3px;
}
.tips {
    background: #2f3045;
    padding: 10px;
    color: #a6aeb8;
    line-height: 18px;
    font-size: 12px;
    padding: 0 15px 15px 15px;
}
.template-items {
    background: transparent;
    padding: 0 15px;
}
.template-item-container {
    float: left;
    width: 50%;
    &:nth-child(2n) {
        padding-left: 5px;
    }
    &:nth-child(2n + 1) {
        padding-right: 5px;
    }
    padding-bottom: 10px;
    .template-item {
        background: lightblue;
        height: 277px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        &.active {
            border-color: #ffcf82;
        }
        &-mask {
            background: linear-gradient(
                0deg,
                rgba(47, 48, 69, 1) 0%,
                rgba(9, 10, 14, 0) 100%
            );
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 80px;
        }
        &-text {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            line-height: 17px;
            font-size: 12px;
            color: white;
            padding: 0 15px 11px 15px;
            .check-round {
                float: right;
                width: 15px;
                height: 15px;
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 50%;
                opacity: 1;
            }
            .check-round-checked {
                position: absolute;
                right: 16px;
                bottom: 16px;
            }
        }
    }
}
.btn-area {
    padding: 8px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
}
</style>
