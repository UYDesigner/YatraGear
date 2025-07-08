import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import LogIn from './pages/auth/LogIn'
import AdminLayout from './components/admin-view/AdminLayout'
import DashBoard from './pages/admin-view/DashBoard'
import Features from './pages/admin-view/Features'
import Orders from './pages/admin-view/Orders'
import Products from './pages/admin-view/Products'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/notFound/NotFound'
import Home from './pages/shopping-view/Home'
import Cart from './pages/shopping-view/Cart'
import Account from './pages/shopping-view/Account'
import CheckOut from './pages/shopping-view/CheckOut'
import Listing from './pages/shopping-view/Listing'
import Register from './pages/auth/register'
import CheckAuth from './components/common/CheckAuth'
import Product from './pages/shopping-view/Product'
import UnAuth from './pages/unAuth/UnAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthService } from './services/auth/AuthServices'
import { Skeleton } from "@/components/ui/skeleton"
import Categories from './pages/admin-view/Categories'
import SubCategories from './pages/admin-view/SubCategories'
import Brands from './pages/admin-view/Brands'

import { fetchAllCategoriesService } from './services/admin/CategoryService'
import { fetchAllSubCategoriesService } from './services/admin/SubCategoryService'
import { fetchAllBrandService } from './services/admin/BrandService'
import { fetchAllProductService } from './services/admin/ProductService'
import PaymentReturn from './pages/shopping-view/paymentReturn'
import PaymentSuccess from './pages/shopping-view/paymentSuccess'
import PaymentCancel from './pages/shopping-view/PaymentCancel'
import { fetchCartItems } from './services/shop/ShopCart'
import { getAllFeaturesImageService } from './services/admin/FeaturedService'


function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state) => {
    // console.log(state.auth)
    return state.auth;
  })
  const userINfo = useSelector((state) => {
    // console.log(state.auth)
    return state.auth.user;
  })

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuthService());
  }, []);

  // console.log("Auth State in App.jsx: ", auth);

  //  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllCategoriesService())
    dispatch(fetchAllSubCategoriesService())
    dispatch(fetchAllBrandService())
    dispatch(fetchAllProductService())
    dispatch(getAllFeaturesImageService())
  }, [])
  useEffect(() => {
    dispatch(fetchCartItems(userINfo?.id))
    // console.log(userINfo)
  }, [auth])



  return (
    <div>
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading} />

        } />
        <Route path='/auth'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isLoading={isLoading} user={user} children={<AuthLayout />} />
          }
        >
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading} children={<AdminLayout />} />

          }
        >
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='features' element={<Features />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='categories' element={<Categories />} />
          <Route path='subcategories' element={<SubCategories />} />
          <Route path='brands' element={<Brands />} />
        </Route>
        <Route path='/shop'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading} children={<ShoppingLayout />} />

          }
        >
          <Route path='home' element={<Home />} />
          <Route path='product' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='account' element={<Account />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='listing' element={<Listing />} />
          <Route path='payment-success' element={<PaymentSuccess />} />
          <Route path='payment-return' element={<PaymentReturn />} />
          <Route path='payment-cancel' element={<PaymentCancel />} />

        </Route>
        {/* <Route path='/' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}  />}  >
          <Route path='payment-success' element={<PaymentSuccess />} />
          <Route path='payment-return' element={<PaymentReturn />} />
          <Route path='payment-cancel' element={<PaymentCancel />} />
        </Route> */}
        <Route path='*'
          element={<NotFound />} />
        <Route path='/unauth' element={<UnAuth />} />


      </Routes>
    </div>
  )
}

export default App
