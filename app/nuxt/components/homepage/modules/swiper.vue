<template lang="pug">
.homepage-module
    titleModule(:item='item' :status='status' :loading='!content' :controllOnly='true' @toTop='$emit(`toTop`, item.sortOrder)')
    template(v-if='item.imgs && item.imgs.length')
        .homepage-module-panel.swiper
            .swiper-container(v-swiper:imgsSwiper='swiperOption')
                .swiper-wrapper
                    .swiper-slide(v-for='img in item.imgs' :key='img')
                        img(:src='img')
                .swiper-pagination.swiper-pagination-white
        .controll(v-if='status.editing')
            span.image-item-sort(v-sortable="{onUpdate: itemSortUpdate}")
                .image-item(v-for='img in item.imgs')
                    img(:src='img')
            uploaderModule(:size='[345, 160]' @preview='add' v-if='item.imgs.length < 5').image-add
                .image-add-icon
    uploaderModule(:size='[345, 160]' @preview='add' v-else)
        .homepage-module-panel.swiper
            .empty
                .image-add-icon
                br
                .text 点击添加幻灯片
                    br
                    small 最多添加5张

</template>
<script>
import titleModule from './_title'
import uploaderModule from '~/components/uploader/homepage'
export default {
    data() {
        return {
            content: true,
            swiperOption: {
                animation: 150,
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    props: ['imgs', 'item', 'status'],
    components: {
        uploaderModule,
        titleModule
    },
    methods: {
        add(url) {
            if (!this.item.imgs) this.$set(this.item, 'imgs', [])
            if (this.item.imgs.length >= 5) {
                return this.$message.error('最多添加5张')
            }
            this.item.imgs.push(url)
        },
        itemSortUpdate(e) {
            let { oldIndex, newIndex } = e
            let { imgs } = this.item
            let img = imgs[oldIndex]
            imgs.splice(oldIndex, 1)
            imgs.splice(newIndex, 0, img)
        }
    }
}
</script>
<style lang="less" scoped>
.swiper {
    height: 160px;
    .empty {
        .image-add-icon {
            margin-top: 47px;
        }
        text-align: center;
        .text {
            padding-top: 5px;
            color: #9da2aa;
            small {
                color: #9da2aa;
            }
            font-size: 14px;
        }
    }
    &-container {
        .swiper-slide {
            img {
                height: 160px;
                width: 100%;
            }
        }
    }
}
.controll {
    padding-top: 5px;
    .image-item,
    .image-add {
        height: 40px;
        width: 40px;
        display: inline-block;
        margin-right: 3px;
        border: 1px solid #ccc;
        text-align: center;
        overflow: hidden;
        border-radius: 4px;
    }
    .image-item {
        position: relative;
        img {
            height: 40px;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
    .image-add {
        padding-top: 9px;
    }
}
</style>
