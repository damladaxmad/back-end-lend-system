const express = require("express");
const Customer = require("./../Models/customerModel");

// Customer Controller

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();

    res.status(200).json({
      status: "success",
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getCustomerByID = async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  console.log(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
};

exports.createNewCustomer = async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedCustomer,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Lend Controllers

exports.getCustomerLends = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const lends = customer.lends;
  res.status(200).json({
    status: "success",
    data: {
      lends,
    },
  });
};

exports.createLend = async (req, res) => {
  try {
    // Customer.findById(req.params.id)
    // .then((customer) => {
    //   if (!customer.lends){
    //     customer.lends.set(req.body)
    //   } else {
    //       customer.lends.push(req.body);
    //     }
    //   return customer.save();
    // })
    // .then((customer) => {
    //   res.status(200).json({ customer });
    // })

    const customer = await Customer.findById(req.params.id);
    if (!customer.lends) {
      customer.lends = req.body;
    } else {
      customer.lends.push(req.body);
    }
    const sum = Object.assign(customer, customer.lends);
    await Customer.create(sum);
    res.status(200).json({
      status: "success",
      data: {
        createLend: sum,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTotalLends = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const lends = customer.lends;
  let total = 0;
  lends.map((e) => {
    total += e.money * 1;
  });
  console.log(total);

  res.json({
    data: {
      total,
    },
  });
};

exports.updateLend = async (req, res, next) => {
  try {
    Customer.findById(req.params.cid)
      .then((customer) => {
        const lends = customer.lends.id(req.params.lid);
        lends.set(req.body);
        return customer.save();
       })
      .then((customer) => {
        res.status(200).json({ customer });
      });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
