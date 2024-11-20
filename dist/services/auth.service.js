"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.getUser = exports.generateToken = exports.validatePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_crypto_1 = require("node:crypto");
const user_service_1 = require("./user.service");
const errorResponse_middleware_1 = require("../middleware/errorResponse.middleware");
const secretKey = "secretKey";
const validatePassword = async (email, password) => {
    const user = await (0, user_service_1.getUserByEmail)(email);
    if (!user)
        throw new errorResponse_middleware_1.HttpError("User does not exist.");
    return bcrypt_1.default.compareSync(password, user.password || "invalid");
};
exports.validatePassword = validatePassword;
const generateToken = (email) => {
    const encData = Buffer.from(JSON.stringify({ email })).toString("base64");
    const hashData = (0, node_crypto_1.createHmac)("sha256", secretKey)
        .update(encData)
        .digest("hex");
    return { encData, hashData };
};
exports.generateToken = generateToken;
const getUser = async (headers) => {
    const email = (0, exports.validateToken)(headers);
    const user = await (0, user_service_1.getUserByEmail)(email);
    delete user.password;
    return user;
};
exports.getUser = getUser;
const validateToken = (headers) => {
    if (!headers.authentication) {
        throw Error("No authentication header");
    }
    const combination = headers.authentication.split(".");
    const encData = combination[0];
    const hashData = combination[1];
    const newHash = (0, node_crypto_1.createHmac)("sha256", "secretKey")
        .update(encData)
        .digest("hex");
    if (hashData === newHash) {
        return JSON.parse(Buffer.from(encData, "base64").toString("utf-8")).email;
    }
    throw Error("Hash do not match");
};
exports.validateToken = validateToken;
