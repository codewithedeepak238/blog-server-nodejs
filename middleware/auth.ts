import { Request, Response, NextFunction } from "express";
import axios from "axios";


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.body?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }

  try {
    const { data } = await axios.post("http://69.62.73.248/api/v1/admin/auth/blogs/auth-verify", {token});

    if (!data) {
      res.status(401).json({ message: "Invalid token" });
      return
    }

    req.user = data.user;
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Auth server error", error: err.message });
    return
  }
};
