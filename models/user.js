const Joi = require('joi')
const { Schema, model } = require('mongoose')
const handleMongooseError = require('../helpers/handleMongooseError')

const emailRegexp = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const schemas = { registerSchema, loginSchema }

const User = model('user', userSchema)

module.exports = { User, schemas }
