"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = exports.register = exports.getProfile = exports.login = void 0;
const errorResponse_middleware_1 = require("../middleware/errorResponse.middleware");
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    const isPasswordMatched = await (0, auth_service_1.validatePassword)(email, password);
    if (isPasswordMatched) {
        const { encData, hashData } = (0, auth_service_1.generateToken)(email);
        res.json({ success: true, encData, hashData });
    }
    else {
        throw new errorResponse_middleware_1.HttpError("Invalid credentials", 401);
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    var _a;
    const email = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.email;
    if (email) {
        const user = await (0, user_service_1.getUserByEmail)(email);
        delete user.password;
        res.json(user);
    }
    else {
        throw new errorResponse_middleware_1.HttpError("Not authenticated.", 401);
    }
};
exports.getProfile = getProfile;
const register = async (req, res) => {
    const user = req.body;
    if (!user.email || !user.name || !user.password) {
        throw new errorResponse_middleware_1.HttpError("Name, email and password are required.", 400);
    }
    const existingUser = await (0, user_service_1.getUserByEmail)(user.email);
    if (existingUser) {
        throw new errorResponse_middleware_1.HttpError(`User with email: ${user.email}, is already registered`, 400);
    }
    const newUser = await (0, user_service_1.createUser)(user);
    const { encData, hashData } = (0, auth_service_1.generateToken)(user.email);
    res.json({ success: true, encData, hashData });
};
exports.register = register;
const usersController = (req, res, next) => {
    res.json({ success: true, secret: "this is secret!! " });
};
exports.usersController = usersController;
