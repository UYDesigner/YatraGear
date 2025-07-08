import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import categorySlice from "../features/admin/CategorySlice"
import subCategorySlice from "../features/admin/SubCategorySlice"
import brandSlice from "../features/admin/BrandSlice"
import ProductSlice from "@/features/admin/ProductSlice"
import ShopProductSlice from "../features/Shop/products/ProductSlice"
import shopCartSlice from "../features/Shop/cart/cartSlice"
import shopAddressSlice from "../features/Shop/address/Address"
import shopOrderSlice from "../features/Shop/order/OrderSlice"
import adminOrderSlice from "../features/admin/OrderSlice"
import shopProductReviewSlice from "../features/Shop/reviews/Review"
import featureImageSlice from "../features/admin/FeaturedSlice"
const store = configureStore({
    reducer :
    {
        auth : authReducer,
        adminCategory : categorySlice,
        adminSubCategory : subCategorySlice,
        adminBrand : brandSlice,
        adminProduct : ProductSlice,
        shopProducts : ShopProductSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice,
        adminOrders : adminOrderSlice,
        shopReview : shopProductReviewSlice,
        adminFeaturedImage : featureImageSlice

    }
})

export default store