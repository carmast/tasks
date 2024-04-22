const register_router = require("express").Router();
const fs = require("fs");

register_router.get("/",async (req,res) => {
 fs.readFile("static/register/register.html", "utf-8" , (err,data)  => {
    if(err){
        console.error(err);
        res.status(500).json("Internal Server Error")
    }else{
        res.status(500).json(data);
    }
 }) 

});

module.exports  = register_router