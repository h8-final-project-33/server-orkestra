const router            = require('express').Router()
const ImageController   = require('../controllers/images')
const errorHandler      = require('../middleware/errorHandler')
const {authentication, authorization} = require('../middleware/auth')

router.get('/all/:limit', ImageController.findAll)
router.get('/find/myImage', authentication, ImageController.findMine)
router.get('/:id', ImageController.findOne)
router.post('/', authentication, ImageController.create)
router.delete('/:id', authentication, authorization, ImageController.delete)

router.use(errorHandler)

module.exports = router
