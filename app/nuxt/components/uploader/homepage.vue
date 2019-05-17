<template lang="pug">
el-upload(
    action='http://test.topoud.com/api/common/uploadCompressImage'
    :show-file-list='false'
    :on-change='uploadChange'
    :on-preview='uploadPreview'
    :with-credentials='true'
    :limit='1'
    :http-request='uploadRequest'
    )
    div
        slot
        .copper-container(v-if='cropperActive')
            vueCropper(
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox='true'
            )
            .btn-area
                .left(@click.stop='cropperCancel')
                    .topoud-btn.plain 取消
                .right(@click.stop='cropperComfirm')
                    .topoud-btn 上传

</template>
<script>
import Vue from 'vue'
if (process.browser) {
    let vueCropper = require('vue-cropper')
    Vue.use(vueCropper.default)
}
export default {
    props: { size: { default: [165, 165] } },
    data() {
        return {
            cropperActive: false,
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 1, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: this.size[0], // 默认生成截图框宽度
                autoCropHeight: this.size[1], // 默认生成截图框高度
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: this.size // 截图框的宽高比例
            },
            headers: {},
            file: false
        }
    },
    mounted() {
        this.headers = this.$axios.lastRequestHeader
    },
    methods: {
        uploadPreview(file) {
            console.log('preview', file)
            // return
            // this.$emit(`preview`, url)
        },
        uploadChange(file, fileList) {
            console.log('change', file, fileList)
            // return
            // this.$emit(`preview`, file.url)
            if (this.option.img === file.url) return
            this.cropperActive = true
            this.option.img = file.url
        },
        // uploadBefore(file, e2) {
        //     console.log('before', file, e2)
        //     // return file
        //     return new Promise((resolve, reject) => {})
        // },
        cropperComfirm() {
            this.$refs.cropper.getCropData(data => {
                // console.log(data)
                this.$emit(`preview`, data)
                this.cropperCancel()
            })
        },
        cropperCancel() {
            this.cropperActive = false
            this.option.img = false
        },
        uploadRequest() {
            // let file = this.file
            // alert('upload start')
            // this.$axios
            //     .post('/common/uploadCompressImage', { file })
            //     .then(
            //         ({
            //             data: {
            //                 success,
            //                 result: { image_uri },
            //                 message
            //             }
            //         }) => {
            //             if (!success) throw Error('result')
            //             console.log(image_uri)
            //         }
            //     )
            //     .catch(({ message }) => {
            //         this.$message.error(message)
            //     })
        }
    }
}
</script>
<style lang="less" scoped>
.copper-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    .btn-area {
        position: fixed;
        bottom: 0;
        background: white;
        left: 0;
        right: 0;
        padding: 15px;
        .left,
        .right {
            float: left;
            width: 50%;
        }
        .left {
            padding-right: 7.5px;
        }
        .right {
            padding-left: 7.5px;
        }
    }
}
</style>
