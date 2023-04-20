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
exports.getAllMessages = exports.getMessage = exports.postMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const postMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new message_1.default({
        content: data.content,
        from: data.from,
        to: data.to,
    }).save().then((message) => {
        return {
            message: "Message sent successfully",
            status: 200,
            content: message,
        };
    }).catch(err => {
        return {
            message: `Something went wrong:\n${err}`,
            status: 500,
        };
    });
});
exports.postMessage = postMessage;
const getMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    return message_1.default.findById(messageId).then((message) => {
        if (message)
            return {
                message: "Message found",
                status: 200,
                content: message,
            };
        else
            return {
                message: "Message not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
});
exports.getMessage = getMessage;
const getAllMessages = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return message_1.default.find({ from: userId }).then((messages) => {
        if (messages)
            return {
                message: "Messages found",
                status: 200,
                content: messages,
            };
        else
            return {
                message: "Messages not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong\n${err}`,
            status: 500,
        };
    });
});
exports.getAllMessages = getAllMessages;
//# sourceMappingURL=messsageController.js.map