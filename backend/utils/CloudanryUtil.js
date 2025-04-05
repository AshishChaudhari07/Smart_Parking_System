import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // Load environment variables

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadFileToCloudinary = async (file) => {
    try {
        if(!file) return null;

        // upload file to cloudinary
        const result = await cloudinary.v2.uploader.upload(file, {
            resource_type: 'auto',
        });

        // file has been uploaded succesfull
        console.log("file has been uploaded successfully", result.url)
        return result;
    } catch (error) {
        fs.unlinkSync(file) // delete the file if upload fails
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload file to Cloudinary");
    }
};

export { uploadFileToCloudinary };
