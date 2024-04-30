"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const package_json_1 = require("./package.json");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const login_1 = __importDefault(require("./router/auth/login"));
const upload_1 = __importDefault(require("./router/upload/upload"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("common"));
app.use("/", express_1.default.static('static'));
app.use('/login', login_1.default);
app.use('/upload', upload_1.default);
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "REST API Docs",
            version: package_json_1.version,
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
        "./swagger/delete.upload.schema.yml"
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get("docs.json", (_, res) => {
        res.setHeader("Content-Type", 'application/json');
        res.send(swaggerSpec);
    });
    console.info(`Docs available at http://localhost:${port}/docs`);
}
app.listen(8080, () => {
    swaggerDocs(app, 8080);
    console.log("server connected 8080");
});
//# sourceMappingURL=index.js.map