const express = require('express')
const ctrl = require('../..//controllers/contactsControllers')
const contactsRouter = express.Router()
const validateBody = require('../../helpers/validateBody')
const { createContactSchema, updateContactSchema } = require('../../schemas')

contactsRouter.get('/', ctrl.getAllContacts)

contactsRouter.get('/:id', ctrl.getOneContact)

contactsRouter.delete('/:id', ctrl.deleteContact)

contactsRouter.post('/', validateBody(createContactSchema), ctrl.createContact)

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  ctrl.updateContact
)

module.exports = contactsRouter
