const express = require('express')
const router = express.Router();
const { addNewCategory, handleImageUpload, editCategoryById, deleteCategoryById, fetchAllCategories, fetchCategoryById, addNewSubCategory, editSubCategoryById, deleteSubCategoryById, fetchAllSubCategories, fetchSubCategoryById, addNewBrand, editBrandById, deleteBrandById, fetchAllBrands, fetchBrandById, addNewProduct, fetchAllProducts, deleteProductById, editProductById, createFeature, getAllFeatures, updateFeature, deleteFeature } = require("../../controllers/admin/adminController");
const { upload } = require('../../controllers/helpers/cloudinary');
const { getAllOrders, getOrderDetailsByUserId, updateOrderStatus } = require('../../controllers/admin/order');

// upload-image-cloudinary
router.post("/upload-image", upload.single('image'), handleImageUpload)

// category------------
router.post("/add_new_category", addNewCategory)
router.put("/edit_category/:categoryId", editCategoryById)
router.delete("/delete_category/:categoryId", deleteCategoryById)
router.get("/fetch_all_categories", fetchAllCategories)
router.get("/fetch_category_by_id/:categoryId", fetchCategoryById)

// sub category--------------------
router.post("/add_new_sub_category", addNewSubCategory)
router.put("/edit_sub_category/:subCategoryId", editSubCategoryById)
router.delete("/delete_sub_category/:subCategoryId", deleteSubCategoryById)
router.get("/fetch_all_sub_categories", fetchAllSubCategories)
router.get("/fetch_sub_category_by_id/:subCategoryId", fetchSubCategoryById)

// brand --------------------
router.post("/add_new_brand", addNewBrand)
router.put("/edit_brand/:brandId", editBrandById)
router.delete("/delete_brand/:brandId", deleteBrandById)
router.get("/fetch_all_brands", fetchAllBrands)
router.get("/fetch_brand_by_id/:brandId", fetchBrandById)

// product---------------------------
router.post('/add_new_product', addNewProduct);
router.get("/fetch_all_products", fetchAllProducts);
router.delete("/delete_product/:productId", deleteProductById);
router.put("/edit_product/:productId", editProductById)

// dashboard-featured-image
router.post('/add_featured_image', createFeature);
router.get('/get_all_featured_image', getAllFeatures);
router.put('/edit_featured_image/:id', updateFeature);
router.delete('/delete_featured_image/:id', deleteFeature);

// orders---------------------------
router.get('/get-all-orders', getAllOrders);
router.get('/get-order-detail-by-orderid/:orderID', getOrderDetailsByUserId);
router.post('/update-order-status', updateOrderStatus);

module.exports = router;