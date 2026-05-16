const mongoose = require("mongoose");

const customerSchema =
new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    address: {
        type: String
    },

    interestedVehicle: {
        type: String
    },

    purchasedVehicle: {
        type: String
    },

    wishlist: {
        type: String
    },

    bookingStatus: {
        type: String,
        default: "Pending"
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    }

});

module.exports =
mongoose.model(
    "Customer",
    customerSchema
);