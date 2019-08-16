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
        accept='image/*'
        :full='true'
        )
        slot
</template>
<script>
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
            if (!/^image/.test(file.type)) {
                this.$toast.error('类型必须为图片')
                return false
            }
            this.imageUpload(file)
            return false
        },
        imageUpload(file) {
            // let file = this.fileBlob
            this.$toast('上传中')
            let data = new FormData()
            data.append('file', file)
            this.$axios
                .post('/common/imageUpload', data, {
                    onUploadProgress: progressEvent => {
                        var complete =
                            (((progressEvent.loaded / progressEvent.total) *
                                100) |
                                0) +
                            '%'
                        this.$toast(`上传中(${complete})`)
                    }
                })
                .then(
                    ({
                        data: {
                            success,
                            result: { image_uri: url },
                            message
                        }
                    }) => {
                        if (!success) throw Error(message)
                        let hash = Math.random()
                        this.$toast.success('上传完成')
                        this.$emit(`upload`, {
                            type: 'uploaded',
                            value: url,
                            hash
                        })
                    }
                )
                .catch(({ message }) => {
                    this.$toast.close()
                    this.$message.error(message)
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
