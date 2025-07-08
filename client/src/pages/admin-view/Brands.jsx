import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,

  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import { toast } from "sonner";
import ImageUpload from '@/components/admin-view/imageUpload';
import Form from '@/components/common/Form';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/common/Loader'
import { Button } from '@/components/ui/button';
import { BrandFormControls } from '@/config/formConfig';
import { addNewBrand, editBrandService, fetchAllBrandService } from '@/services/admin/BrandService';
import BrandCard from '@/components/admin-view/admin-components/BrandCard';

const initialState = {
  brandName: '',
  image: null
}

const Brands = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [editBrandId, setEditBrandId] = useState(null)
  const { brandsList } = useSelector((state) => (state.adminBrand))
  const dispatch = useDispatch()

  const uploadImageToServer = async () => {
    if (!imageFile) {
      editBrandId ? "" : setError("image is required")
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

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { brandName } = formData
    // console.log(formData)
    if (!brandName) {
      setError("Brand name is required!");
      setLoading(false);
      return;
    }

    if (!editBrandId && !imageFile) {
      setError("Image is required!");
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
      brandName, image: imageUrl
    }
    // console.log(payload)
    try {
      let response;
      if (editBrandId) {
        response = await dispatch(
          editBrandService({ brandId: editBrandId, formData: JSON.stringify(payload) })
        ).unwrap();
      } else {
        response = await dispatch(addNewBrand(JSON.stringify(payload))).unwrap();
      }



      // console.log(response)


      if (response?.success) {

        toast.success(editBrandId ? "Edit Successfully" : "Add Successfully", {
          description: response?.message || "Something went wrong. Try again.",
        });
        setFormData(initialState);
        setImageFile(null);
        setUploadImageUrl('');
        setOpen(false);
        dispatch(fetchAllBrandService());


      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Server error while saving brand.");
    } finally {
      setLoading(false)
    }
  }



  // console.log(brandsList)


  return (
    <>
      <div className='font-fire ' >
        <Sheet open={open}
          onOpenChange={(value) => {
            if (!value) {
              setFormData(initialState);
              setEditBrandId(null);
              setImageFile(null);
              setUploadImageUrl('');
            }
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
                    editBrandId ? "Edit Brand" : "Add New Brand"
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
                  formControls={BrandFormControls}
                  buttonText={
                    editBrandId ? "Edit " : "Add"
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
          <h1 className='text-xl text-gray-800 font-semibold' >Brands</h1>
          <Button onClick={() => {
            // Reset state *before* opening the sheet
            setEditBrandId(null);
            setFormData(initialState);
            setImageFile(null);
            setUploadImageUrl('');
            setOpen(true);
          }} className="bg-white shadow-sm text-[#6e73d6] border-1 border-[#858ae2] hover:bg-[#858ae2] cursor-pointer hover:text-white text-[15px]">
            Add New Brand
          </Button>
        </div>
        <div className='grid my-4 place-items-center gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {brandsList && brandsList.length > 0 ? (
            brandsList.map((product) => (
              <BrandCard key={product._id}
                brand={product} setOpen={setOpen} setFormData={setFormData} setEditBrandId={setEditBrandId} setUploadImageUrl={setUploadImageUrl} />
            ))
          ) : (
            <p className='col-span-full text-gray-500 text-center'>No brand found.</p>
          )}

        </div>
      </div>



    </>
  )
}

export default Brands