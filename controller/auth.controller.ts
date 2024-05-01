import { Request, Response } from "express";
import  fs from 'fs';
import  CryptoJS from "crypto-js";
import  jwt from "jsonwebtoken";
import prismadb from "../lib/prisma";
import { User } from "@prisma/client";

//controller for auth router 
 export const  authController =  {
  get_static_page : async (_: Request,res: Response) => { 
      fs.readFile("static/login/login.html", "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
          } else {
            res.send(data);
          }
        });
       
  },
  post_login_request : async( req: Request, res: Response ) => {
    try {
      
        const  user = await  prismadb.user.findFirst({
          where:{
           username:  req?.body.username
          },
          
        })
    
        if (req.body.username !== user?.username) {
          res.status(409).json("Username Wrong credentials!");
          return;
        }
    
        const user_enycript = CryptoJS.AES.encrypt(user?.password as string, process.env.PASS_SEC as string).toString();
        const hashedPassword = CryptoJS.AES.decrypt(user_enycript, process.env.PASS_SEC as string);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
        if (originalPassword !== req.body.password) {
          res.status(409).json({ status: 409, message: 'Password Wrong credentials!' });
          return;
        }
    
        const accessToken = jwt.sign(
          {
            id: user?.id,
          },
          process.env.JWT_SEC as string,
          { expiresIn: '3d' }
        );
    
        const { password, ...others } = user as User;
        console.log(others)
        res.status(200).json({ ...others, accessToken });
    
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
}
}  

