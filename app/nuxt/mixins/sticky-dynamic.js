/*
 * @Author: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Date: 2019-05-08 15:04:41
 * @Last Modified by: 刘盾 Liudun (liudun@beclon.com)(bach109109@qq.com)(liudun@zbj.com)
 * @Last Modified time: 2019-05-08 15:05:03
 *
 * 动态决定是否需要sticky位置
 *
 */

const stickyCreate = ({ height, containerSelector }) => {
    const sticky = {
        mounted() {
            this.stickySwitch()
            window.addEventListener('resize', this.stickySwitch)
        },
        activated() {
            window.addEventListener('resize', this.stickySwitch)
        },
        deactivated() {
            window.removeEventListener('resize', this.stickySwitch)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.stickySwitch)
        },
        methods: {
            stickySwitch() {
                if (window.innerHeight > height && !this.stickyDynamic) {
                    this.stickyDynamic = {
                        containerSelector
                    }
                }
                if (window.innerHeight <= height && this.stickyDynamic) {
                    this.stickyDynamic = false
                }
            }
        },
        data() {
            return {
                stickyDynamic: true
            }
        }
    }
    return sticky
}
module.exports = stickyCreate
