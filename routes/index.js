const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const noteRouter = require('./noteRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/note', noteRouter)
router.use('/category', categoryRouter)

module.exports = router
