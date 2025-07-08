const express = require("express");
const { addAddress, fetchUserAddresses, updateAddress, deleteAddress, getAddressById } = require("../../controllers/shop/address");

const router = express.Router();

router.post("/add", addAddress); // POST /api/address
router.get("/get/:userId", fetchUserAddresses); // GET /api/address/user/:userId
router.get("/:addressId", getAddressById); // GET /api/address/:addressId
router.put("/edit/:userId/:addressId", updateAddress); // PUT /api/address/:addressId
router.delete("/delete/:userId/:addressId", deleteAddress); // DELETE /api/address/:addressId

module.exports = router;