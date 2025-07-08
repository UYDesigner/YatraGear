const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: String,
            featuredImage: String,
            price: String,

            qty: Number,
        },
    ],
    addressInfo: {
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true
        },
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String,
        locality: String,
        addressType: String
    },

    orderStatus: {
        type: String,

        default: 'Pending'
    },

    paymentMethod: {
        type: String,

        required: true
    },

    paymentStatus: {
        type: String,

        default: 'Pending'
    },

    Shipping: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },

    paymentId: String,
    payerId: String,

    orderDate: {
        type: Date,
        default: Date.now
    },

    orderUpdateDate: {
        type: Date
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Pending'
    }


}, {
    timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);