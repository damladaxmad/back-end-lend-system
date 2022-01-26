const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser')
const customerRouter = require ('./Routes/CustomerRoutes')

const app = express();

app.use(bodyParser.json())
// app.use(express.json())

app.use('/customers', customerRouter)

module.exports = app
