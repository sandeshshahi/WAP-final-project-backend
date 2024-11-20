"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.hashPassword = exports.getUserByEmail = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../database/db"));
const saltRounds = 10;
const salt = bcrypt_1.default.genSaltSync(saltRounds);
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM users", (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db_1.default.get("SELECT * FROM users where email=?", [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
exports.getUserByEmail = getUserByEmail;
const hashPassword = (password) => {
    if (!password)
        return "";
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
const createUser = async (user) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [user.name, user.email, (0, exports.hashPassword)(user.password)], function (err, row) {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
exports.createUser = createUser;
