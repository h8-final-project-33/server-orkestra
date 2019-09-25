const express = require('express')
const router = express.Router()
const User = require('./user')
const Images = require('./images')

router.use('/user',User)
router.use('/images',Images)

module.exports = router