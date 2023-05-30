import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer'
import secret from '../config/secret.js';

cloudinary.config({
    cloud_name: secret.CLOUDINARY_NAME,
    api_key: secret.CLOUDINARY_API_KEY,
    api_secret: secret.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ProfilePictures',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({ storage: storage });
export { upload }