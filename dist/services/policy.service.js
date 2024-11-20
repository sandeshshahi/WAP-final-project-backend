"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolicy = exports.getPolicyByPolicyId = exports.getPoliciesByUserId = exports.getAllPolicies = void 0;
const db_1 = __importDefault(require("../database/db"));
const getAllPolicies = (from, to) => {
    if (from && to) {
        const fromDate = new Date(`${from}-01-01`);
        const toDate = new Date(`${to}-01-01`);
        return new Promise((resolve, reject) => {
            db_1.default.all("SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id WHERE p.date >= ? AND p.date < ? GROUP BY p.id ORDER BY vote DESC", [fromDate, toDate], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id GROUP BY p.id ORDER BY vote DESC", (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};
exports.getAllPolicies = getAllPolicies;
const getPoliciesByUserId = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.all("SELECT * FROM policies where user_id=?", [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
exports.getPoliciesByUserId = getPoliciesByUserId;
const getPolicyByPolicyId = (id) => {
    return new Promise((resolve, reject) => {
        db_1.default.get("SELECT p.*, u.name, count(v.user_id) as vote FROM policies p INNER JOIN users u ON u.id = p.user_id LEFT JOIN votes v on v.policy_id = p.id WHERE p.id=?", [id], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};
exports.getPolicyByPolicyId = getPolicyByPolicyId;
const createPolicy = async (policy) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("INSERT INTO policies (title, description, category, date, user_id) VALUES (?, ?, ?, ?, ?)", [
            policy.title,
            policy.description,
            policy.category,
            new Date(policy.date),
            policy.user_id,
        ], function (err, row) {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            }
            console.log("resolve: ", row);
            resolve(row);
        });
    });
};
exports.createPolicy = createPolicy;
