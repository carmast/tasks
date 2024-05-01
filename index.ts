import  express,{Request, Response,Express} from "express";
import  cors from 'cors';
import  morgan from 'morgan';
import  { version } from "./package.json";
import dotenv from 'dotenv';
dotenv.config();
const app = express(); 

import  login_router from "./router/auth/login";
import  upload_router from './router/upload/upload';
import swaggerJSDoc from "swagger-jsdoc";
import  swaggerUi  from "swagger-ui-express";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

//all Api Router 
app.use("/", express.static('static'));
app.use('/login', login_router);
app.use('/upload', upload_router);





//swagger router and enpoint options 
const options = {
    definition: { 
        openapi: "3.1.0",
        info: {
            title: "REST API Docs",
            version,
        },
        components: {
            securitySchemes: { 
                bearerAuth: {
                    type: "http",
                    scheme: "bearer", 
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
    apis: [
        "./swagger/login.swagger.yml",
        "./swagger/login.schema.yml",
        "./swagger/upload.swagger.yml",
        "./swagger/upload.schema.yml",
        "./swagger/delete.upload.swagger.yml",
        "./swagger/delete.upload.schema.yml",
        "./swagger/get.upload.swagger.yml",

    ],
}

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app:Express, port: number) {

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("docs.json", (_: Request, res : Response) => {
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


