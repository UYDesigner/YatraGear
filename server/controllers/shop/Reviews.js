const mongoose = require('mongoose');
const ProductReview = require('../../models/Shop/Review');
const Orders = require('../../models/orders/Orders')
const Product = require("../../models/Admin/AdminProduct");
// @desc Create/add a product review
// @route POST /api/reviews
// @access Public or Protected (depending on your auth)
const createReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

        if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required.'
            });
        }


        // ✅ Step 1: Find all confirmed (or delivered) orders where this user bought this product
        const confirmedOrders = await Orders.find({
            userId,
            "cartItems.productId": new mongoose.Types.ObjectId(productId),

            orderStatus: { $in: ['Confirmed', 'Delivered'] }   // adjust based on your system
        });



        if (!confirmedOrders.length) {
            return res.status(403).json({
                success: false,
                error: true,
                message: "You need to purchase this product (order must be confirmed) before reviewing."
            })
        }


        const existingReview = await ProductReview.findOne({ productId, userId });


        if (existingReview) {
            return res.status(403).json({
                success: false,
                error: true,
                message: "You have already reviewed this product."
            });
        }



        const newReview = await ProductReview.create({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        });

        // ✅ Step 5: Recalculate average rating for the product
        const allReviews = await ProductReview.find({ productId });
        const totalReviews = allReviews.length;

        const avgReview = allReviews.reduce(
            (sum, reviewItem) => sum + reviewItem.reviewValue,
            0
        ) / totalReviews;

        const result = await Product.findByIdAndUpdate(
            productId,
            {
                review: avgReview,
                ratings: avgReview
            },
            { new: true }
        );

        // console.log(result, "updated product");


        // ✅ Step 6: Respond to client
        res.status(201).json({
            success: true,
            error: false,
            data: newReview,
            message: "Review submitted successfully!"
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ success: false, message: 'Server error while creating review.' });
    }
};


const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log(productId, "oooooooooooooooooo")
        const reviews = await ProductReview.find({ productId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            error: false,
            data: reviews,
            message: "fetched all review based on product"
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching reviews.' });
    }
};



module.exports = {
    createReview,
    getReviewsByProduct,
 
};
