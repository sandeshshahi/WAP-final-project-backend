import bcrypt from "bcrypt";
import { createHmac } from "node:crypto";
import { User } from "../types";
import { getUserByEmail } from "./user.service";
import { HttpError } from "../middleware/errorResponse.middleware";

const secretKey = "secretKey";

export const validatePassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  const user = await getUserByEmail(email);
  if (!user) throw new HttpError("User does not exist.");
  return bcrypt.compareSync(password, user.password || "invalid");
};

export const generateToken = (
  email: string
): { encData: string; hashData: string } => {
  const encData = Buffer.from(JSON.stringify({ email })).toString("base64");
  const hashData = createHmac("sha256", secretKey)
    .update(encData)
    .digest("hex");
  return { encData, hashData };
};

export const getUser = async (headers: {
  authentication?: string;
}): Promise<Omit<User, "password">> => {
  const email = validateToken(headers);
  const user = await getUserByEmail(email);
  delete user.password;
  return user;
};

export const validateToken = (headers: { authentication?: string }): string => {
  if (!headers.authentication) {
    throw Error("No authentication header");
  }
  const combination = headers.authentication.split(".");
  const encData = combination[0];
  const hashData = combination[1];
  const newHash = createHmac("sha256", "secretKey")
    .update(encData)
    .digest("hex");
  if (hashData === newHash) {
    return JSON.parse(Buffer.from(encData, "base64").toString("utf-8")).email;
  }
  throw Error("Hash do not match");
};
