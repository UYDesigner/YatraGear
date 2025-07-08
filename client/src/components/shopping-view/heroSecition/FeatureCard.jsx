import { fetchShopProducDetailById } from '@/services/shop/ShopProduct';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ product }) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
    //  console.log(product)
    const hasOffer =
        typeof product?.offerPrice === 'number' &&
        product.offerPrice > 0 &&
        typeof product?.price === 'number' &&
        product.offerPrice < product.price;

    const handleGetProductDetail = async (id) => {

        dispatch(fetchShopProducDetailById(id))

        navigate(`/shop/product`);


    }

    return (
        <div className="flex flex-col justify-between h-full  hover:shadow-lg w-full max-w-sm mx-auto  relative bg-white transition-transform duration-200 hover:scale-[1.02]">
            {/* Product Image */}
            <div className='cursor-pointer' onClick={() => handleGetProductDetail(product._id)} >
                <div className="relative w-full py-8 md:py-15 bg-[#e5e5e5]">
                    <img
                        src={product?.featuredImage || '/pho.webp'}
                        alt={product?.productName}
                        className="h-[170px] md:h-[200px] w-full object-contain mx-auto mix-blend-darken"
                    />
                    {

                        product.isNewArrival && <div className="absolute top-2 left-2 bg-green-800 text-white px-2 py-[2px] text-xs rounded-md">
                            New Arrival
                        </div>
                    }


                    {hasOffer && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-[2px] text-xs rounded-md">
                            {Math.round(
                                ((product.price - product.offerPrice) / product.price) * 100
                            )}
                            % OFF
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-4 space-y-2 md:space-y-3">
                    <h2 className=" lg:text-lg font-semibold text-gray-800 line-clamp-1">
                        {product?.productName}
                    </h2>




                    {/* Price */}
                    <div className="flex items-center gap-2">
                        {hasOffer ? (
                            <>
                                <span className="text-red-600 font-semibold text-lg">
                                    ${product.offerPrice}
                                </span>
                                <span className="line-through text-gray-400 text-sm">
                                    ${product.price}
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-900 font-semibold text-lg">
                                ${product?.price ?? '1,595.00'}
                            </span>
                        )}
                    </div>
                </div>
            </div>



        </div>
    )
}

export default FeatureCard