const router = require('express').Router()
const redisClient = require('../redis')
const axios = require('axios')
const key = require('../../../token').qqmapServer
router.get('/client/api/location-info', (req, res, next) => {
    let { location } = req.query
    if (!location || !/^(\d|\.)+\,(\d|\.)+$/.test(location)) {
        return res.status(500).send({ message: 'locaction invalid' })
    }
    let url = `https://apis.map.qq.com/ws/geocoder/v1`
    return axios(url, { params: { location, key } }).then(({ data }) => {
        res.json(data)
    })
    // return redisClient
    //     .setAsync(`client_location_hash_${hash}`, value, 'EX', 10)
    //     .then(_ => {
    //         res.send({ success: true })
    //     })
    //     .catch(({ message }) => {
    //         res.status(500), send({ message })
    //     })
})

module.exports = router
