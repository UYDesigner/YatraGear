import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from "@/components/ui/dialog";
import OrderDetails from '@/components/shopping-view/order-details/orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersByUserId, getOrderDetailByOrderId } from '@/services/shop/ShopOrders';
import { Badge } from '@/components/ui/badge';
import { ressetOrderDetails } from '@/features/Shop/order/OrderSlice';

const Order = () => {
  const [openOrdersDetailsDialog, setOpenOrdersDetailsDialog] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { orderList } = useSelector(state => state.shopOrder);
  const dispatch = useDispatch();

  // Fetch user's order list on mount
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  // Handle view details click
  const handleFetchOrderDetails = async (orderId) => {
    try {
      const result = await dispatch(getOrderDetailByOrderId(orderId));
      if (result.meta.requestStatus === 'fulfilled') {
        setOpenOrdersDetailsDialog(true);
      } else {
        console.warn('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  // Close dialog: clear Redux and close local state
  const handleCloseDialog = () => {
    setOpenOrdersDetailsDialog(false);
    dispatch(ressetOrderDetails());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orderList && orderList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead><span className='sr-only'>Details</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order.paymentId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`px-3 py-1 text-xs rounded-full ${order.orderStatus === "Delivered" ? 'bg-green-100 text-green-800' :
                        order.orderStatus === "Pending" ? 'bg-orange-100 text-orange-800' :
                          order.orderStatus === "Rejected" ? 'bg-red-100 text-red-800' :
                            order.orderStatus === "In Process" ? 'bg-blue-100 text-blue-800' :
                              order.orderStatus === "In Shipping" ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFetchOrderDetails(order._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='text-gray-500 text-sm'>No orders found</div>
        )}
      </CardContent>

      {/* Dialog: keep outside table, controlled by state */}
      <Dialog open={openOrdersDetailsDialog} onOpenChange={(open) => {
        if (!open) handleCloseDialog();
      }}>
        <OrderDetails />
      </Dialog>
    </Card>
  );
};

export default Order;
