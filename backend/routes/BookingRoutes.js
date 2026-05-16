const express = require("express");

const router = express.Router();

const Booking =
require("../models/Booking");

router.post("/", async (req, res) => {

    try {

        const newBooking =
        new Booking(req.body);

        await newBooking.save();

        res.json({
            message:
            "Booking Created",
            booking: newBooking
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const bookings =
        await Booking.find();

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const updatedBooking =
        await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedBooking);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Booking.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Booking Cancelled"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;