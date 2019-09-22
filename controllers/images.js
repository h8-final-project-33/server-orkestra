const redis     = require('redis')
const client    = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {no_ready_check: true});
client.auth(process.env.REDIS_PASSWORD, function (err) {
    if (err) throw err;
});

client.on('connect', function() {
    console.log('Connected to Redis');
});

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

    static findMine (req, res, next) { 
        console.log('iniii',req.decoded._id);
        axios.get(url+'find/myImage', { data:{owner: req.decoded._id}})
        .then(({ data }) => {
            res.status(200).json({ data })
        })
        .catch(err => {
            console.log(err);
        })
    }

    static findOne (req, res, next) {
        axios.get(`${url}${req.params.id}`)
        .then(({ data }) => {
            res.status(200).json({ data })
        })
        .catch(next)
    }

    static create (req, res, next) {
        const {image} = req.body
        axios.post(url, { image, _id: req.decoded._id})
        .then(({ data }) => {
            res.status(201).json({ data })
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