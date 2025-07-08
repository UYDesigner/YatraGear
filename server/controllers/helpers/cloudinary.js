const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const storage = new multer.memoryStorage();

const upload = multer({ storage });

async function imageUploadUtils(file) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            timeout: 60000 // 60 sec timeout, default kam hota hai
        });
        return result;
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return null; // fail hone par null bhejo
    }
}




module.exports = { upload, imageUploadUtils }