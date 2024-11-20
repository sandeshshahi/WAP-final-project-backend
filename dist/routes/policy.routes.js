"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const policy_controller_1 = require("../controllers/policy.controller");
const router = express_1.default.Router();
router.get("/policies", policy_controller_1.getAllPoliciesController);
router.post("/policies", auth_middleware_1.default, policy_controller_1.createPolicyController);
router.get("/policies/:policyId", policy_controller_1.getPolicyByPolicyIdController);
router.get("/users/:userId/policies", policy_controller_1.getAllPoliciesByUserIdController);
router.put("/policies/:policyId/upvote", auth_middleware_1.default, policy_controller_1.incrementPolicyController);
exports.default = router;
