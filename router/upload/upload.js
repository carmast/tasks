const upload_router = require('express').Router();
const multer = require('multer');

const assets_storage  = multer.memoryStorage(); 
const upload_storage =  multer({
    storage: assets_storage
}).array("files");

upload_router.post("/",upload_storage, async (req,res) => {
    try{
        const folderName = `../public/assets/${_generateRandomFolderName()}`;
        const folderPath = path.join(__dirname, '..', folderName);
        const files = req.files

         


    }catch(err){
         res.status(500).json(err);
    }
})

module.exports= upload_router;