import express from "express";
import { getAllUsersController } from "../controllers/user.controller";
import { hasUserVoteController } from "../controllers/policy.controller";

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:userId/policies/:policyId", hasUserVoteController);

export default router;
