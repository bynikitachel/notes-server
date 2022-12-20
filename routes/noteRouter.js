const Router = require('express')
const router = new Router()
const noteController = require('../controllers/noteController')

router.post('/', noteController.create)
router.post('/edit', noteController.edit)
router.get('/', noteController.getAll)
router.delete('/', noteController.deleteOne)
router.get('/:id', noteController.getOne)


module.exports = router
