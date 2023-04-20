"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        default: "" || undefined
    },
    participants: {
        // An array of userIds
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        required: true,
    },
    messages: {
        // An array of messageIds
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Message",
            }
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Contacts", contactSchema);
//# sourceMappingURL=contact.js.map