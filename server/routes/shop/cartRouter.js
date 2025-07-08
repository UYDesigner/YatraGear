const express = require("express");
const { addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems, } = require("../../controllers/shop/cart");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/delete/:userId/:productId", deleteCartItem);


module.exports = router;
