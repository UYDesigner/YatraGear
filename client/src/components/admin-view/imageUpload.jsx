import React, { useRef } from 'react'
import { UploadCloud } from 'lucide-react'
import { Label } from '../ui/label'

const ImageUpload = ({ imageFile, setImageFile, uploadedImageUrl, setUploadImageUrl }) => {
  const inputRef = useRef(null)

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImageFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setUploadImageUrl(url)
    }
  }

  const handleUploadClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full mx-auto py-4">
      <Label className="text-lg font-semibold mb-2 block text-gray-800">
        Upload Image
      </Label>

      {/* Hidden file input */}
      <input
        type="file"
        id="imageUpload"
        ref={inputRef}
        onChange={handleImageFileChange}
        className="hidden"
      />

      {/* Custom upload box */}
      <div
        onClick={handleUploadClick}
        className="border-dashed border-2 border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center transition"
      >
        <UploadCloud className="text-gray-500 w-10 h-10" />
        <p className="text-sm text-gray-500 mt-2">Click to upload</p>
      </div>

      {/* Preview */}
      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          alt="Preview"
          className="mt-2 h-24 w-auto object-contain rounded border"
        />
      )}
    </div>
  )
}

export default ImageUpload
