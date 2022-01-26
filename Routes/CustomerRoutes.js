const fs = require("fs");
const express = require("express");
const customerController = require('../Controllers/CustomerController')
const app = express()

const router = express.Router()

router
  .route("/:id/lends")
  .get(customerController.getCustomerLends)
  .patch(customerController.updateLend)
  .post(customerController.createLend)
router
  .route("/:cid/:lid")
  .patch(customerController.updateLend)
router
  .route("/:id/lends")
router
  .route("/")
  .get(customerController.getAllCustomers)
  .post(customerController.createNewCustomer);
router
  .route("/:id")
  .get(customerController.getCustomerByID)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);
router
  .route('/:id/totalLends')
  .get(customerController.getTotalLends)

module.exports = router
