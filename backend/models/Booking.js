const mongoose = require("mongoose");

const bookingSchema =
new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    vehicle: {
        type: String,
        required: true
    },

    bookingDate: {
        type: String,
        required: true
    },

    bookingTime: {
        type: String,
        required: true
    },

    bookingType: {
        type: String,
        default: "Vehicle Booking"
    },

    bookingStatus: {
        type: String,
        default: "Confirmed"
    }

});

module.exports =
mongoose.model(
    "Booking",
    bookingSchema
);