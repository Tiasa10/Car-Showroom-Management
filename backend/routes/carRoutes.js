
const express = require("express");

const router = express.Router();
//express.Router()
//This creates:mini route handler
//Instead of putting everything in server.js.

const Car = require("../models/Car");

router.post("/", async (req, res) => {

    try {

        const newCar = new Car(req.body);

        await newCar.save();

        res.json({
            message: "Car Saved To Database",
            car: newCar
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const cars = await Car.find();

        res.json(cars);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Car Updated Successfully",
            car: updatedCar
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Car.findByIdAndDelete(req.params.id);

        res.json({
            message: "Car Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;