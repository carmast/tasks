import  path from "path";
import  fs from 'fs';
import fsPromise from "fs/promises";
import  { _generateRandomFolderName }  from '../utils/random-generate';
import { Request, Response } from "express";
import prismadb from "../lib/prisma";
import { User } from "@prisma/client";


//controller for upload router 
export const uploadController= {
    upload_asssets  : async (req: Request,res : Response) => {
        try {
            const userFiles = await prismadb.user.findUnique({
                where: {
                      id :req?.query?.id  as string
                },
            })

             if(!userFiles){
                res.status(404).json("Url Query Missing User Id OR Id OR Not Exist User !");

             }

            const folderName = `public/assets/${_generateRandomFolderName()}`;
            const files = req.files as Express.Multer.File[];

            if(files.length  === 0 ){
                 res.status(404).json("missing files");
                 return;
            }
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
     
             userFiles?.files.push(...fileDestinations)
    
            
            await prismadb.user.update({
                where: {
                    id :req?.query?.id  as string
                },
                data:{
                  files: userFiles?.files
                }
            })

            res.status(200).json({message: "File Uploaded Successfully!"});
    
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    
    delete_assets : async (req: Request,res : Response)  => {
        try {
            const { filename , id } = req.query;
    
             if(!filename || !id) { 
                res.status(400).json({message : "Query filename OR id is Missing!"});
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
            const existingData = await prismadb.user.findUnique({
                where: {
                    id: id as string
                }
            })
            
            const updateFilesData =  existingData?.files?.filter((url: string) => url !== filename);
           
            // Update the files array in existingData with new file destinations
           await prismadb.user.update(
            {
                where: {
                    id: id as string,
                },
                data:{
                    files: updateFilesData
                }
            }
           )
            

            fs.unlink(filename as string, (err) => {
                if (err) throw err;
                console.log('path/file.txt was deleted');
              });
    
            res.status(200).json({message: "File Delete  successfully!"})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
     get_assets_lists : async( req:Request  ,res: Response ) =>  { 
        try{
            const userFiles = await prismadb.user.findUnique({
                where: {
                      id :req?.query?.id  as string
                },
            })

             if(!userFiles){
                res.status(404).json("Url Query Missing User Id OR Not Exist User !");

             }

            res.status(200).json(userFiles?.files);
        }catch(err){
            res.status(500).json("Iternal Server Error");
        }
    }
};
  