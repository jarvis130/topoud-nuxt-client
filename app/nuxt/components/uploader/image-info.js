function getImageInfo(url) {
    return new Promise(function(resolve, reject) {
        // // #ifdef APP-PLUS
        // plus.io.getImageInfo({
        //     src: url,
        //     success: function(image) {
        //         resolve(image)
        //     },
        //     fail: function(err) {
        //         console.log('getImageInfoErr: ' + JSON.stringify(err))
        //         reject(err)
        //     }
        // })
        // // #endif
        // // #ifdef MP-WEIXIN
        // uni.getImageInfo({
        //     src: url,
        //     success: function(image) {
        //         resolve(image)
        //     },
        //     fail: function(err) {
        //         console.log('getImageInfoErr: ' + JSON.stringify(err))
        //         reject(err)
        //     }
        // })
        // // #endif

        // #ifdef H5
        let image = new Image()
        image.src = url
        image.onload = function(d) {
            let imgSelf = this
            let http = new XMLHttpRequest()
            http.open('GET', url, true)
            http.responseType = 'blob'
            http.onload = function(e) {
                let httpSelf = this
                if (httpSelf.status == 200 || httpSelf.status === 0) {
                    let reader = new FileReader()
                    reader.onload = function(e) {
                        let view = new DataView(this.result)
                        if (view.getUint16(0, false) != 0xffd8) {
                            resolve({
                                size: httpSelf.response.size,
                                type: httpSelf.response.type,
                                width: imgSelf.width,
                                height: imgSelf.height,
                                orientation: -1
                            })
                            return
                        }

                        let length = view.byteLength,
                            offset = 2
                        while (offset < length) {
                            let marker = view.getUint16(offset, false)
                            offset += 2
                            if (marker == 0xffe1) {
                                if (
                                    view.getUint32((offset += 2), false) !=
                                    0x45786966
                                ) {
                                    resolve({
                                        size: httpSelf.response.size,
                                        type: httpSelf.response.type,
                                        width: imgSelf.width,
                                        height: imgSelf.height,
                                        orientation: -1
                                    })
                                    return
                                }
                                let little =
                                    view.getUint16((offset += 6), false) ==
                                    0x4949
                                offset += view.getUint32(offset + 4, little)
                                let tags = view.getUint16(offset, little)
                                offset += 2
                                for (let i = 0; i < tags; i++)
                                    if (
                                        view.getUint16(
                                            offset + i * 12,
                                            little
                                        ) == 0x0112
                                    ) {
                                        resolve({
                                            size: httpSelf.response.size,
                                            type: httpSelf.response.type,
                                            width: imgSelf.width,
                                            height: imgSelf.height,
                                            orientation: view.getUint16(
                                                offset + i * 12 + 8,
                                                little
                                            )
                                        })
                                        return
                                    }
                            } else if ((marker & 0xff00) != 0xff00) break
                            else offset += view.getUint16(offset, false)
                        }
                        resolve({
                            size: httpSelf.response.size,
                            type: httpSelf.response.type,
                            width: imgSelf.width,
                            height: imgSelf.height,
                            orientation: -1
                        })
                    }
                    reader.readAsArrayBuffer(httpSelf.response)
                }
            }
            http.send()
        }
        // #endif
    })
}

function getRotate(ot) {
    let rotate = 0
    if (ot == 3 || ot == 'down') {
        rotate = 180
    } else if (ot == 6 || ot == 'right') {
        rotate = 90
    } else if (ot == 8 || ot == 'left') {
        rotate = -90
    }
    return rotate
}

module.exports = { getImageInfo, getRotate }
