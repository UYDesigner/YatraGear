// server/controllers/shop/orderController.js
const { getPayPalAccessToken } = require('../../controllers/helpers/paypalClient');
const Order = require('../../models/orders/Orders');
const axios = require('axios');
const Cart = require("../../models/Shop/Cart");
const Orders = require('../../models/orders/Orders');
const Product = require('../../models/Admin/AdminProduct')

const createOrder = async (req, res) => {
  try {
    // console.log('Received req.body:', req.body);
    const { userId, cartId, cartItems, addressInfo, paymentMethod, Shipping,
      subTotal, orderDate, orderUpdateDate, totalAmount } = req.body;

    if (!userId || !cartItems?.length || !totalAmount || !cartId || !addressInfo ||
      !paymentMethod || !Shipping || !subTotal || !orderDate || !orderUpdateDate) {
      console.warn('Missing required fields');
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // console.log('Creating PayPal order...');
    const accessToken = await getPayPalAccessToken();

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2)
          },
          description: 'YatraGear order'
        }
      ],
      application_context: {
        return_url: `${process.env.CLIENT_URL}/shop/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/shop/payment-cancel`
      }
    };

    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const orderResult = response.data;
    // console.log('PayPal order created:', orderResult);

    // Save in local DB
    const newOrder = new Order({
      userId, cartId, cartItems, addressInfo, paymentMethod,
      orderDate, orderUpdateDate,
      paymentStatus: 'Pending',
      Shipping, subTotal, totalAmount,
      paymentId: orderResult.id,
      orderStatus: 'Pending',
      payerId: '12',
      deliveryStatus: 'Pending'
    });
    await newOrder.save();

    const approvalLink = orderResult.links.find(link => link.rel === 'approve')?.href;
    if (!approvalLink) {
      console.error('Approval URL not found');
      return res.status(500).json({ success: false, message: 'Approval URL not found' });
    }

    res.json({
      success: true,
      orderId: orderResult.id,
      approvalUrl: approvalLink
    });

  } catch (error) {
    console.error('Error in createOrder:', error.response?.data || error);
    res.status(500).json({ success: false, message: 'PayPal order creation failed' });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderID } = req.params; // orderID is PayPal order id
    // console.log('Capturing PayPal payment for orderID: hai yeh', orderID);

    const accessToken = await getPayPalAccessToken();

    // 1. Capture payment on PayPal
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const capture = response.data;
    // console.log('Payment capture response:', capture);

    // 2. Update your local DB order
    const payerId = capture.payer?.payer_id;
    const paymentStatus = capture.status === 'COMPLETED' ? 'Paid' : 'Pending';

    await Order.findOneAndUpdate(
      { paymentId: orderID }, // paymentId you saved when creating order
      {
        paymentStatus,
        payerId,
        orderStatus: 'Confirmed',
        orderUpdateDate: new Date()
      }
    );

    // 3. Optionally clear user cart
    const order = await Order.findOne({ paymentId: orderID });

    // 3. Optionally update stock (reduce qty)
    for (const item of order.cartItems) {
      const productDoc = await Product.findById(item.productId);
      if (productDoc) {
        if (productDoc.qty > 0) {
          productDoc.qty -= item.qty;
          await productDoc.save();
        } else {
          return res.status(404).json({
            success: false,
            error: true,
            message: 'product out of stock'

          });
        }
      }
    }


    if (order) {
      await Cart.findOneAndDelete({ userId: order.userId });
    }



    res.json({
      success: true,
      capture,
      message: "Payment captured successfully"
    });

  } catch (error) {
    console.error('Error in capturePayment:', error.response?.data || error);
    res.status(500).json({ success: false, message: 'Error capturing payment' });
  }
};

const getAllOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User ID is required"
      });
    }

    const orders = await Orders.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No orders found!"
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: orders,
      message: "Orders fetched successfully"
    });

  } catch (error) {
    console.error('Error in getAllOrdersByUserId:', error);
    return res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};


const getOrderDetails = async (req, res) => {
  try {
    const { orderID } = req.params;
    // console.log(orderID,'kkkkkkkkkkk')

    if (!orderID) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Order ID is required"
      });
    }

    const orderDetail = await Orders.findById(orderID);

    if (!orderDetail) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: orderDetail,
      message: "Order detail fetched successfully"
    });

  } catch (error) {
    console.error('Error in getOrderDetails:', error);
    return res.status(500).json({ success: false, message: 'Error fetching order details' });
  }
};



module.exports = { createOrder, capturePayment, getAllOrdersByUserId, getOrderDetails };
