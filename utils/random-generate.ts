import  fs from "fs";

//genereate random folder for assets
  export function _generateRandomFolderName  () {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while (true) {
        let folderName = "";
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          folderName += characters.charAt(randomIndex);
        }
    
        const folderPath = `public/assets/${folderName}`;
    
        try {
          // Check if the folder already exists
           fs.access(folderPath, fs.constants.F_OK as any );
        } catch (error) {
          // Folder does not exist, return the folder name
          return folderName;
        }
      }
  };
