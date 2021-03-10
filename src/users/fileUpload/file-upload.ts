import { extname } from 'path'
const cloudinary = require('cloudinary').v2;

export const fileName = (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname))
}
export const profileUpload = async (imageFilePath) => {
    const imageData=  await cloudinary.uploader.upload(imageFilePath, { tags: 'userProfile', folder: 'upload/profiles/' });
    return imageData.secure_url;
}
