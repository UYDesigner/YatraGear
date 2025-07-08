import React, { useEffect, useState } from 'react'
import ImageUpload from '@/components/admin-view/imageUpload'
import { Button } from '@/components/ui/button'
import { addFeaturedImageService, getAllFeaturesImageService } from '@/services/admin/FeaturedService'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const DashBoard = () => {
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { features } = useSelector(state => state.adminFeaturedImage)
  const dispatch = useDispatch()

  const uploadImageToServer = async () => {
    if (!imageFile) {
      toast.error("Please select an image.")
      return null;
    }

    try {
      const formData = new FormData()
      formData.append("image", imageFile)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload-image`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const data = await response.json()
      if (data?.result?.secure_url) {
        return data.result.secure_url
      } else {
        toast.error("Image upload failed.")
        return null
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Image upload failed!")
      return null
    }
  }

  const handleImageSubmit = async () => {
    if (!imageFile && !uploadedImageUrl) {
      toast.error("Choose a featured image first.")
      return;
    }

    setLoading(true)
    try {
      let imageUrl = uploadedImageUrl

      // Upload if local blob or newly selected file
      if (imageFile && (!uploadedImageUrl || uploadedImageUrl.startsWith("blob:"))) {
        const uploadedUrl = await uploadImageToServer()
        if (!uploadedUrl) {
          setLoading(false)
          return
        }
        imageUrl = uploadedUrl
        setUploadImageUrl(uploadedUrl)
      }

      // Dispatch action to store in DB
      const response = await dispatch(addFeaturedImageService({ image: imageUrl }))
      // console.log("Image added:", response)
      dispatch(getAllFeaturesImageService())
      toast.success("Featured image added successfully!")


    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.")
    } finally {
      setImageFile("")
      setUploadImageUrl("")
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getAllFeaturesImageService())
  }, [dispatch])

  // console.log(features)

  return (
    <div className='w-full p-6 flex flex-col gap-10'>
      <div className=" max-w-[1000px] mx-auto w-full   bg-white  font-fire">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Featured Image</h2>

        <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadImageUrl={setUploadImageUrl}
        />

        <Button
          className="w-full mt-6 py-2"
          onClick={handleImageSubmit}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>
      {/* show all featured images */}
      <div className="featured-images flex flex-col gap-2">
        {
          features && features.length > 0 ? (
            features.map((featuredImage) => (
              <div className='w-full h-[100px] lg:h-[200px]' key={featuredImage._id}>
                <img
                  src={featuredImage?.image}
                  alt="featuredImage"
                  className="  w-full h-full lg:object-cover rounded-md"
                />
              </div>
            ))
          ) : (
            <div>No featured images found.</div>
          )
        }
      </div>

    </div>
  )
}

export default DashBoard
