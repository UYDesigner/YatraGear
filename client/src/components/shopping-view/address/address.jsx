import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import Form from "@/components/common/Form";
import { addressFormControls } from "@/config/formConfig";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { addShopUserAddress, deleteShopUserAddress, fetchShopUserAddress, updateShopUserAddress } from "@/services/shop/address";
import { toast } from "sonner";
import { RxCross1 } from "react-icons/rx";

const Address = ({ setCurrentSelectedAddress, currentSelectedAddress }) => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [updateBtn, setUpdateBtn] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [updateAddressId, setUpdateAddressId] = useState();

    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);

    const dispatch = useDispatch();

    const handleSubmitAddress = async (e) => {
        e.preventDefault();

        if (addressList.length >= 3 && !updateBtn) {
            setFormData({});
            toast("You can add max 3 addresses");
            return;
        }

        const { phoneNumber, pincode, locality, address, city, state, addressType, landmark } = formData;
        if (!phoneNumber || !pincode || !locality || !address || !city || !state || !addressType) {
            setError("All fields are required");
            return;
        }
        setError("");

        const payload = { phoneNumber, pincode, locality, city, state, addressType, address, landmark };

        let result;
        if (updateBtn) {
            result = await dispatch(updateShopUserAddress({
                userId: user.id,
                addressId: updateAddressId,
                formData: payload
            }));
        } else {
            result = await dispatch(addShopUserAddress({ ...payload, userId: user.id }));
        }

        setFormData({});
        setUpdateBtn(false);
        setShowForm(false);

        if (result?.payload?.success) {
            toast.success(result.payload.message);
        } else {
            toast.error(result.payload.message);
        }

        dispatch(fetchShopUserAddress({ userId: user.id }));
    };

    const handleAddressDelete = async (addressId) => {
        try {
            const result = await dispatch(deleteShopUserAddress({ addressId, userId: user.id }));
            if (result.payload.success) {
                toast.success(result.payload.message);
                dispatch(fetchShopUserAddress({ userId: user.id }));
            } else {
                toast.error(result.payload.message);
            }
        } catch (error) {
            // (error);
        }
    };

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchShopUserAddress({ userId: user.id }));
        }
    }, [dispatch, user?.id]);

    const onManage = (addressInfo) => {
        setUpdateAddressId(addressInfo._id);
        setFormData(addressInfo);
        setUpdateBtn(true);
        setShowForm(true);
    };

    return (
        <div className="space-y-3 ">
            {/* Saved Addresses */}
            <Card className="rounded shadow border">
                <CardHeader className="border-b pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                    {addressList && addressList.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {addressList.map((addressInfo) => (
                                <AddressCard
                                    key={addressInfo._id}
                                    addressInfo={addressInfo}
                                    handleAddressDelete={handleAddressDelete}
                                    onManage={onManage}
                                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                                    currentSelectedAddress={currentSelectedAddress}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No addresses added yet.</p>
                    )}
                </CardContent>
                <CardDescription className='px-6 '>
                    {/* Add New Address Button */}
                    {!updateBtn && !showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="text-blue-800 text-md font-semibold  transition"
                        >
                            + Add New Address
                        </button>
                    )}
                </CardDescription>

            </Card>



            {/* Add / Edit Address Form */}
            {(showForm || updateBtn) && (
                <Card className="rounded shadow border">
                    <CardHeader className="border-b flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-800">
                            {updateBtn ? "Edit Address" : "Add New Address"}
                        </CardTitle>
                        <RxCross1
                            onClick={() => {
                                setShowForm(false);
                                setUpdateBtn(false);
                                setFormData({});
                            }}
                            className="text-gray-600 hover:text-black cursor-pointer text-xl"
                        />
                    </CardHeader>
                    <CardContent>
                        <Form
                            formControls={addressFormControls}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmitAddress}
                            buttonText={updateBtn ? "Update Address" : "Add Address"}
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Address;
