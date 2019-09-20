const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/User')
const auth = require('../middleware/auth')

router.post('/register', ControllerUser.regsiter)
router.post('/login', ControllerUser.login)

router.get('/',auth.authentication, ControllerUser.dataUser)
router.get('/leaderboard', ControllerUser.getLeaderboard)

router.patch('/addScore',auth.authentication, ControllerUser.addScore)
router.patch('/addVocab',auth.authentication, ControllerUser.addFavoriteVocab)


module.exports = router