const mongoose = require('mongoose')
const app = require('./app')

mongoose.set('strictQuery', true)

// const DB_HOST =
//   'mongodb+srv://alex:YySHYENjRdq369bV@cluster0.zygfoai.mongodb.net/contacts_reader?retryWrites=true&w=majority&appName=Cluster0'
const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)

  .then(() => app.listen(PORT))

  .catch((er) => {
    console.log(er.message)
    process.exit(1)
  })
