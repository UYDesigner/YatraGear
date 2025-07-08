import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { deleteBrandService, fetchAllBrandService } from '@/services/admin/BrandService';

const BrandCard = ({ brand, setOpen, setFormData, setEditBrandId, setUploadImageUrl }) => {
    const dispatch = useDispatch()
    const handleEdit = (brandId) => {
        setEditBrandId(brandId);
        setFormData({
            brandName: brand.brandName
        });
        setUploadImageUrl(brand.image);
        setOpen(true)
    }

    const handleDelete = async (brandId) => {
        const confirm = window.confirm("Are you sure you want to delete this brand?");
        if (!confirm) return;

        try {
            const result = await dispatch(deleteBrandService({ brandId })).unwrap();

            if (result.success) {
                toast.success("Brand deleted successfully!");
                dispatch(fetchAllBrandService());
            } else {
                toast.error(result.message || "Failed to delete category.");
            }

            // console.log("Delete response:", result);
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong while deleting the category.");
        }
    };
    return (
        <Card className="w-full mx-auto rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Image */}
            <CardContent className="   flex flex-col gap-2  items-center ">
                <div className='bg-red w-[150px] h-[150px]  '>
                    <img
                        src={brand?.image}
                        alt={brand?.brandName}
                        className="w-full h-full object-fit rounded-t-xl" 

                    />
                </div>


                <h2 className="text-lg font-semibold text-gray-800 text-center capitalize">
                    {brand?.brandName}
                </h2>
                <div className='w-full flex gap-2'>
                    <Button onClick={() => handleEdit(brand._id)} className="flex-1 bg-[#8589e2] hover:bg-[#555a9d] text-white text-sm font-medium">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(brand._id)} className="flex-1 bg-gray-700 hover:bg-gray-500 text-white text-sm font-medium">
                        Delete
                    </Button>
                </div>
            </CardContent>

        </Card>
    )
}

export default BrandCard