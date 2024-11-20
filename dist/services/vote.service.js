"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUserVoted = exports.votePolicy = void 0;
const db_1 = __importDefault(require("../database/db"));
const votePolicy = async (userId, policyId) => {
    return new Promise((resolve, reject) => {
        db_1.default.run("INSERT INTO votes (user_id,policy_id) VALUES(?,?)", [userId, policyId], function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
exports.votePolicy = votePolicy;
const hasUserVoted = async (userId, policyId) => {
    return new Promise((resolve, reject) => {
        db_1.default.get("SELECT 1 FROM votes WHERE user_id=? AND policy_id=? LIMIT 1", [userId, policyId], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(!!row);
        });
    });
};
exports.hasUserVoted = hasUserVoted;
