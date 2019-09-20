const router            = require('express').Router()
const ImageController   = require('../controllers/images')
const errorHandler      = require('../middleware/errorHandler')

router.get('/', ImageController.findAll)
router.get('/:id', ImageController.findOne)
router.post('/', ImageController.create)
router.patch('/:id', ImageController.update)
router.delete('/:id', ImageController.delete)

router.use(errorHandler)

module.exports = router