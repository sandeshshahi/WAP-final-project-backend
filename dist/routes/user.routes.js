"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const policy_controller_1 = require("../controllers/policy.controller");
const router = express_1.default.Router();
router.get("/", user_controller_1.getAllUsersController);
router.get("/:userId/policies/:policyId", policy_controller_1.hasUserVoteController);
exports.default = router;
