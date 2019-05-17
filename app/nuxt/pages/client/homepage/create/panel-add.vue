<template lang="pug">
.container
    .cate-title
        .cate-title-item(v-for='(cate, index) in typesAll' :class='{active: index === cateActiveIndex}' :key='cate.cate' @click='cateActiveIndex = index') {{cate.cate}}
    div(v-for='item in cateActive.list' @click.stop.capture.prevent='add(item)')
        swiperModule( v-if='item.type === `6`' :item='item' :status='status')
        textModule(   v-else-if='item.type === `1`' :item='item' :status='status')
        imageModule(  v-else-if='item.type === `8`' :item='item' :status='status')
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
import { typesAll } from './panel-config'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule
    },
    head() {
        return { title: '添加模块' }
    },
    data() {
        return {
            status: {
                adding: true
            },
            cateActiveIndex: 0,
            typesAll
        }
    },
    computed: {
        cateActive() {
            return this.typesAll[this.cateActiveIndex]
        }
    },
    mounted() {
        if (!window.__homepageCreatePanelList) {
            this.goBack()
        }
    },
    methods: {
        add(item) {
            let newItem = JSON.parse(JSON.stringify(item))
            window.__homepageCreatePanelList.unshift(newItem)
            this.$router.replace('./panel-edit?sortOrder=0')
        },
        goBack() {
            this.$router.replace('./panel-list')
        }
    }
}
</script>
<style lang="less" scoped>
.cate-title {
    margin: 20px 15px;
    &-item {
        line-height: 25px;
        color: #979da5;
        font-size: 18px;
        padding-bottom: 2px;
        display: inline-block;
        & + .cate-title-item {
            margin-left: 23px;
        }
        &.active {
            color: black;
            border-bottom: solid 4px #c6a682;
        }
        cursor: pointer;
    }
}
</style>
