// models/Address.js
const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
       
    },
    pincode: {
        type: String,
        required: true,
        
    },
    locality: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    landmark: {
        type: String,
        trim: true,
    },
    addressType: {
        type: String,
        enum: ["Home", "Work", "Other"],
        default: "Home",
    },
}, {
    timestamps: true
});




const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
