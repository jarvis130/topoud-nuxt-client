<template lang="pug">
.homepage-module
    titleModule(:item='item' :status='status' :loading='!content' :controllOnly='true' @toTop='$emit(`toTop`, item.sortOrder)'  @remove='$emit(`remove`, item.sortOrder)')
    template(v-if='content && content.length')
        .homepage-module-panel.swiper
            .swiper-container(v-swiper:imgsSwiper='swiperOption')
                .swiper-wrapper
                    .swiper-slide(v-for='img in content')
                        .loading(v-if='img._picUrl && !img.picUrl') 上传中，请稍后 
                            .weui-loading
                        img(:src='img._picUrl || img.picUrl')
                .swiper-pagination.swiper-pagination-white
        .controll(v-if='status.editing')
            span.image-item-sort(v-sortable="{onUpdate: itemSortUpdate}")
                .image-item(v-for='(img, index) in content')
                    .loading(v-if='img._picUrl && !img.picUrl')
                        .weui-loading
                    img(:src='img._picUrl || img.picUrl')
                    .image-item-remove(@click.stop.capture='remove(index)') 删除
            uploaderModule(:size='[345, 160]' @upload='add' v-if='content.length < 5').image-add
                .image-add-icon
    uploaderModule(:size='[345, 160]' @upload='add' v-else)
        .homepage-module-panel.swiper
            .empty
                .image-add-icon
                br
                .text 点击添加幻灯片
                    br
                    small 最多添加5张
    small(v-if='status.editing') 请等待图片上传后再点击完成
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
    mounted() {
        if (this.item._content) {
            this.content = this.item._content
        } else {
            this.contentGet()
        }
    },
    props: ['item', 'status'],
    components: {
        uploaderModule,
        titleModule
    },
    methods: {
        add({ value, type, hash: _hash }) {
            if (this.content.length >= 5) {
                return this.$message.error('最多添加5张')
            }
            let _picUrl = type === 'preview' ? value : undefined,
                picUrl = type === 'uploaded' ? value : undefined
            for (let i in this.content) {
                if (this.content[i]._hash === _hash) {
                    this.$set(this.content[i], 'picUrl', picUrl)
                    return
                }
            }
            this.content.push({ _picUrl, picUrl, _hash })
        },
        remove(index) {
            if (!confirm('确认删除？')) return
            let item = this.content[index]
            this.content.splice(index, 1)
            window.__removingListContent.push(item)
        },
        itemSortUpdate(e) {
            let { oldIndex, newIndex } = e
            let imgs = this.content
            let img = imgs[oldIndex]
            imgs.splice(oldIndex, 1)
            imgs.splice(newIndex, 0, img)
        },
        contentGet() {
            this.errormsg = false
            let panelId = this.item.panelId
            if (!panelId) {
                this.item._content = this.content = []
                return
            }
            this.$axios('/template/getPanelContentList', {
                params: { panelId }
            })
                .then(({ data: { success, result: content, message } }) => {
                    if (!success) throw Error(message)
                    this.item._content = this.content = content
                })
                .catch(({ message }) => {
                    this.errormsg = message
                })
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
            .loading {
                text-align: center;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                vertical-align: middle;
                padding-top: 60px;
                color: white;
                font-weight: 200;
                font-size: 12px;
                .weui-loading {
                    margin-left: 5px;
                }
            }
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
        position: absolute;
        .loading {
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            vertical-align: middle;
            padding-top: 8px;
            font-weight: 200;
            font-size: 12px;
            z-index: 40;
        }
    }
    .image-item {
        position: relative;
        img {
            height: 40px;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
        }
        height: 60px;
        &-remove {
            color: crimson;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            vertical-align: middle;
            height: 20px;
            font-weight: 300;
            margin-top: 40px;
            background: white;
        }
    }
    .image-add {
        padding-top: 9px;
    }
}
</style>
