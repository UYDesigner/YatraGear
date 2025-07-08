import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { deleteProductService, fetchAllProductService } from '@/services/admin/ProductService'
import { toast } from 'sonner'

const ProductCard = ({ product, setOpen, setFormData, setEditProductId, setUploadImageUrl, setExtraImages }) => {
    const {
        productName,
        featuredImage,
        featuredDescription,
        price,
        offerPrice,
        offerType,
        weight,
        weightType,
        type,
        isNewArrival,
        qty,
        ratings,
        tags
    } = product;
    const dispatch = useDispatch()

    const onEdit = async (product) => {
        setOpen(true)
        setFormData(product)
        setEditProductId(product._id),
            setUploadImageUrl(product.featuredImage);
        setExtraImages(
            (product.images || []).map((url) => ({
                url,
                file: null, // For display purposes
            }))
        );
    }

    const handleDelete = async (productId) => {
        const confirm = window.confirm("Are you sure you want to delete this Product?");
        if (!confirm) return;

        try {
            const result = await dispatch(deleteProductService({ productId })).unwrap();

            if (result.success) {
                toast.success("Product deleted successfully!");
                dispatch(fetchAllProductService());
            } else {
                toast.error(result.message || "Failed to delete product.");
            }

            // console.log("Delete response:", result);
        } catch (error) {
            // console.error("Delete error:", error);
            toast.error("Something went wrong while deleting the category.");
        }
    }
    return (
        <div className="rounded-xl shadow-md border w-[300px] p-4 bg-white h-[480px] relative px-2">
            <div className='w-[200px] h-[180px] mx-auto'>
                <img src={featuredImage} alt={productName} className="w-full  h-full object-fit rounded-lg" />
            </div>

            <div className="mt-4 absolute bottom-3">
                <h2 className="text-lg font-semibold line-clamp-2">{productName}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">{featuredDescription}</p>

                <div className="mt-2">
                    <span className="text-lg font-bold text-green-600">${offerPrice || price}</span>
                    {offerPrice !== 0 && offerPrice !== price && (
                        <span className="text-sm line-through text-gray-400 ml-2">₹{price}</span>
                    )}

                </div>

                <div className="text-sm mt-1 text-gray-500">
                    {weight} {weightType} | Type: {type}
                </div>

                <div className="text-xs text-gray-400 mt-2">
                    {isNewArrival && <span className="text-green-600 mr-2">New Arrival</span>}
                    Qty: {qty} | Ratings: {ratings}
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                    {tags && tags[0]?.split(",").map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                            {tag.trim()}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => onEdit(product)}
                    className="mt-3 inline-block bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(product._id)}
                    className=" ml-2 mt-3 inline-block bg-red-600 hover:bg-red-400 text-white px-3 py-1 rounded "
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProductCard
