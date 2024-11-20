import express from "express";
import { getProfile, login } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import {
  createPolicyController,
  getAllPoliciesByUserIdController,
  getAllPoliciesController,
  getPolicyByPolicyIdController,
  incrementPolicyController,
} from "../controllers/policy.controller";

const router = express.Router();

router.get("/policies", getAllPoliciesController);
router.post("/policies", authMiddleware, createPolicyController);
router.get("/policies/:policyId", getPolicyByPolicyIdController);
router.get("/users/:userId/policies", getAllPoliciesByUserIdController);
router.put(
  "/policies/:policyId/upvote",
  authMiddleware,
  incrementPolicyController
);

export default router;
