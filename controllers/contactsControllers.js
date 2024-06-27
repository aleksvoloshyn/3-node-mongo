// const contacts = require('../services/contactsServices')
const Contact = require('../models/contact')
const HttpError = require('../helpers/HttpError')
const ctrlWrapper = require('../helpers/ctrlWrapper')

const getAllContacts = async (req, res) => {
  const result = await Contact.find()
  res.json(result)
}

const getOneContact = async (req, res) => {
  const { id } = req.params
  // const result = await Contact.findOne({ _id: id })
  const result = await Contact.findById(id)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const deleteContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json({
    message: 'Delete success',
  })
}

const createContact = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

const updateContact = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}
const updateFavorite = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
}
