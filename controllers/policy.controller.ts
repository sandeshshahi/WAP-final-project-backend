import { Request, Response } from "express";
import {
  createPolicy,
  getAllPolicies,
  getPoliciesByUserId,
  getPolicyByPolicyId,
} from "../services/policy.service";
import { getUserByEmail } from "../services/user.service";
import { HttpError } from "../middleware/errorResponse.middleware";
import { hasUserVoted, votePolicy } from "../services/vote.service";
import { Policy } from "../types";

export const getAllPoliciesController = async (req: Request, res) => {
  const from = req.query.from ? Number(req.query.from) : undefined;
  const to = req.query.to ? Number(req.query.to) : undefined;
  try {
    const policies = await getAllPolicies(from, to);
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: "Error fetching policies." });
  }
};

export const getAllPoliciesByUserIdController = async (req: Request, res) => {
  const userId = Number(req.params.userId);
  try {
    const policies = await getPoliciesByUserId(userId);
    res.json(policies);
  } catch (err) {
    throw new HttpError("Error fetching policies");
  }
};

export const getPolicyByPolicyIdController = async (req: Request, res) => {
  const policyId = Number(req.params.policyId);
  try {
    const policy = await getPolicyByPolicyId(policyId);
    res.json(policy);
  } catch (err) {
    throw new HttpError("Error fetching policy");
  }
};

export const incrementPolicyController = async (req: Request, res) => {
  const policyId = Number(req.params.policyId);
  const email = req.auth?.email;
  if (!email) {
    throw new HttpError("You need to login first.", 401);
  }
  const user = await getUserByEmail(email);
  try {
    await votePolicy(user.id, policyId);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    throw new HttpError("Error increment policy's votes");
  }
};

export const hasUserVoteController = async (req: Request, res) => {
  const policyId = Number(req.params.policyId);
  const userId = Number(req.params.userId);
  try {
    const voted = await hasUserVoted(userId, policyId);
    res.status(200).json({ voted });
  } catch (err) {
    throw new HttpError("Error checking user has voted or not.");
  }
};

export const createPolicyController = async (req: Request, res: Response) => {
  const policy: Policy = req.body;
  const email = req.auth?.email;
  if (!email) {
    throw new HttpError("You need to login first.", 401);
  }
  const user = await getUserByEmail(email);
  console.log("here", user, email);
  if (
    !policy.title ||
    !policy.description ||
    !policy.date ||
    !policy.category
  ) {
    throw new HttpError(
      "Title, description, date and category are required.",
      400
    );
  }

  const newPolicy = await createPolicy({
    ...policy,
    user_id: user.id,
  });

  console.log("there", newPolicy);

  res.json(newPolicy);
};
