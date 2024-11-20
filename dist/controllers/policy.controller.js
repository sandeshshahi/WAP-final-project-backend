"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolicyController = exports.hasUserVoteController = exports.incrementPolicyController = exports.getPolicyByPolicyIdController = exports.getAllPoliciesByUserIdController = exports.getAllPoliciesController = void 0;
const policy_service_1 = require("../services/policy.service");
const user_service_1 = require("../services/user.service");
const errorResponse_middleware_1 = require("../middleware/errorResponse.middleware");
const vote_service_1 = require("../services/vote.service");
const getAllPoliciesController = async (req, res) => {
    const from = req.query.from ? Number(req.query.from) : undefined;
    const to = req.query.to ? Number(req.query.to) : undefined;
    try {
        const policies = await (0, policy_service_1.getAllPolicies)(from, to);
        res.json(policies);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching policies." });
    }
};
exports.getAllPoliciesController = getAllPoliciesController;
const getAllPoliciesByUserIdController = async (req, res) => {
    const userId = Number(req.params.userId);
    try {
        const policies = await (0, policy_service_1.getPoliciesByUserId)(userId);
        res.json(policies);
    }
    catch (err) {
        throw new errorResponse_middleware_1.HttpError("Error fetching policies");
    }
};
exports.getAllPoliciesByUserIdController = getAllPoliciesByUserIdController;
const getPolicyByPolicyIdController = async (req, res) => {
    const policyId = Number(req.params.policyId);
    try {
        const policy = await (0, policy_service_1.getPolicyByPolicyId)(policyId);
        res.json(policy);
    }
    catch (err) {
        throw new errorResponse_middleware_1.HttpError("Error fetching policy");
    }
};
exports.getPolicyByPolicyIdController = getPolicyByPolicyIdController;
const incrementPolicyController = async (req, res) => {
    var _a;
    const policyId = Number(req.params.policyId);
    const email = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        throw new errorResponse_middleware_1.HttpError("You need to login first.", 401);
    }
    const user = await (0, user_service_1.getUserByEmail)(email);
    try {
        await (0, vote_service_1.votePolicy)(user.id, policyId);
        res.status(204).json();
    }
    catch (err) {
        console.error(err);
        throw new errorResponse_middleware_1.HttpError("Error increment policy's votes");
    }
};
exports.incrementPolicyController = incrementPolicyController;
const hasUserVoteController = async (req, res) => {
    const policyId = Number(req.params.policyId);
    const userId = Number(req.params.userId);
    try {
        const voted = await (0, vote_service_1.hasUserVoted)(userId, policyId);
        res.status(200).json({ voted });
    }
    catch (err) {
        throw new errorResponse_middleware_1.HttpError("Error checking user has voted or not.");
    }
};
exports.hasUserVoteController = hasUserVoteController;
const createPolicyController = async (req, res) => {
    var _a;
    const policy = req.body;
    const email = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        throw new errorResponse_middleware_1.HttpError("You need to login first.", 401);
    }
    const user = await (0, user_service_1.getUserByEmail)(email);
    console.log("here", user, email);
    if (!policy.title ||
        !policy.description ||
        !policy.date ||
        !policy.category) {
        throw new errorResponse_middleware_1.HttpError("Title, description, date and category are required.", 400);
    }
    const newPolicy = await (0, policy_service_1.createPolicy)({
        ...policy,
        user_id: user.id,
    });
    console.log("there", newPolicy);
    res.json(newPolicy);
};
exports.createPolicyController = createPolicyController;
