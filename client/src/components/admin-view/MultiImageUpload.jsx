import React from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';


const MultiImageUpload = ({ extraImages, setExtraImages }) => {

    const handleImageChange = (e) => {
        // if (extraImages.length + files.length > 5) {
        //     toast.error("You can only upload up to 5 images.");
        //     return;
        // }

        const files = Array.from(e.target.files);

        // Convert to preview URL and keep raw files
        const updatedImages = files.map((file) => ({
            preview: URL.createObjectURL(file),
            file,
        }));

        setExtraImages((prev) => [...prev, ...updatedImages]);
    };

    const handleRemove = (index) => {
        setExtraImages(extraImages.filter((_, i) => i !== index));
    }

    // console.log(extraImages)
    return (
        <div className='space-y-2'>
            <Label className="font-medium">Upload Additional Images</Label>
            <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full"
            /> <div className="grid grid-cols-3 gap-2 mt-2">
                {extraImages.map((img, index) => (
                    <div key={index} className="relative">
                        <img
                            src={img.preview || img}
                            alt={`upload-${index}`}
                            className="w-full h-24 object-cover rounded"
                        />
                        <button
                            onClick={() => handleRemove(index)}
                            className="absolute top-1 right-1 text-xs text-red-600 bg-white px-1 rounded"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MultiImageUpload