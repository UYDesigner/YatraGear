import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

const SecondHeader = ({handleNavigateToListing}) => {
    const { categoryList } = useSelector((store) => store.
        adminCategory)
    // console.log(categoryList)
    const { subCategoryList } = useSelector((store) => store.adminSubCategory)
    const [filterSubCategory, setFilterSubCategory] = useState([])
  
    const handleFilteration = (categoryId) => {
        const filtered = subCategoryList.filter((sub) =>
            sub.category === categoryId

        )
        setFilterSubCategory(filtered)
    }
    



    return (
        <div className=' w-full sticky top-0 z-40  border-b-1 border-gray-200 hidden lg:block'>

            <div className='bg-white lg:max-w-[1500px] mx-auto py-2 px-2 flex justify-between items-center' >
                {
                    categoryList.map((category) => (
                        <HoverCard key={category._id} >
                            <HoverCardTrigger asChild>
                                <div  onMouseEnter={() => handleFilteration(category._id)}  className=' text-[#616630] font-[500] cursor-pointer'>
                                    {category.category}
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <h3 className='text-xl font-semibold mb-3'> Sub Categories</h3>

                                {
                                    filterSubCategory.map((subCat) => (
                                        <div key={subCat._id} 
                                        onClick={()=>handleNavigateToListing(category._id,subCat._id )}
                                        className='font-fire  cursor-pointer  text-gray-600 hover:text-black'>
                                            {subCat.subcategory}
                                        </div>


                                    ))
                                }
                            </HoverCardContent>

                        </HoverCard>
                    ))
                }
            </div>

        </div>
    )
}

export default SecondHeader