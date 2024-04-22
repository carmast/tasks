const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const login_router = require("./router/auth/login");
const upload_router = require('./router/upload/upload');
const register_router = require("./router/auth/register");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

//all Api Router
app.use("/", express.static('static'));
app.use('/login', login_router);
app.use('/register', register_router);
app.use('/upload', upload_router);

//server port
app.listen(8080, () => {
    console.log("server connected 8080")
});


