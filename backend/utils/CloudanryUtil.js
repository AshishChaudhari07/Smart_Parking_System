import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // Load environment variables

// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadFileToCloudinary = async (file) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.path);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload file to Cloudinary");
    }
};

export { uploadFileToCloudinary };
