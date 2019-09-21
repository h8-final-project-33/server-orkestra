const redis     = require('redis')
const client    = redis.createClient()
const axios     = require('axios')
const url       = `http://localhost:3001/images/`

class ImageController {
    static findAll (req, res, next) { 
        client.get('images', function (err, reply) {
            if (!reply) {
                axios.get(url)
                .then(({ data }) => {
                    res.status(200).json({ data })
                    client.set('images', JSON.stringify({ data }, null, 2), 'EX', 60)
                })
                .catch(next)
            }
            else {
                res.send(JSON.parse(reply))
            }
        })
    }

    static findOne (req, res, next) {
        client.get('image', function (err, reply) {
            if (!reply) {
                axios.get(`${url}${req.params.id}`)
                .then(({ data }) => {
                    res.status(200).json({ data })
                    client.set('image', JSON.stringify({ data }, null, 2), 'EX', 60)
                })
                .catch(next)
            }
            else {
                res.send(JSON.parse(reply))
            }
        })
    }

    static create (req, res, next) {
        const { image} = req.body
        axios.post(url, { image})
        .then(({ data }) => {
            res.status(201).json({ data })
            return axios.get(url)
        })
        .then(({ data }) => {
            client.set('images', JSON.stringify({ data }, null, 2), 'EX', 60) 
        })
        .catch(next)
    }

    static update (req, res, next) {
        axios.patch((`${url}${req.params.id}`), (req.body))
        .then(({ data }) => {
            res.status(200).json({ data })
            return axios.get(url)
        })
        .then(({ data }) => {
            client.set('images', JSON.stringify({ data }, null, 2), 'EX', 60) 
        })
        .catch(next)
    }

    static delete (req, res, next) {
        axios.delete(`${url}${req.params.id}`)
        .then(({ data }) => {
            res.status(200).json({ data })
            return axios.get(url)
        })
        .then(({ data }) => {
            client.set('images', JSON.stringify({ data }, null, 2), 'EX', 60) 
        })
        .catch(next)
    }

}

module.exports = ImageController