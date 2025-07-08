import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

import { ArrowUpDownIcon } from 'lucide-react';
import ShopingProductCard from '../../common-components/productTile/ProductTile';
import { SelectSeparator } from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/services/shop/ShopProduct';


const ProductListing = ({ sort, handleSort, filters, handleGetProductDetail, handleAddToCart }) => {
    const sortOptions = [

        { id: 'price-LowToHigh', label: 'Price: Low to High' },
        { id: 'price-HighToLow', label: 'Price: High to Low' },
        { id: 'name-AToZ', label: 'Title: A to Z' },
        { id: 'name-ZToA', label: 'Title: Z to A' },
    ];
    const { productList } = useSelector((state) => state.shopProducts)
    // console.log(productList)
    const dispatch = useDispatch();






    useEffect(() => {
        if (filters !== null && sort !== null) {

            dispatch(fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort }))
        }
    }, [dispatch, filters, sort])

    // console.log(productList, "ProductListttttttttt")
    return (
        <div>
            <div className="title bg-background w-full">
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-xl'>All Products</h2>
                    <div className='flex items-center gap-4 ,,'>
                        <h4 className='text-gray-500'>{productList?.length} Products</h4>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className=' cursor-pointer bg-white border border-gray-400 py-1 px-2 flex items-center gap-2'>
                                    <ArrowUpDownIcon className=' w-5' />
                                    <span>Sort By </span>

                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className="w-50  " >
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {


                                        sortOptions.map((opt) => (
                                            <DropdownMenuRadioItem
                                                key={opt.id}
                                                value={opt.id}
                                                className="cursor-pointer "
                                            >
                                                {opt.label}
                                            </DropdownMenuRadioItem>
                                        ))

                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <SelectSeparator className='my-4' />
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                    {
                        productList && productList.length > 0 ?
                            productList.map((product) => {
                                return <ShopingProductCard product={product} key={product._id} handleGetProductDetail={handleGetProductDetail}
                                    handleAddToCart={handleAddToCart}
                                />
                            })
                            :
                            <div className='text-gray-600'>No product found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductListing