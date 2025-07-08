const express = require('express');
const {getFilteredProducts, getProductDetailsById} =  require('../../controllers//shop/products_controlers')


const router = express.Router();

router.get("/getProducts", getFilteredProducts)
router.get("/getProduct/:id", getProductDetailsById)

module.exports = router;