const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Foreign keys
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },

    // Product basic info
    productName: {
        type: String,
        required: true,
        trim: true
    },
    featuredDescription: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },

    // Product type & measurement
    type: {
        type: String,
        enum: ["Solid", "Gel", "Liquid", "Powder"],
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    weightType: {
        type: String,
        enum: ["g", "kg", "ml", "L"],
        required: true
    },
    qty: {
        type: Number,
        required: true
    },

    // Pricing
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number
    },
    offerType: {
        type: String
    },

    // Images
    featuredImage: {
        type: String,
        required: true
    },
    images: {
        type: [String],  // up to 5 images
        validate: {
            validator: function (val) {
                return val.length <= 5;
            },
            message: "Only up to 5 images allowed"
        }
    },

    // Optional fields
    tags: {
        type: [String],
        default: []
    },
    ratings: {
        type: Number,
        default: 0
    },
    review: {
        type: Number,
        default: 0
    },

    isNewArrival: {
        type: Boolean,
        default: false
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});



const Product = mongoose.model("Product", productSchema);

module.exports = Product;