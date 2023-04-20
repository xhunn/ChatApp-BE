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
const auth_1 = require("../auth");
const contactsController_1 = require("../controllers/contactsController");
const router = express_1.default.Router();
// POST CONTACT
router.post('/contact', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        name: req.body.name,
        participants: req.body.participants,
    };
    const data = yield (0, contactsController_1.postContact)(payload);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// UPDATE CONTACT
router.put('/contact/', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = (0, auth_1.decode)(req.headers.authorization);
    const payload = {
        id: (_a = user.data) === null || _a === void 0 ? void 0 : _a.id,
        name: req.body.name,
        messages: req.body.messages,
    };
    const data = yield (0, contactsController_1.updateContact)(payload);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET CONTACT
router.get('/contact/:contactId', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, contactsController_1.getContact)(req.params.contactId);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET ALL CONTACTS
router.get('/contacts/', auth_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = (0, auth_1.decode)(req.headers.authorization);
    const data = yield (0, contactsController_1.getAllContacts)((_b = user.data) === null || _b === void 0 ? void 0 : _b.id);
    (0, routesAPI_1.sendAPI)(res, data);
}));
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map