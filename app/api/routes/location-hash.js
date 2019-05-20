const router = require('express').Router()
const redisClient = require('../redis')

router.post(
    '/client/my/homepage/create/location-hash-set',
    (req, res, next) => {
        let { hash, value } = req.body
        if (!hash || hash.length < 32) {
            res.status(500).send({ message: 'hash invalid' })
            return
        }
        if (!value || !/^(\d|\.)+\,(\d|\.)+/.test(value)) {
            return res.status(500).send({ message: 'value invalid' })
        }
        return redisClient
            .setAsync(`client_location_hash_${hash}`, value, 'EX', 10)
            .then(_ => {
                res.send({ success: true })
            })
            .catch(({ message }) => {
                res.status(500), send({ message })
            })
    }
)
router.get('/client/my/homepage/create/location-hash-get', (req, res, next) => {
    let { hash } = req.query
    if (!hash || hash.length < 32) {
        res.status(500).send({ message: 'hash invalid' })
        return
    }
    return redisClient
        .getAsync(`client_location_hash_${hash}`)
        .then(result => {
            res.send({ success: true, result })
        })
        .catch(({ message }) => {
            res.status(500), send({ message })
        })
})

module.exports = router
