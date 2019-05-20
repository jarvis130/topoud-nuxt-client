<template lang="pug">
.container
    br
    br
    swiperModule( v-if='item.type === `6`' :item='item' :status='status')
    textModule(   v-else-if='item.type === `1`' :item='item' :status='status')
    imageModule(  v-else-if='item.type === `8`' :item='item' :status='status' )
    .button-update
        .topoud-btn(@click='goBack()') 完成
</template>
<script>
import swiperModule from '~/components/homepage/modules/swiper'
import textModule from '~/components/homepage/modules/text'
import imageModule from '~/components/homepage/modules/image'
export default {
    components: {
        swiperModule,
        textModule,
        imageModule
    },
    data() {
        return {
            item: false,
            status: { editing: true }
        }
    },
    mounted() {
        if (!window.__homepageCreatePanelList || !this.$route.query.sortOrder) {
            this.goBack()
        } else {
            let { sortOrder } = this.$route.query
            this.item = window.__homepageCreatePanelList[sortOrder]
            if (!this.item) return this.goBack()
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
            // this.$router.replace('./panel-list')
        }
    },
    head() {
        return { title: '编辑模块' }
    }
}
</script>
<style lang="less" scoped>
.button-update {
    background: white;
    padding: 8px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    .topoud-btn {
        display: block;
    }
}
</style>
