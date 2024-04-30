import  express from "express";
import { _getstaticpage, _postforlogin } from "../../controller/auth.controller";

const login_router = express.Router();

//controllers in  router 
login_router.get("/" , _getstaticpage);
login_router.post("/", _postforlogin);

export default login_router;


