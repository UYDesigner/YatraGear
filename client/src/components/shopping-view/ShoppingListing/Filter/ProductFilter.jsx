import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from 'react-icons/fa6';

const ProductFilter = ({ filters, handleFilter }) => {
    const { categoryList } = useSelector((store) => store.adminCategory)
    const { subCategoryList } = useSelector((store) => store.adminSubCategory)
    const { brandsList } = useSelector((store) => store.adminBrand)
    const [categoryDropDownOpen, setCategoryDropDownOpen] = useState(true)
    const [subcategoryDropDownOpen, setSubCategoryDropDownOpen] = useState(false)
    const [brandDropDownOpen, setBrandDropDownOpen] = useState(false)

    return (
        <aside className=" min-h-screen px-4 border-r bg-white  overflow-y-auto">
            <h2 className=" text-2xl font-semibold mb-4 text-[#3f4519]">FILTER BY</h2>
            <Separator className="mb-2" />
            {/* Category Filter */}
            <div className="mb-6">
                <h4 onClick={() => setCategoryDropDownOpen(!categoryDropDownOpen)} className="  text-lg font-semibold text-black mb-2 flex items-center justify-between">
                    <span>Category</span>
                    {
                        categoryDropDownOpen ?
                            <FaChevronUp /> :
                            <FaChevronDown />
                    }



                </h4>
                {
                    categoryDropDownOpen ?
                        <div className="space-y-2">
                            {categoryList.map((cat) => (
                                <label key={cat._id} className="flex items-center space-x-2 text-gray-600">
                                    <Checkbox
                                        checked={filters['category']?.includes(cat._id) || false  }
                                        onCheckedChange={() => handleFilter('category', cat._id)}
                                        id={cat._id} />
                                    <span>{cat.category}</span>
                                </label>
                            ))}
                        </div>
                        :
                        <></>
                }

            </div>
            <Separator className="mb-2" />
            {/* Subcategory Filter */}
            <div className="mb-6">
                <h4 onClick={() => setSubCategoryDropDownOpen(!subcategoryDropDownOpen)} className="  text-lg font-semibold text-black mb-2 flex items-center justify-between">
                    <span>Subcategory</span> 
                    {
                        subcategoryDropDownOpen ?
                            <FaChevronUp /> :
                            <FaChevronDown />
                    }


                </h4>

                {
                    subcategoryDropDownOpen ?
                        <div className="space-y-2">
                            {subCategoryList.map((sub) => (
                                <label key={sub._id} className="flex items-center space-x-2 text-gray-600">
                                    <Checkbox
                                        checked={filters['subcategory']?.includes(sub._id) || false }
                                        onCheckedChange={() => handleFilter('subcategory', sub._id)}

                                        id={sub._id} />
                                    <span>{sub.subcategory}</span>
                                </label>
                            ))}
                        </div>
                        : <></>
                }

            </div>
            <Separator className="mb-2" />
            {/* Brand Filter */}
            <div className="mb-6">
                <h4 onClick={() => setBrandDropDownOpen(!brandDropDownOpen)} className="  text-lg font-semibold text-black mb-2 flex items-center justify-between">
                    <span>Brand</span>
                    {
                        brandDropDownOpen ?
                            <FaChevronUp /> :
                            <FaChevronDown />
                    }


                </h4>
                {
                    brandDropDownOpen ?
                        <div className="space-y-2">
                            {brandsList.map((brand) => (
                                <label key={brand._id} className="flex items-center space-x-2 text-gray-600">
                                    <Checkbox
                                        checked={filters['brand']?.includes(brand._id)|| false }
                                        onCheckedChange={() => handleFilter('brand', brand._id)}
                                        id={brand._id} />
                                    <span>{brand.brandName}</span>
                                </label>
                            ))}
                        </div>
                        :
                        <></>
                }


            </div>
        </aside>
    )
}

export default ProductFilter
