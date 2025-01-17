const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')
const HttpError = require('../helpers/HttpError')
const ctrlWrapper = require('../helpers/ctrlWrapper')
const { SECRET_KEY } = process.env

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw HttpError(409, 'Email already in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, 'Email or password invalid')
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid')
  }

  const payload = {
    id: user.id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
  res.json({ token })
}

module.exports = { register: ctrlWrapper(register), login: ctrlWrapper(login) }
