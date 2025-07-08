const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true })

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category;

