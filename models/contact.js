const Joi = require('joi')
const { Schema, model } = require('mongoose')
const handleMongooseError = require('../helpers/handleMongooseError')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleMongooseError)

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
}

const Contact = model('contact', contactSchema)

module.exports = { Contact, schemas }
