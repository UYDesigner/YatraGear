import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux'
import { deleteSubCategoryService, fetchAllSubCategoriesService } from '@/services/admin/SubCategoryService';
import { toast } from 'sonner';
import { useEffect } from 'react';

const SubCategoryCard = ({ subCategory, setOpen, setFormData, setEditSubCategoryId, setUploadImageUrl }) => {
    const { categoryList } = useSelector((state) => (state.adminCategory))
    const dispatch = useDispatch()
    const category = categoryList.find((category) => category._id === subCategory.category);

    const handleEdit = (subCategoryId) => {
        setOpen(true)
        setFormData(subCategory)
        setEditSubCategoryId(subCategoryId)
        setUploadImageUrl(subCategory.image)
    }

    const handleDelete = async (subCategoryId) => {
        //  e.
        const confirm = window.confirm("Are you sure you want to delete this sub category?");
        if (!confirm) return;
        try {
            const result = await dispatch(deleteSubCategoryService({ subCategoryId })).unwrap();
            // console.log(result)
            if (result.success) {
                toast.success("Sub category deleted successfully!");
                dispatch(fetchAllSubCategoriesService())
            } else {
                toast.error(result.message || "Failed to delete sub category.");
            }

        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong while deleting the category.");
        }
    }
    useEffect(() => {
        // dispatch(fetchAllCategoriesService())
        dispatch(fetchAllSubCategoriesService())
    }, [])
    // console.log(subCategory)
    return (
        <Card className="w-full mx-auto rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

            <CardContent className="px-4 py-2 flex flex-col gap-2 items-center">

                <div className='bg-red w-[150px] h-[150px]  '>
                    <img
                        src={subCategory?.image}
                        alt={subCategory?.subcategory}
                        className="w-full h-full  object-fit rounded-t-xl "
                    />
                </div>


                <h2 className="text-lg font-semibold text-gray-800 text-center capitalize">
                    {subCategory?.subcategory}
                </h2>
                <h3 className="text-sm font-semibold text-gray-800 text-center capitalize">
                    Category: {category ? category.category : "Category not found"}
                </h3>
                <div className='w-full flex gap-2'>
                    <Button onClick={() => handleEdit(subCategory._id)} className="flex-1 bg-[#8589e2] hover:bg-[#555a9d] text-white text-sm font-medium">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(subCategory._id)} className="flex-1 bg-gray-700 hover:bg-gray-500 text-white text-sm font-medium">
                        Delete
                    </Button>
                </div>

            </CardContent>

        </Card>
    )
}

export default SubCategoryCard