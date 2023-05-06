"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.verify = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
        contacts: user.contacts,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
};
exports.createToken = createToken;
const verify = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Unauthorized!" });
        else
            next();
    });
};
exports.verify = verify;
const decode = (token) => {
    if (token) {
        token = token.split(" ")[1];
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err)
                return {
                    message: "Unauthorized!",
                    status: 401,
                };
            else
                return {
                    message: "Token verified",
                    status: 200,
                    data: payload
                };
        });
    }
    else
        return {
            message: "No token provided",
            status: 403,
        };
};
exports.decode = decode;
//# sourceMappingURL=auth.js.map