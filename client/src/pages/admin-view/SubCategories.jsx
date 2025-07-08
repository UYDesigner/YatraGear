import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,

  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import ImageUpload from '@/components/admin-view/imageUpload'
import Form from '@/components/common/Form'
import { SubCatagoryFormControls } from '@/config/formConfig'
import { useDispatch, useSelector } from 'react-redux'
import { addNewSubCategoryService, editSubCategoryService, fetchAllSubCategoriesService } from '@/services/admin/SubCategoryService'
import Loader from '@/components/common/Loader'
import { toast } from 'sonner'

import SubCategoryCard from '@/components/admin-view/admin-components/SubCategoryCard'

const initialState = {
  subcategory: "",
  category: "",
  image: null
};

const SubCategories = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { categoryList } = useSelector((state) => state.adminCategory)
  const [editSubCategoryId, setEditSubCategoryId] = useState(null)
  const { subCategoryList } = useSelector((state) => {
    return state.adminSubCategory
  })
  const dispatch = useDispatch()

  // console.log("All categories", categoryList)
  const categoryOptions = categoryList?.map(cat => ({
    label: cat.category,
    value: cat._id,
  }));

  // Inject options dynamically into form control
  const formControlsWithOptions = SubCatagoryFormControls.map(control =>
    control.name === 'category'
      ? { ...control, option: categoryOptions }
      : control
  );
  const uploadImageToServer = async () => {
    // console.log("called")
    if (!imageFile) {
      setError("image is required")
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
      if (data) {
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
    // console.log(formData)
    setLoading(true)
    const { category, subcategory } = formData
    if (!category || !subcategory) {
      setError("Empty Field!");
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



    const payload = {
      subcategory, category, image: imageUrl
    }
    // console.log("", payload)
    try {

      let response;
      if (editSubCategoryId) {
        response = await dispatch(
          editSubCategoryService({ subCategoryId: editSubCategoryId, formData: JSON.stringify(payload) })
        ).unwrap();
      } else {
        response = await dispatch(addNewSubCategoryService(JSON.stringify(payload))).unwrap();
      }



      // console.log(response)


      if (response?.success) {
        // Reset form and state
        toast.success(editSubCategoryId ? "Edit Successfully" : "Add Successfully", {
          description: response?.message || "Something went wrong. Try again.",
        });
        setFormData(initialState);
        setImageFile(null);
        setUploadImageUrl('');
        setOpen(false);
        dispatch(fetchAllSubCategoriesService())



      } else {
        setError(response.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Server error while saving sub category.");
    } finally {
      setLoading(false)
    }
  }

  // console.log("subCategoryList", subCategoryList)

  return (
    <>
      <div className='font-fire gird gap-4 md: grid-cols-3 lg:grid-cols-4' >
        <Sheet open={open}
          onOpenChange={(value) => {
            if (!value) {
              setFormData(initialState);
              setEditSubCategoryId(null);
              setImageFile(null);
              setUploadImageUrl('');
            } setFormData(initialState);
            setOpen(value);
          }}
          className='z-10' >
          <SheetContent side="right" className={'w-84'}>
            {loading && (
              <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-50">
                <Loader />
              </div>
            )}
            <div className='flex flex-col h-full '>
              <SheetHeader className={'border-b'}>
                <SheetTitle className='text-xl text-gray-800 font-semibold'>
                  {
                    editSubCategoryId ? "Edit Category" : "Add New Category"
                  }

                </SheetTitle>
              </SheetHeader>
              <div className=' px-2'>

                <ImageUpload
                  imageFile={imageFile} setImageFile={setImageFile}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadImageUrl={setUploadImageUrl}
                />

                <Form
                  formControls={formControlsWithOptions}
                  buttonText={
                    editSubCategoryId ? "Edit " : "Add"
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
          <h1 className='text-xl text-gray-800 font-semibold' >Sub Categories</h1>
          <Button onClick={() => setOpen(true)} className="bg-white shadow-sm text-[#6e73d6] border-1 border-[#858ae2] hover:bg-[#858ae2] cursor-pointer hover:text-white text-[15px]">
            Add New Sub Category
          </Button>
        </div>
        <div className='grid my-4 place-items-center gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {subCategoryList && subCategoryList.length > 0 ? (
            subCategoryList.map((subCategory) => (
              <SubCategoryCard key={subCategory._id} subCategory={subCategory}
                setOpen={setOpen} setFormData={setFormData} setEditSubCategoryId={setEditSubCategoryId} setUploadImageUrl={setUploadImageUrl}
              />
            ))
          ) : (
            <p className='col-span-full text-gray-500 text-center'>No sub categories found.</p>
          )}

        </div>
      </div>
      {
        loading && <Loader />
      }
    </>
  )
}

export default SubCategories

