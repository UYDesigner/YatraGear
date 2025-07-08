const express = require('express');
const router = express.Router();

const { createOrder, capturePayment, getAllOrdersByUserId, getOrderDetails } = require('../../controllers/shop/orderController');

router.post('/create-order',createOrder);
router.post('/capture-payment/:orderID', capturePayment);
router.get('/get-all-orders-by-userid/:userId', getAllOrdersByUserId);
router.get('/get-order-detail-by-orderid/:orderID', getOrderDetails);

module.exports = router;
