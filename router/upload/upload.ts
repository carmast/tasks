import  express  from 'express' ;
import  multer  from 'multer';

import  { _generateRandomFolderName }  from '../../utils/random-generate';
import { verifyToken } from '../../utils/verify-token';
import {uploadController} from '../../controller/upload.controller';

const upload_router = express.Router();
//create multer storage for files 
const assets_storage = multer.memoryStorage();
const upload_storage = multer({
    storage: assets_storage
}).array("files");

//upload controller in router
upload_router.post("/", upload_storage, verifyToken , uploadController.upload_asssets);
upload_router.delete("/delete",verifyToken, uploadController.delete_assets);
upload_router.get("/assets" , verifyToken ,uploadController.get_assets_lists);

export default  upload_router;