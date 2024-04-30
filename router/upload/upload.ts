import  express  from 'express' ;
import  multer  from 'multer';

import  { _generateRandomFolderName }  from '../../utils/random-generate';
import { verifyToken } from '../../utils/verify-token';
import { _createfilestorage, _deletefilestorage, _getassetslists } from '../../controller/upload.controller';

const upload_router = express.Router();

const assets_storage = multer.memoryStorage();
const upload_storage = multer({
    storage: assets_storage
}).array("files");

upload_router.post("/", upload_storage, verifyToken , _createfilestorage);
upload_router.delete("/delete",verifyToken, _deletefilestorage);
upload_router.get("/assets" , verifyToken ,_getassetslists);

export default  upload_router;