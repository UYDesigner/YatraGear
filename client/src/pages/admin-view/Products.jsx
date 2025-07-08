import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,

  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import Form from '@/components/common/Form'
import ImageUpload from '@/components/admin-view/imageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner";
import Loader from '@/components/common/Loader'
import { productFormControls } from '@/config/formConfig'
import { addNewProductService, editProductService, fetchAllProductService } from '@/services/admin/ProductService'
import ProductCard from '@/components/admin-view/admin-components/ProductCard/ProductCard'
import MultiImageUpload from '@/components/admin-view/MultiImageUpload'
const initialState = {
  categoryId: "",
  subcategoryId: '',
  brandId: "",
  productName: "",
  featuredDescription: "",
  Description: "",
  type: "",
  weight: 0,
  weightType: "",
  qty: 0,
  price: 0,
  offerPrice: 0,
  offerType: "",
  featuredImage: null,
  images: [],
  tags: [],
  reviews: 0,
  isNewArrival: "",
  ratings: 0
}

const Products = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [extraImages, setExtraImages] = useState([])
  const [imageFile, setImageFile] = useState("")
  const [uploadedImageUrl, setUploadImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [editProductId, setEditProductId] = useState(null)
  const { categoryList } = useSelector((state) => state.adminCategory)
  const { brandsList } = useSelector((state) => (state.adminBrand))
  const { subCategoryList } = useSelector((state) => {
    return state.adminSubCategory
  })
  const { productList } = useSelector((state) => state.adminProduct)
  // console.log(productList)

  const dispatch = useDispatch()
  const categoryOptions = categoryList?.map(cat => ({
    label: cat.category,
    value: cat._id,
  }));
  const subCategoryOptions = subCategoryList?.filter(subCat => subCat.category === formData.categoryId).map((subCat) => ({
    label: subCat.subcategory,

    value: subCat._id
  })) || []
  const brandOptions = formData.subcategoryId ? brandsList?.map((brand) => ({
    label: brand.brandName,
    value: brand._id
  })) : []



  const FormControl = productFormControls.map((control) => {
    if (control.name === "categoryId")
      return { ...control, option: categoryOptions }
    if (control.name === "subcategoryId")
      return { ...control, option: subCategoryOptions }
    if (control.name === "subcategoryId")
      return { ...control, option: subCategoryOptions }
    if (control.name === "brandId")
      return { ...control, option: brandOptions }

    return control
  })

  const uploadImageToServer = async () => {
    if (!imageFile) {
      editProductId ? "" : setError("image is required")
      return null;
    }

    try {
      const form = new FormData()
      form.append("image", imageFile);


      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-image`, {
        method: "POST",
        body: form,
        credentials: "include",
      })
      const data = await response.json();
      // console.log("image upload result --->", data)
      if (data.success) {
        return data.result.secure_url;
      } else {
        setError("Image upload failed")
        return null;
      }

    } catch (error) {
      console.error("Upload error:", error);
      setError("Image upload failed!");
      return null;
    }
  }
  const uploadMuiltiPleImagesToCloud = async () => {
    const uploadedUrls = [];
    for (const imgObj of extraImages) {
      const form = new FormData();
      form.append("image", imgObj.file);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-image`, {
          method: "POST",
          body: form,
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          uploadedUrls.push(data.result.secure_url);
        } else {
          toast.error("One or more image uploads failed");
          return null;
        }


      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Image upload error");
        return null;
      }
    }
    return uploadedUrls;

  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { categoryId,
      subcategoryId,
      brandId,
      productName,
      featuredDescription,
      Description,
      type,
      weight,
      weightType,
      qty,
      price,
      offerPrice,
      offerType,
      reviews,
      ratings,
      tags,
      isNewArrival } = formData
    // console.log(formData)
    if (!categoryId || !subcategoryId || !brandId || !productName ||
      !featuredDescription || !Description || !type || !weight || !weightType || !qty || !price || !isNewArrival
    ) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }


    if (!editProductId && !imageFile) {
      toast.error("Image is required!");
      setLoading(false);
      return;
    }
    setError("")

    let imageUrl = uploadedImageUrl;

    if (imageFile && (!uploadedImageUrl || uploadedImageUrl.startsWith("blob:"))) {
      const uploaded = await uploadImageToServer();
      if (!uploaded) {
        setError("Image upload failed");
        setLoading(false);
        return;
      }
      imageUrl = uploaded;
      setUploadImageUrl(uploaded);
    }

    const uploadedExtraTmages = await uploadMuiltiPleImagesToCloud()
    const finalFormData = {
      ...formData,
      featuredImage: imageUrl,
      images: uploadedExtraTmages
    };

    try {

      let response;
      if (editProductId) {
        response = await dispatch(
          editProductService({ productId: editProductId, formData: JSON.stringify(finalFormData) })
        ).unwrap();
      } else {
        // console.log(finalFormData)
        response = await dispatch(addNewProductService(JSON.stringify(finalFormData))).unwrap();
      }



      // console.log(response)


      if (response?.success) {
        // Reset form and state
        toast.success(editProductId ? "Edit Successfully" : "Add Successfully", {
          description: response?.message || "Something went wrong. Try again.",
        });
        setFormData(initialState);
        setImageFile(null);
        setUploadImageUrl('');
        setOpen(false);
        setExtraImages([])
        dispatch(fetchAllProductService())



      } else {
        setError(response.message || "Something went wrong!");
      }

    } catch (error) {
      console.error("Submit error:", error);
      setError("Server error while saving Product.");
    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      subcategoryId: ""
    }))
  }, [formData.categoryId])

  useEffect(() => {
    dispatch(fetchAllProductService())
  }, [dispatch])

  return (

    <>

      <div className='font-fire'>
        <Sheet open={open}
          onOpenChange={(value) => {
            if (!value) {
              setFormData(initialState);
              setEditProductId(null);
              setImageFile(null);
              setUploadImageUrl('');
            } setFormData(initialState);
            setOpen(value);
          }}
          className='z-10' >
          <SheetContent side="right" className="w-full sm:max-w-lg"> {/* increased width */}
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="border-b">
                <SheetTitle className="text-xl text-gray-800 font-semibold">
                  {editProductId ? "Edit Product" : "Add New Product"}
                </SheetTitle>
              </SheetHeader>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                {/* Featured Image Upload */}
                <ImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadImageUrl={setUploadImageUrl}
                />
                <MultiImageUpload
                  extraImages={extraImages}
                  setExtraImages={setExtraImages}
                />

                {/* Form */}
                <Form
                  formControls={FormControl}
                  buttonText={editProductId ? "Edit" : "Add"}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                />

                {/* Error message */}
                {error && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </SheetContent>

        </Sheet>
        <div className="head-area flex items-center justify-between">
          <h1 className='text-xl text-gray-800 font-semibold' >Products</h1>
          <Button onClick={() => setOpen(true)} className="bg-white shadow-sm text-[#6e73d6] border-1 border-[#858ae2] hover:bg-[#858ae2] cursor-pointer hover:text-white text-[15px]">
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-5 place-items-center my-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ProductCard key={product._id} product={product}
                setOpen={setOpen} setFormData={setFormData} setEditProductId={setEditProductId}
                setExtraImages={setExtraImages}
                setUploadImageUrl={setUploadImageUrl}
              />
            ))
          ) : (
            <p className='col-span-full text-gray-500 text-center'>No product found.</p>
          )}

        </div>
      </div>
    </>
  )
}

export default Products