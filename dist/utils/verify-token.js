"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    ;
    if (authHeader) {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid!");
                    return;
                }
                else {
                    req.user = user;
                    next();
                }
            });
        }
        catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }
    else {
        res.status(401).json("You are not authenticated!");
        return;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verify-token.js.map