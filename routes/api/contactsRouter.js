const express = require('express')
const ctrl = require('../..//controllers/contactsControllers')
const contactsRouter = express.Router()
const validateBody = require('../../helpers/validateBody')
const isValidId = require('../../helpers/isValidId')

const { schemas } = require('../../models/contact')

contactsRouter.get('/', ctrl.getAllContacts)

contactsRouter.get('/:id', isValidId, ctrl.getOneContact)

contactsRouter.delete('/:id', ctrl.deleteContact)

contactsRouter.post(
  '/',
  validateBody(schemas.createContactSchema),
  ctrl.createContact
)

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateContact
)
contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
)

module.exports = contactsRouter
