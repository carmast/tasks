import  path from "path";
import  fs from 'fs';
import fsPromise from "fs/promises";
import  { _generateRandomFolderName }  from '../utils/random-generate';
import { Request, Response } from "express";

export const  _createfilestorage  = async (req: Request,res : Response) => {
    try {

        const folderName = `public/assets/${_generateRandomFolderName()}`;
        const files = req.files as Express.Multer.File[];
        const fileDestinations : string[] = [];

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
}

export const _deletefilestorage = async (req: Request,res : Response)  => {
    try {
        const { filename } = req.query;

         if(!filename) { 
            res.status(400).json({message : "Query filename is Missing!"});
         }

        try {
            await fsPromise.access(filename as string, fs.constants.F_OK);
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
        
        const updateFilesData =  existingData.files?.filter((url: string) => url !== filename);
       
        // Update the files array in existingData with new file destinations
        existingData.files = updateFilesData ;
        
        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
        // fs.unlink(filename);

        res.status(200).json({message: "File Delete  successfully!"})
    } catch (err) {
        res.status(500).json(err);
    }
} 

export const _getassetslists = ( _:Request  ,res: Response ) =>  { 
    try{

        const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
         
        res.status(200).json(existingData?.files);

    }catch(err){
     
        res.status(500).json("Iternal Server Error");
    
    }
}