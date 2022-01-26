const mongoose = require('mongoose')
const app = require ('./app')
require("dotenv").config();

const port = process.env.PORT;

const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log("connection succesful")
})

app.listen(port, () => {
    console.log("listening");
  });