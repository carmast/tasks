const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { version } = require("./package.json");
require('dotenv').config();

const login_router = require("./router/auth/login");
const upload_router = require('./router/upload/upload');
const register_router = require("./router/auth/register");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

//all Api Routernpx 
app.use("/", express.static('static'));



app.use('/login', login_router);


app.use('/register', register_router);
app.use('/upload', upload_router);

const options = {
    definition: { // Corrected 'definitions' spelling
        openapi: "3.1.0",
        info: {
            title: "REST API Docs",
            version,
        },
        components: {
            securitySchemes: { // Corrected 'securitySchemes' spelling
                bearerAuth: {
                    type: "http",
                    scheme: "bearer", // Corrected 'beare' to 'bearer'
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ['./router/auth/login.js' , './router/upload/upload.js']
}

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port){

     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
     app.get("docs.json", (req,res )=> {
        res.setHeader("Content-Type", 'application/json')
        res.send(swaggerSpec);
     })
    
      console.info(`Docs available at http://localhost:${port}/docs`)
}



//server port
app.listen(8080, () => {
    swaggerDocs(app, 8080);
    console.log("server connected 8080")
});


