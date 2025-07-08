const Address = require('../../models/Shop/address')

// Create a new address
const addAddress = async (req, res) => {
    try {
        // const {  formData } = req.body;

        const { userId, phoneNumber, pincode, locality, address, city, state, landmark, addressType } = req.body;

        const newAddress = new Address({
            userId,

            phoneNumber,
            pincode,
            locality,
            address,
            city,
            state,
            landmark,
            addressType,
        });

        const saved = await newAddress.save();
        res.status(201).json({
            success: true,
            message: "Address added successfully",
            error: false,
            data: saved
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:
                false,
            error: true,
            message: "Failed to create address"
        });
    }
};

// Get all addresses for a user
const fetchUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User ID is required"
            });
        }
        const addresses = await Address.find({ userId });
        // console.log(address, "dfkdmk")
        res.status(200).json({
            success: true,
            error: false,
            data: addresses,
            message: 'fetched successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Failed to get addresses"
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        // console.log(formData)
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User and addressId is required"
            });
        }

        const updated = await Address.findByIdAndUpdate(addressId, formData, { new: true });

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            message: "Address updated",
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Failed to update address"
        });
    }
};

// Delete an address
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User and addressId is required"
            });
        }
        const deleted = await Address.findByIdAndDelete(addressId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            message: "Address deleted"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Failed to delete address"
        });
    }
};


const getAddressById = async (req, res) => {
    try {
        const { addressId } = req.params;
        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        res.status(200).json({ success: true, data: address });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch address" });
    }
};


module.exports = { addAddress, fetchUserAddresses, updateAddress, deleteAddress, getAddressById }