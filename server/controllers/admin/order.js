
const Orders = require('../../models/orders/Orders');


const getAllOrders = async (req, res) => {
  try {
   
    const orders = await Orders.find({});

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


const getOrderDetailsByUserId = async (req, res) => {
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

const updateOrderStatus = async (req, res) => {
  try {
    const { status, orderID  } = req.body;
    

    if (!status && !orderID) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "order status && orderID both are required"
      });
    }

    const order = await Orders.findById(orderID);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Order not found"
      });
    }

    order.orderStatus = status;
    order.save()

    return res.status(200).json({
      success: true,
      error: false,
      data: order,
      message: "Order status updated successfully"
    });

  } catch (error) {
    console.error('Error in Order status updated fetched :', error);
    return res.status(500).json({ success: false, message: 'Error fetching order details' });
  }
};
module.exports = {getAllOrders, getOrderDetailsByUserId, updateOrderStatus}