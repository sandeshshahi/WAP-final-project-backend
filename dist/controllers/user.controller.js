"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = void 0;
const user_service_1 = require("../services/user.service");
const getAllUsersController = async (req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsers)();
        const data = users === null || users === void 0 ? void 0 : users.map((user) => {
            const newUser = {
                ...user,
            };
            delete newUser.password;
            return newUser;
        });
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching users." });
    }
};
exports.getAllUsersController = getAllUsersController;
