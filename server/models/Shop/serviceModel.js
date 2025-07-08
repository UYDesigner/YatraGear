const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model("service", serviceSchema)    