const mongoose = require('mongoose')

const lendSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: [true, 'a lend should have a description']
  },
  money: {
    type: Number,
    required: [true, 'a lend should have a money']
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Lend = mongoose.model('Lend', lendSchema)

const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'a customer should have a name']
    },
    number: {
      type: Number,
      required: [true, 'a customer should have a number']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    lends: [lendSchema]
  })
  
  const Customer = mongoose.model('Customer', customerSchema)

  module.exports = Customer  

  