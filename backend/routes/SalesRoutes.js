const express = require("express");

const router = express.Router();

const Sale =
require("../models/Sale");

router.post("/", async (req, res) => {

    try {

        const newSale =
        new Sale(req.body);

        await newSale.save();

        res.json({
            message:
            "Sale Added",
            sale: newSale
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const sales =
        await Sale.find();

        res.json(sales);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Sale.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Sale Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;