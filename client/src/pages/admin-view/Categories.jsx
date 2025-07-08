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
import CategoryCard from '@/components/admin-view/admin-components/Card'
import { addNewCategoryService, editCategoryService, fetchAllCategoriesService } from '@/services/admin/CategoryService'
import { CatagoryFormControls } from '@/config/formConfig'

const initialState = {
  category: '',
  image: null
}

const Categories = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [editCategoryId, setEditCategoryId] = useState(null)

  const dispatch = useDispatch()
  const { categoryList } = useSelector((state) => state.adminCategory)


  const uploadImageToServer = async () => {
    if (!imageFile) {
      editCategoryId ? "" : setError("image is required")
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
      // console.log("image upload result", data)
      if (data && data.result && data.result.secure_url) {
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



  const onSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    const { category } = formData
    if (!category) {
      setError("Category name is required");
      setLoading(false);
      return;
    }

    // console.log(formData)
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
      setUploadImageUrl(uploaded); // ✅ Store the actual URL
    }




    const payload = {
      category, image: imageUrl
    }
    try {
      let response;
      if (editCategoryId) {
        response = await dispatch(
          editCategoryService({ categoryId: editCategoryId, formData: JSON.stringify(payload) })
        ).unwrap();
      } else {
        response = await dispatch(addNewCategoryService(JSON.stringify(payload))).unwrap();
      }



      // console.log(response)


      if (response?.success) {
        // Reset form and state
        toast.success(editCategoryId ? "Edit Successfully" : "Add Successfully", {
          description: response?.message || "Something went wrong. Try again.",
        });
        setFormData(initialState);
        setImageFile(null);
        setUploadImageUrl('');
        setOpen(false);
        dispatch(fetchAllCategoriesService());



      } else {
        setError(response.message || "Something went wrong!");
      }

    } catch (error) {
      console.error("Submit error:", error);
      setError("Server error while saving category.");
    } finally {
      setLoading(false)
    }



  }

  // console.log("imageFile:", imageFile)
  // console.log("uploadedImageUrl:", uploadedImageUrl)


  useEffect(() => {
    dispatch(fetchAllCategoriesService())
      .then((result) => {
        // console.log("All categories ---->", result);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, [dispatch]);

  // console.log("categoryList", categoryList)

  return (
    <>
      <div className='font-fire gird gap-4 md: grid-cols-3 lg:grid-cols-4'>
        <Sheet open={open}
          onOpenChange={(value) => {
            if (!value) {
              setFormData(initialState);
              setEditCategoryId(null);
              setImageFile(null);
              setUploadImageUrl('');
            } setFormData(initialState);
            setOpen(value);
          }}
          className='z-10' >
          <SheetContent side="right" className={'w-84'}>
            <div className='flex flex-col h-full '>
              <SheetHeader className={'border-b'}>
                <SheetTitle className='text-xl text-gray-800 font-semibold'>
                  {
                    editCategoryId ? "Edit Category" : "Add New Category"
                  }
                </SheetTitle>
              </SheetHeader>
              <div className='py-6 px-2'>

                <ImageUpload
                  imageFile={imageFile} setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadImageUrl={setUploadImageUrl}
                />

                <Form
                  formControls={CatagoryFormControls}
                  buttonText={
                    editCategoryId ? "Edit " : "Add"
                  }
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={onSubmit}
                />
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
          <h1 className='text-xl text-gray-800 font-semibold' >Categories</h1>
          <Button onClick={() => setOpen(true)} className="bg-white shadow-sm text-[#6e73d6] border-1 border-[#858ae2] hover:bg-[#858ae2] cursor-pointer hover:text-white text-[15px]">
            Add New Category
          </Button>
        </div>
        <div className='grid my-4 place-items-center gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {categoryList && categoryList.length > 0 ? (
            categoryList.map((product) => (
              <CategoryCard key={product._id} category={product} setOpen={setOpen} setFormData={setFormData} setEditCategoryId={setEditCategoryId} setUploadImageUrl={setUploadImageUrl} />
            ))
          ) : (
            <p className='col-span-full text-gray-500 text-center'>No categories found.</p>
          )}

        </div>

      </div>
      {
        loading && <Loader />
      }
    </>
  )
}

export default Categories