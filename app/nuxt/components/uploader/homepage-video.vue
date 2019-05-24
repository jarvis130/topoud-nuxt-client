<template lang="pug">
div
    slot(v-if='$route.params.storeId')
    el-upload(
        v-else
        action='nothing'
        :show-file-list='false'
        :on-change='uploadChange'
        :before-upload='uploadBefore'
        :with-credentials='true'
        :limit='1'
        accept='video/*'
        :full='true'
        )
        slot
</template>
<script>
if (process.browser) window.HELP_IMPROVE_VIDEOJS = false
export default {
    props: { size: { default: [375, 375] } },
    data() {
        return {
            cropperActive: false,
            fileBlob: false,
            headers: {},
            file: false,
            hash: false
        }
    },
    mounted() {
        this.headers = this.$axios.lastRequestHeader
    },
    methods: {
        uploadChange(file, fileList) {
            this.fileBlob = file.url
        },
        uploadBefore(file) {
            if (!/^video/.test(file.type)) {
                this.$toast.error('类型必须为视频')
                return false
            }
            let v = document.createElement('video')
            v.src = URL.createObjectURL(file)
            this.$toast('检查视频')
            setTimeout(_ => {
                this.$toast.close()
                let duration = v.duration
                // v.destroy()
                if (duration > 30) {
                    this.$toast.error({
                        message: '不能超过30秒',
                        duration: 3
                    })
                    return
                }
                this.videoUpload(file)
            }, 500)
            return false
        },
        videoUpload(file) {
            // let file = this.fileBlob
            this.$toast('上传中')
            let data = new FormData()
            data.append('file', file)
            this.$axios
                .post('/common/imageUpload', data)
                .then(
                    ({
                        data: {
                            success,
                            result: { image_uri: url },
                            message
                        }
                    }) => {
                        if (!success) throw Error(message)
                        this.$toast.success('上传完成')
                        this.$emit(`upload`, {
                            type: 'uploaded',
                            value: url
                        })
                    }
                )
                .catch(({ message }) => {
                    this.$toast.close()
                    this.$message.error(message)
                })
                .then(_ => {
                    this.cropperActive = false
                })
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
