"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userSchema = new mongoose_2.default.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    contacts: [{
            // An array of contact IDs
            type: mongoose_1.Types.ObjectId,
            ref: "Contacts",
            required: true,
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_2.default.model("Users", userSchema);
//# sourceMappingURL=user.js.map