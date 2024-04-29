const upload_router = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const fsPromise = require("fs/promises");
const { _generateRandomFolderName } = require('../../utils/random-generate');
const { verifyToken } = require('../../utils/verify-token');


const assets_storage = multer.memoryStorage();
const upload_storage = multer({
    storage: assets_storage
}).array("files");

upload_router.post("/", upload_storage, verifyToken, async (req, res) => {
    try {

        const folderName = `public/assets/${_generateRandomFolderName()}`;
        const files = req.files;
        const fileDestinations = [];

        fs.mkdirSync(folderName, { recursive: true });

        files.forEach((file) => {
            const filePath = path.join(folderName, file?.originalname);
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) throw err;

            });
            fileDestinations.push(`${folderName}/${file?.originalname}`);
        });
        // Read existing JSON data from data.json file
        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

        // Update the files array in existingData with new file destinations
        existingData.files.push(...fileDestinations);

        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));

        //  fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));

        res.status(200).json({message: " File Uploaded Successfully!"});

    } catch (err) {
        res.status(500).json(err);
    }
})

upload_router.delete("/delete", upload_storage,verifyToken, async (req, res) => {
    try {
        const { filename } = req.query;

         if(!filename) { 
            res.status(400).json({message : "Query filename is Missing!"});
         }

        try {
            await fsPromise.access(filename, fs.constants.F_OK);
        } catch (error) {
            if (error.code === 'ENOENT') {
                res.status(404).json({
                    message: 'File not found.',
                });
                return;
            }
            throw error; // For other errors, rethrow the error
        }
        
        // Read existing JSON data from data.json file
        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        
        const updateFilesData =  existingData.files?.filter(url => url !== filename);
       
        // Update the files array in existingData with new file destinations
        existingData.files = updateFilesData ;
        
        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
        // fs.unlink(filename);

        res.status(200).json({message: "File Delete  successfully!"})
    } catch (err) {
        res.status(500).json(err);
    }
})




upload_router.get("/assets" , verifyToken ,async(req,res) => {

    try{

        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
         
        res.status(200).json(existingData?.files);

    }catch(err){
     
        res.status(500).json("Iternal Server Error");
    
    }
})

module.exports = upload_router;