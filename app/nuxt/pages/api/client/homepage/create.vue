<template lang="pug">
.container
    nuxt-child(v-if='userChecked')
    .loading-fullscreen(v-else)
        .weui-loading(style='margin-top: -3px;')
        |  加载中
        br
        br
        small USER ASYNC
</template>
<script>
export default {
    data() {
        return {
            userChecked: false
        }
    },
    mounted() {
        this.userChecked = true
        // let { token, userId } = this.$route.query
        // this.$userAsync({ token, userId }).then(_ => {
        //     // if (!_) return
        //     // this.userChecked = true
        // })
    }
}
</script>

<style lang="less">
.homepage-module {
    padding: 10px 15px 15px 15px;
    &-title {
        &-text {
            display: inline-block;
            font-size: 18px;
            line-height: 25px;
            color: #0b0e15;
            &::before {
                display: block;
                position: absolute;
                height: 13px;
                width: 3px;
                left: 0px;
                top: 8px;
                background: #d4a356;
                content: ' ';
                border-radius: 1px;
            }
        }
        position: relative;
        padding-left: 10px;
        padding-bottom: 6px;
        input {
            background: none;
            font-size: 18px;
            line-height: 25px;
            color: #0b0e15;
            width: 200px;
            border: none;
        }
        &-action {
            float: right;
            font-size: 12px;
            line-height: 17px;
            color: #9da2aa;
            margin-top: 8px;
            span + span {
                margin-left: 22px;
            }
            .el-icon-close {
                font-weight: bolder;
                margin-right: 4px;
            }
            .icon {
                margin-right: 4px;
            }
        }
    }
    &-panel {
        background: white;
        border-radius: 4px;
        overflow: hidden;
    }
    &-2 {
        &-left,
        &-right {
            float: left;
            width: 50%;
        }
        &-left {
            padding-right: 7.5px;
        }
        &-right {
            padding-left: 7.5px;
        }
        &:after {
            content: ' ';
            display: block;
            clear: both;
        }
    }
    &-3 {
        &-left,
        &-center,
        &-right {
            float: left;
            width: 33.333%;
        }
        &-left,
        &-center {
            padding-right: 1.5px;
        }
        &-right,
        &-center {
            padding-left: 1.5px;
        }
        &:after {
            content: ' ';
            display: block;
            clear: both;
        }
    }
}
</style>
