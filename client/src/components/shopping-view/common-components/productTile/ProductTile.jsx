import { ShoppingCart } from 'lucide-react'
import React from 'react'

const ShopingProductCard = ({ product, handleGetProductDetail, handleAddToCart }) => {
    const hasOffer =
        typeof product?.offerPrice === 'number' &&
        product.offerPrice > 0 &&
        typeof product?.price === 'number' &&
        product.offerPrice < product.price;

    // console.log(product)


    return (

        <div className={` flex flex-col justify-between h-full  hover:shadow-lg w-full max-w-sm mx-auto p-4 relative z-10  transition-transform duration-200 hover:scale-[1.02]`}>

            {/* overlay on out of stock */}

            {/* {product.qty <= 0 && (
                 <div className="absolute inset-0 bg-gray-500/50 z-20 rounded" />
            )} */}



            {/* Product Image */}
            <div className='cursor-pointer' onClick={() => handleGetProductDetail(product._id)} >
                <div className="relative w-full pt-8">
                    <img
                        src={product?.featuredImage || '/pho.webp'}
                        alt={product?.productName}
                        className="h-[150px] md:h-[200px] w-full object-contain mx-auto"
                    />

                    {
                        product.qty === 0 ?
                            <div className={`absolute top-2 left-2  bg-red-800 text-white px-2 py-[2px] text-[10px] sm:text-xs  rounded-md`}>
                                Out of Stock
                            </div>
                            :
                            (
                                product?.isNewArrival ?
                                    <div className={`absolute top-2 left-2  bg-green-800 text-white px-2 py-[2px] text-[10px] sm:text-xs  rounded-md`}>
                                        New Arrival
                                    </div>
                                    :
                                    <></>
                            )


                    }
                   


                    {hasOffer && (
                        <div className="absolute top-2 hidden sm:block right-2 bg-red-600 text-white px-2 py-[2px] text-[10px] sm:text-xs  rounded-md">
                            {Math.round(
                                ((product.price - product.offerPrice) / product.price) * 100
                            )}
                            % OFF
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {product?.productName}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {product?.featuredDescription}
                    </p>

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


            {/* Add to Cart */}
            <div className="mt-auto pt-4">
                <button
                    onClick={() => handleAddToCart(product?._id, product.qty)}
                    disabled={product.qty <= 0}
                    className={`flex gap-3 p-2  items-center rounded font-medium cursor-pointer transition 
    ${product.qty <= 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-yellow-400 hover:bg-yellow-500'}
  `}
                >
                    <ShoppingCart />
                    <span>{product.qty <= 0 ? 'Out of Stock' : 'ADD'}</span>
                </button>

            </div>
        </div>
    )
}

export default ShopingProductCard
