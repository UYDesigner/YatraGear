import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog } from "@/components/ui/dialog";
import OrderDetails from '@/components/admin-view/order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderService, getOrderDetailByOrderIdService } from '@/services/admin/OrderService';
import { Badge } from '@/components/ui/badge';
import { ressetOrderDetails } from '@/features/admin/OrderSlice';

const Orders = () => {
  const [openOrdersDetailsDialog, setOpenOrdersDetailsDialog] = useState(false);
  const [statusChange, setStatusChange] = useState(false)
  const { orderList } = useSelector(state => state.adminOrders);
  const dispatch = useDispatch();

  const handleFetchOrderDetails = async (orderId) => {
    try {
      const result = await dispatch(getOrderDetailByOrderIdService(orderId));
      // console.log(result)
      if (result.meta.requestStatus === 'fulfilled') {
        setOpenOrdersDetailsDialog(true);
      } else {
        console.warn('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenOrdersDetailsDialog(false);
    dispatch(ressetOrderDetails());
  };

  useEffect(() => {
    dispatch(getAllOrderService());
  }, [dispatch, statusChange]);

  // console.log(orderList)

  return (
    <Card className="border border-gray-300 rounded-2xl overflow-x-auto">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orderList && orderList.length > 0 ? (
          <div className="min-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Order ID</TableHead>
                  <TableHead className="whitespace-nowrap">Order Date</TableHead>
                  <TableHead className="whitespace-nowrap">Order Status</TableHead>
                  <TableHead className="whitespace-nowrap">Order Price</TableHead>
                  <TableHead><span className='sr-only'>Details</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList.map(order => (
                  <TableRow key={order._id}>
                    <TableCell className="whitespace-nowrap">{order.paymentId}</TableCell>
                    <TableCell className="whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={`px-3 py-1 text-xs rounded-full ${
                          order.orderStatus === "Delivered" ? 'bg-green-100 text-green-800' :
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
                    <TableCell className="whitespace-nowrap">${order.totalAmount?.toFixed(2)}</TableCell>
                    <TableCell className="whitespace-nowrap">
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
          </div>
        ) : (
          <div className='text-gray-500 text-sm'>No orders found</div>
        )}
      </CardContent>
      <Dialog open={openOrdersDetailsDialog} onOpenChange={(open) => { if (!open) handleCloseDialog(); }}>
        <OrderDetails setOpenOrdersDetailsDialog={setOpenOrdersDetailsDialog} statusChange={statusChange} setStatusChange={setStatusChange} />
      </Dialog>
    </Card>
  );
};

export default Orders;
