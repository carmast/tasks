"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._generateRandomFolderName = void 0;
const fs_1 = __importDefault(require("fs"));
function _generateRandomFolderName() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while (true) {
        let folderName = "";
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            folderName += characters.charAt(randomIndex);
        }
        const folderPath = `public/assets/${folderName}`;
        try {
            fs_1.default.access(folderPath, fs_1.default.constants.F_OK);
        }
        catch (error) {
            return folderName;
        }
    }
}
exports._generateRandomFolderName = _generateRandomFolderName;
;
//# sourceMappingURL=random-generate.js.map