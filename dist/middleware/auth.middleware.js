"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
const authMiddleware = (req, res, next) => {
    const email = (0, auth_service_1.validateToken)(req.headers);
    req.auth = {
        email,
    };
    next();
};
exports.default = authMiddleware;
