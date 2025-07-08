import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { deleteCategoryService, fetchAllCategoriesService } from '@/services/admin/CategoryService';
import { toast } from 'sonner';


const CategoryCard = ({ category, setOpen, setFormData, setEditCategoryId, setUploadImageUrl }) => {
    const dispatch = useDispatch()

    const handleEdit = (categoryId, formData) => {
        setEditCategoryId(categoryId);

        setFormData({
            category: formData.category,
            image: formData.image
        });
        setUploadImageUrl(formData.image);
        setOpen(true)
    }

    const handleDelete = async (categoryId) => {
        const confirm = window.confirm("Are you sure you want to delete this category?");
        if (!confirm) return;

        try {
            const result = await dispatch(deleteCategoryService({ categoryId })).unwrap();

            if (result.success) {
                toast.success("Category deleted successfully!");
                dispatch(fetchAllCategoriesService());
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



            {/* Title */}
            <CardContent className="px-4 flex flex-col gap-2 ">
               <div className='w-full h-[200px]'>
                 <img
                    src={category?.image}
                    alt={category?.category}
                    className="w-full h-full object-fit rounded-t-xl"
                />
               </div>

                <h2 className="text-lg font-semibold text-gray-800 text-center capitalize">
                    {category?.category}
                </h2>
                <div className='w-full flex gap-2'>
                    <Button onClick={() => handleEdit(category._id, category)} className="flex-1 bg-[#8589e2] hover:bg-[#555a9d] text-white text-sm font-medium">
                    Edit
                </Button>
                <Button onClick={() => handleDelete(category._id)} className="flex-1 bg-gray-700 hover:bg-gray-500 text-white text-sm font-medium">
                    Delete
                </Button>
                </div>
            </CardContent>

            {/* Action Buttons */}
            {/* <CardFooter className="px-4 py-3 flex gap-2">
                
            </CardFooter> */}
        </Card>
    );
};

export default CategoryCard;
