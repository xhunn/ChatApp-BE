"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProfiles = exports.getProfile = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../auth");
const register = (data) => {
    return user_1.default.findOne({ username: data.username }).then((user) => {
        if (!user)
            return bcrypt_1.default.hash(data.password, 10).then((hash) => {
                const newUser = new user_1.default({
                    username: data.username,
                    email: data.email,
                    name: data.name,
                    password: hash,
                });
                return newUser.save().then(user => {
                    return {
                        message: "User created successfully",
                        status: 201,
                        token: (0, auth_1.createToken)(user),
                    };
                }).catch(err => {
                    return {
                        message: `Something went wrong:\n${err}`,
                        status: 500,
                    };
                });
            });
        else
            throw new Error("exist");
    }).catch(err => {
        if (err.message === "exist")
            return {
                message: "User already exists",
                status: 409,
            };
        else
            return {
                message: `Something went wrong\n${err}`,
                status: 500,
            };
    });
};
exports.register = register;
const login = (credentials) => {
    return user_1.default.findOne({ username: credentials.username }).then((user) => {
        if (user)
            return bcrypt_1.default.compare(credentials.password, user.password).then((result) => {
                if (result)
                    return {
                        message: "Logged in successfully",
                        status: 200,
                        token: (0, auth_1.createToken)(user),
                    };
                else
                    return {
                        message: "Invalid credentials",
                        status: 401,
                    };
            });
        else
            return {
                message: "User not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong:\n${err}`,
            status: 500,
        };
    });
};
exports.login = login;
const getProfile = (username) => {
    return user_1.default.findOne({ username }).then(user => {
        if (user)
            return {
                message: "Profile found",
                status: 200,
                user: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    isOnline: user.isOnline,
                    contacts: user.contacts,
                }
            };
        else
            return {
                message: "User not found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong:\n${err}`,
            status: 500,
        };
    });
};
exports.getProfile = getProfile;
const getAllProfiles = () => {
    return user_1.default.find({}).then(users => {
        if (users)
            return {
                message: "Users found",
                status: 200,
                users: users.map(user => ({
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    isOnline: user.isOnline,
                    contacts: user.contacts,
                }))
            };
        else
            return {
                message: "No users found",
                status: 404,
            };
    }).catch(err => {
        return {
            message: `Something went wrong:\n${err}`,
            status: 500,
        };
    });
};
exports.getAllProfiles = getAllProfiles;
//# sourceMappingURL=userController.js.map