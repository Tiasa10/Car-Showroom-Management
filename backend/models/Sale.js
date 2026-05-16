const mongoose = require("mongoose");

const saleSchema =
new mongoose.Schema({

    customerName: {
        type: String,
        required: true
    },

    vehicle: {
        type: String,
        required: true
    },

    vehiclePrice: {
        type: Number,
        required: true
    },

    gstAmount: {
        type: Number,
        default: 0
    },

    totalAmount: {
        type: Number,
        default: 0
    },

    amountPaid: {
        type: Number,
        default: 0
    },

    pendingDue: {
        type: Number,
        default: 0
    },

    emiMonths: {
        type: Number,
        default: 0
    },

    emiPerMonth: {
        type: Number,
        default: 0
    },

    emiDate: {
        type: String
    },

    paymentStatus: {
        type: String,
        default: "Pending"
    },

    invoiceDate: {
        type: String
    }

   

});

module.exports =
mongoose.model(
    "Sale",
    saleSchema
);