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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login_router = express_1.default.Router();
login_router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.readFile("static/login/login.html", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(data);
        }
    });
}));
login_router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rawdata = fs_1.default.readFileSync('data.json');
        let user = JSON.parse(rawdata);
        if (req.body.username !== (user === null || user === void 0 ? void 0 : user.username)) {
            res.status(409).json("Username Wrong credentials!");
            return;
        }
        const user_enycript = crypto_js_1.default.AES.encrypt(user === null || user === void 0 ? void 0 : user.password, process.env.PASS_SEC).toString();
        const hashedPassword = crypto_js_1.default.AES.decrypt(user_enycript, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(401).json({ status: 409, message: 'Password Wrong credentials!' });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: user === null || user === void 0 ? void 0 : user.id,
        }, process.env.JWT_SEC, { expiresIn: '3d' });
        const { password } = user, others = __rest(user, ["password"]);
        console.log(others);
        res.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}));
exports.default = login_router;
//# sourceMappingURL=login.js.map