const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(403).json({ message: '1000+993?' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()

    req.user

  } catch (e) {
    res.status(403).json({ message: '1000+993?' })
  }
}
