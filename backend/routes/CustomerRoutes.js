const express = require("express");

const router = express.Router();

const Customer =
require("../models/Customer");

router.post("/", async (req, res) => {

    try {

        const newCustomer =
        new Customer(req.body);

        await newCustomer.save();

        res.json({
            message:
            "Customer Added",
            customer: newCustomer
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const customers =
        await Customer.find();

        res.json(customers);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const updatedCustomer =
        await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCustomer);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Customer.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Customer Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;