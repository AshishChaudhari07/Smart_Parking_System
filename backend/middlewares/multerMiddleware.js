import multer from "multer";
import { uploadFileToCloudinary } from '../utils/CloudanryUtil.js'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },  
    filename:(req,file,cb) => {
        cb(null, file.originalname)
        }
})

export const upload = multer({
    storage,
})