const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/shop/Reviews');

router.post('/add-review', reviewController.createReview);
router.get('/get-reviews/:productId', reviewController.getReviewsByProduct);


module.exports = router;
