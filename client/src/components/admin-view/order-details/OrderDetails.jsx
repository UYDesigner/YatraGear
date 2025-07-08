import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from '@radix-ui/react-dropdown-menu';
import Form from '@/components/common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getAllOrderService, updateOrderStatusService } from '@/services/admin/OrderService';

const initialData = {
  status: ""
};

const OrderDetails = ({ setOpenOrdersDetailsDialog, setStatusChange, statusChange }) => {
  const [formData, setFormData] = useState(initialData);
  const { orderDetails } = useSelector(state => state.adminOrders);
  const dispatch = useDispatch()

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    // Add logic to update status
    // console.log('Update status:', formData.status);
    try {
      const result = await dispatch(updateOrderStatusService({ orderID: orderDetails._id, status: formData.status }))
      if (result.payload.success) {
       setStatusChange(!statusChange)
        setOpenOrdersDetailsDialog(false)
        toast("Order Status Updated")
      }
    } catch (error) {
      // console.log(error);
      toast("Server error")
    }

  };

  return (
    <DialogContent className='sm:max-w-[600px] w-full border border-gray-300 rounded-2xl'>
      <div className='grid gap-4'>
        {/* Order Summary */}
        <div className='grid gap-2'>
          <div className='text-xl font-semibold text-gray-800 mb-1'>Order Receipt</div>
          <div className='flex justify-between text-gray-700 text-sm'>
            <span>Order ID:</span>
            <Label>{orderDetails?.paymentId}</Label>
          </div>
          <div className='flex justify-between text-gray-700 text-sm'>
            <span>Order Date:</span>
            <Label>{new Date(orderDetails?.orderDate).toLocaleDateString()}</Label>
          </div>
          <div className='flex justify-between text-gray-700 text-sm'>
            <span>Order Status:</span>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
          <div className='flex justify-between text-gray-700 text-sm'>
            <span>Payment Status:</span>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className='flex justify-between text-gray-700 text-sm'>
            <span>Payment Method:</span>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          {orderDetails?.payerId && (
            <div className='flex justify-between text-gray-700 text-sm'>
              <span>Payer ID:</span>
              <Label>{orderDetails?.payerId}</Label>
            </div>
          )}
        </div>

        <Separator className='h-[1px] bg-gray-200' />

        {/* Order Items */}
        <div className='grid gap-2'>
          <div className='font-semibold text-gray-700'>Items</div>
          <ul className='grid gap-1 text-gray-700 text-sm'>
            {orderDetails?.cartItems?.map((item, idx) => (
              <li key={idx} className='flex justify-between'>
                <span>{item.productName} × {item.qty}</span>
                <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className='h-[1px] bg-gray-200' />

        {/* Price Summary */}
        <div className='grid gap-1 text-gray-700 text-sm'>
          <div className='flex justify-between'>
            <span>Subtotal:</span>
            <Label>${orderDetails?.subTotal?.toFixed(2)}</Label>
          </div>
          <div className='flex justify-between'>
            <span>Shipping:</span>
            <Label>${orderDetails?.Shipping?.toFixed(2)}</Label>
          </div>
          <div className='flex justify-between font-semibold text-gray-800 mt-1'>
            <span>Total:</span>
            <Label>${orderDetails?.totalAmount?.toFixed(2)}</Label>
          </div>
        </div>

        <Separator className='h-[1px] bg-gray-200' />

        {/* Shipping Info */}
        <div className='grid gap-2 text-gray-700 text-sm'>
          <div className='font-semibold'>Shipping Info</div>
          <div className='flex justify-between'>
            <span>Address:</span>
            <span className='text-right'>{orderDetails?.addressInfo?.address}</span>
          </div>
          <div className='flex justify-between'>
            <span>City:</span>
            <span>{orderDetails?.addressInfo?.city}</span>
          </div>
          <div className='flex justify-between'>
            <span>State:</span>
            <span>{orderDetails?.addressInfo?.state}</span>
          </div>
          <div className='flex justify-between'>
            <span>Pincode:</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
          </div>
          <div className='flex justify-between'>
            <span>Locality:</span>
            <span>{orderDetails?.addressInfo?.locality}</span>
          </div>
          <div className='flex justify-between'>
            <span>Address Type:</span>
            <span>{orderDetails?.addressInfo?.addressType}</span>
          </div>
          <div className='flex justify-between'>
            <span>Mobile:</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
          </div>
        </div>
      </div>

      {/* Update Status Forms */}
      <div className='flex flex-col sm:flex-row gap-2 mt-4'>
        <div className='flex-1'>
          <Form
            formControls={[
              {
                name: "status",
                label: "Order Status",
                componentType: "select",
                placeholder: "Select Status",
                option: [
                  { label: "In Process", value: "In Process" },
                  { label: "In Shipping", value: "In Shipping" },
                  { label: "Pending", value: "Pending" },
                  { label: "Rejected", value: "Rejected" },
                  { label: "Delivered", value: "Delivered" },
                ],
              }
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>

      </div>
    </DialogContent>
  );
};

export default OrderDetails;
