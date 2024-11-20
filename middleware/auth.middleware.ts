import { NextFunction, Request, RequestHandler, Response } from "express";
import { validateToken } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        id?: string;
        email: string;
        role?: string;
      };
    }
  }
}

const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = validateToken(req.headers as { authentication?: string });
  req.auth = {
    email,
  };
  next();
};

export default authMiddleware;
