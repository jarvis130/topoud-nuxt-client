/*
 * @Author: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Date: 2019-05-08 15:03:57
 * @Last Modified by: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Last Modified time: 2019-05-08 15:04:19
 *
 * 单页应用返回原位
 *
 */

export default {
    data() {
        return {
            pageScrollParts: [],
            pageScrollIndex: 0,
            pageScrollString: false,
            pageScrollStorer: false,
            pageScrollDoing: false
        }
    },
    beforeDestroy() {
        this.pageScrollPositionActionClean()
    },
    mounted() {
        this.pageScrollPositionInit()
    },
    methods: {
        pageScrollPositionInit() {
            this.pageScrollString = this.$route.fullPath
            this.pageScrollStorer = window.localStorage || window
            let height = parseInt(this.pageScrollStorer[this.pageScrollString])
            height &&
                this.$nextTick(_ => {
                    window.scrollTo(0, height)
                })
            setTimeout(_ => {
                if (this._isBeingDestroyed) return
                window.addEventListener('scroll', this.pageScrollPositionAction)
            }, 300)
        },
        pageScrollPositionActionClean() {
            window.removeEventListener('scroll', this.pageScrollPositionAction)
        },
        pageScrollPositionAction() {
            if (this.pageScrollDoing) return
            this.pageScrollDoing = true
            setTimeout(_ => {
                if (this._isBeingDestroyed) return
                this.pageScrollStorer[this.pageScrollString] = window.scrollY
                this.pageScrollDoing = false
            }, 300)
        }
    }
}
