const upload_router = require('express').Router();
const multer = require('multer');
const path = require("path");
const fs = require('fs');

const { _generateRandomFolderName } = require('../../utils/random-generate');


const assets_storage = multer.memoryStorage();
const upload_storage = multer({
    storage: assets_storage
}).array("files");

upload_router.post("/", upload_storage, async (req, res) => {
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
       console.log(fileDestinations)
        // Read existing JSON data from data.json file
        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

        // Update the files array in existingData with new file destinations
        existingData.files.push(...fileDestinations);


        console.log(existingData)

        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));

        //  fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));

        res.status(200).json("User Image File Uploaded Successfully!");

    } catch (err) {
        res.status(500).json(err);
    }
})



// upload_router.put("/add",upload_storage, async (req,res) => {
//     try{
//         const folderName = `../public/assets/${_generateRandomFolderName()}`;
//         const folderPath = path.join(__dirname, '..', folderName);
//         const files = req.files

//     }catch(err){
//          res.status(500).json(err);
//     }
// });

// upload_router.delete("/delete",upload_storage, async (req,res) => {
//     try{
//         const folderName = `../public/assets/${_generateRandomFolderName()}`;
//         const folderPath = path.join(__dirname, '..', folderName);
//         const files = req.files

//     }catch(err){
//          res.status(500).json(err);
//     }
// })

module.exports = upload_router;