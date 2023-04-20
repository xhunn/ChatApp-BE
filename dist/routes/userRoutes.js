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
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// REGISTER
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
    };
    const data = yield (0, userController_1.register)(payload);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        username: req.body.username,
        password: req.body.password,
    };
    const data = yield (0, userController_1.login)(payload);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET PROFILE
router.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, userController_1.getProfile)(req.body.username);
    (0, routesAPI_1.sendAPI)(res, data);
}));
// GET ALL PROFILES
router.get('/profiles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, userController_1.getAllProfiles)();
    (0, routesAPI_1.sendAPI)(res, data);
}));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map