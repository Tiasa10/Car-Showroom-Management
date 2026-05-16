const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    brand: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },
    
    image: {
        type: String
    },

    availability: {
        type: String,
        default: "Available"
    },
    
    fuelType: {
        type: String
    },
    
    transmission: {
        type: String
    },
    
    mileage: {
        type: String
    },
    
    color: {
        type: String
    },
    
    year: {
        type: Number
    },
    
    stockQuantity: {
        type: Number,
        default: 1
    },
    
    engineDetails: {
        type: String
    },
    
    features: {
        type: String
    },
    
    emiPrice: {
        type: Number
    },
    
    maintenanceStatus: {
        type: String,
        default: "Good"
    },
    
    maintenanceCost: {
        type: Number,
        default: 0
    },
    
    lastServiceDate: {
        type: String
    },
    
    nextServiceDate: {
        type: String
    }
});

module.exports = mongoose.model("Car", carSchema);