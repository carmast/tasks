"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const random_generate_1 = require("../../utils/random-generate");
const verify_token_1 = require("../../utils/verify-token");
const upload_router = express_1.default.Router();
const assets_storage = multer_1.default.memoryStorage();
const upload_storage = (0, multer_1.default)({
    storage: assets_storage
}).array("files");
upload_router.post("/", upload_storage, verify_token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folderName = `public/assets/${(0, random_generate_1._generateRandomFolderName)()}`;
        const files = req.files;
        const fileDestinations = [];
        fs_1.default.mkdirSync(folderName, { recursive: true });
        files.forEach((file) => {
            const filePath = path_1.default.join(folderName, file === null || file === void 0 ? void 0 : file.originalname);
            fs_1.default.writeFile(filePath, file.buffer, (err) => {
                if (err)
                    throw err;
            });
            fileDestinations.push(`${folderName}/${file === null || file === void 0 ? void 0 : file.originalname}`);
        });
        const existingData = JSON.parse(fs_1.default.readFileSync('data.json', 'utf8'));
        existingData.files.push(...fileDestinations);
        fs_1.default.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
        res.status(200).json({ message: " File Uploaded Successfully!" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
upload_router.delete("/delete", upload_storage, verify_token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { filename } = req.query;
        if (!filename) {
            res.status(400).json({ message: "Query filename is Missing!" });
        }
        try {
            yield promises_1.default.access(filename, fs_1.default.constants.F_OK);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                res.status(404).json({
                    message: 'File not found.',
                });
                return;
            }
            throw error;
        }
        const existingData = JSON.parse(fs_1.default.readFileSync('data.json', 'utf8'));
        const updateFilesData = (_a = existingData.files) === null || _a === void 0 ? void 0 : _a.filter((url) => url !== filename);
        existingData.files = updateFilesData;
        fs_1.default.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
        res.status(200).json({ message: "File Delete  successfully!" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
upload_router.get("/assets", verify_token_1.verifyToken, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingData = JSON.parse(fs_1.default.readFileSync('data.json', 'utf8'));
        res.status(200).json(existingData === null || existingData === void 0 ? void 0 : existingData.files);
    }
    catch (err) {
        res.status(500).json("Iternal Server Error");
    }
}));
exports.default = upload_router;
//# sourceMappingURL=upload.js.map