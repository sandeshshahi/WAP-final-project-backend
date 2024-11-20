import { Request, RequestHandler } from "express";
import { HttpError } from "../middleware/errorResponse.middleware";
import { generateToken, validatePassword } from "../services/auth.service";
import { createUser, getUserByEmail } from "../services/user.service";
import { User } from "../types";
export const login: RequestHandler<
  unknown,
  { success: boolean; encData: string; hashData: string },
  { email: string; password: string },
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const isPasswordMatched = await validatePassword(email, password);
  if (isPasswordMatched) {
    const { encData, hashData } = generateToken(email);
    res.json({ success: true, encData, hashData });
  } else {
    throw new HttpError("Invalid credentials", 401);
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  const email = req.auth?.email;
  if (email) {
    const user = await getUserByEmail(email);
    delete user.password;
    res.json(user);
  } else {
    throw new HttpError("Not authenticated.", 401);
  }
};

export const register = async (req, res) => {
  const user: User = req.body;
  if (!user.email || !user.name || !user.password) {
    throw new HttpError("Name, email and password are required.", 400);
  }
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new HttpError(
      `User with email: ${user.email}, is already registered`,
      400
    );
  }
  const newUser = await createUser(user);
  const { encData, hashData } = generateToken(user.email);
  res.json({ success: true, encData, hashData });
};

export const usersController: RequestHandler<
  unknown,
  { success: boolean; secret: string },
  unknown,
  unknown
> = (req, res, next) => {
  res.json({ success: true, secret: "this is secret!! " });
};
