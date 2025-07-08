import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const AddressCard = ({ addressInfo, handleAddressDelete, onManage, setCurrentSelectedAddress, currentSelectedAddress }) => {

  const isSelected = currentSelectedAddress?._id === addressInfo._id;
  return (
    <Card
     
      className={`rounded-xl shadow-sm border transition cursor-pointer ${isSelected
        ? 'border-green-600 ring-2 ring-green-300'
        : 'border-gray-200 hover:shadow-md'
        }`}
    >
      <CardContent className="p-4 space-y-1 ">
        <div onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null} className='space-y-1 '>
          <div className="font-semibold text-primary">{addressInfo.addressType}</div>
          <div className="text-gray-700 text-sm">{addressInfo.address}, {addressInfo.locality}</div>
          <div className="text-gray-700 text-sm">{addressInfo.city}, {addressInfo.state} - {addressInfo.pincode}</div>
          {addressInfo.landmark && (
            <div className="text-gray-500 text-xs">Landmark: {addressInfo.landmark}</div>
          )}
          <div className="text-gray-500 text-xs">Phone: {addressInfo.phoneNumber}</div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onManage(addressInfo)}
            className="text-xs text-primary font-medium hover:underline"
          >
            Manage
          </button>
          <button
            onClick={() => handleAddressDelete(addressInfo._id)}
            className="text-xs text-red-500 font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
