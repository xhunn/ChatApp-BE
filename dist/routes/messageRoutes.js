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
const routesAPI_1 = require("./routesAPI");
const messageController_1 = require("../controllers/messageController");
const auth_1 = require("../auth");
const router = express_1.default.Router();
// POST MESSAGE
router.post('/message', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        content: req.body.content,
        from: req.body.from,
        to: req.body.to,
    };
    const data = yield (0, messageController_1.postMessage)(payload);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET MESSAGE
router.get('/message/:messageId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, messageController_1.getMessage)(req.params.messageId);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET ALL MESSAGES
router.get('/messages/', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization)
        return (0, routesAPI_1.sendAPI)(res, {
            message: "You are not authorized to view this page",
            status: 401,
        });
    const user = (0, auth_1.decode)(req.headers.authorization);
    const data = yield (0, messageController_1.getAllMessages)((_a = user.data) === null || _a === void 0 ? void 0 : _a.id);
    (0, routesAPI_1.sendAPI)(res, data);
}));
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map