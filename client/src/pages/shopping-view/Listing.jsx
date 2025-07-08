
import ProductFilter from '@/components/shopping-view/ShoppingListing/Filter/ProductFilter'
import ProductListing from '@/components/shopping-view/ShoppingListing/ListingProduct/ProductListing'
import { addToCart, fetchCartItems } from '@/services/shop/ShopCart'
import { fetchShopProducDetailById } from '@/services/shop/ShopProduct'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const Listing = () => {
  const [filters, setFilters] = useState({})
  const { user } = useSelector((state) => state.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState(null)
  // const [triggerSearch, setTriggerSearch] = useState(false);
  const { cartItems } = useSelector((store) => store.shopCart) || [];
  const dispatch = useDispatch();
  const location = useLocation();
  const handleSort = (value) => {
    // console.log(value)
    setSort(value)
  }

  const navigate = useNavigate();

  const handleGetProductDetail = async (id) => {

    dispatch(fetchShopProducDetailById(id))

    navigate(`/shop/product`);


  }

  // add to cart 
  const handleAddToCart = async (productId, productStock) => {
    // console.log(productId, user, productStock, "pppppppppp")
    if (!user) {
      navigate("/shop/login")
      return;
    }
    if (cartItems && cartItems.length > 0) {
      const idxOfCurrentItem = cartItems?.findIndex(item => item.productId === productId)
      
      if (idxOfCurrentItem > -1) {
        // console.log("matched", cartItems[idxOfCurrentItem])
        const getQuantity = cartItems[idxOfCurrentItem].quantity;
        // console.log("ooo", getQuantity)
        if(getQuantity + 1 > productStock )
        {
          // console.log("out")
          toast.error(`Only ${productStock} quantity can be added for this product`)
          return;
        }
      }
    }



    dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then((data) => {
      // console.log(data, "add to cart response")
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id))
        toast.success("Product is added to cart")
      }
    })
  }





  // console.log(searchParams)
  const createSearchParamsHelper = (filters) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      } else if (typeof value === 'string' && value.trim() !== "") {
        queryParams.push(`${key}=${encodeURIComponent(value.trim())}`);
      }
    }
    return queryParams.join("&");
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    // console.log(getSectionId, getCurrentOption)
    let cpyFilters = { ...filters }
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      }

    }
    else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption)
      }
      else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
      }


    }
    setFilters(cpyFilters)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters))

  }
  // useEffect(() => {
  //   setSort('price-LowToHigh');
  //   setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})

  // }, [])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};

    // Only update filters if they are different
    if (JSON.stringify(filters) !== JSON.stringify(storedFilters)) {
      setFilters(storedFilters);
    }

    setSort('price-LowToHigh');
  }, [location.key]); // 👈 More reliable than location.search








  // console.log(filters, sort)
  // console.log(cartItems)

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6  p-4 md:p-6 z-30 '>
      <div className="left-slidebar hidden lg:block">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </div>
      <div className="right-products ">
        <ProductListing handleGetProductDetail={handleGetProductDetail} sort={sort} handleSort={handleSort} filters={filters} handleAddToCart={handleAddToCart} />
      </div>
    </div>
  )
}

export default Listing