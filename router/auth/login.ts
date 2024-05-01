import  express from "express";
import {authController} from "../../controller/auth.controller";

const login_router = express.Router();

//auth controllers in  router 
login_router.get("/" , authController.get_static_page);
login_router.post("/", authController.post_login_request);

export default login_router;


