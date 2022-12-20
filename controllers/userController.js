const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken')
const { User, Category } = require('../models/models')


const generateJwt = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.SECRET_KEY,
    { expiresIn: '24h' },
  )
}

class UserController
{
  async registration(req, res, next)
  {
    const { email, password } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Bad email or password'))
    }

    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('User already registered'))
    }

    // const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password })
    await Category.create({ userId: user.id })
    const token = generateJwt(user.id, user.email)

    return res.json({ token })
  }

  async login(req, res, next)
  {
    try {

      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return next(ApiError.internal('User not found'))
      }

      // let comparePassword = bcrypt.compareSync(password, user.password)

      if (password !== user.password) {
        console.log('!!!!!!!', password, user.password)
        return next(ApiError.internal('Incorrect password'))
      }

      const token = generateJwt(user.id, user.email)
      return res.json({ token })

    } catch (e) {

    }
  }

  async check(req, res)
  {
    const token = generateJwt(req.user.id, req.user.email)
    res.json({ token })
  }
}

module.exports = new UserController()
