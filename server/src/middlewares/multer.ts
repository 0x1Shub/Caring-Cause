import multer from "multer";
import {v4 as uuid} from "uuid";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback){
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${id}.${extName}`;
        callback(null, fileName);
    }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
  }
};



export const singleUpload = multer({storage, fileFilter}).single("photo");