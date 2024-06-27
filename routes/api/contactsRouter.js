const express = require('express')
const ctrl = require('../..//controllers/contactsControllers')
const contactsRouter = express.Router()
const validateBody = require('../../helpers/validateBody')
const isValidId = require('../../helpers/isValidId')
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require('../../schemas')

contactsRouter.get('/', ctrl.getAllContacts)

contactsRouter.get('/:id', isValidId, ctrl.getOneContact)

contactsRouter.delete('/:id', ctrl.deleteContact)

contactsRouter.post('/', ctrl.createContact)

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
)
contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavorite
)

module.exports = contactsRouter
