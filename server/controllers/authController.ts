import { Request, Response } from "express";
import { User } from "../model/userModel";
import { generateToken } from "../utils/jwt";

export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const COOKIE_OPTIONS = {
  TOKEN_COOKIE_NAME: "token",
  COOKIE_MAX_AGE: 1000 * 60 * 60,
  COOKIE_PROPERTIES: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
  },
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_OPTIONS.TOKEN_COOKIE_NAME, token, {
    ...COOKIE_OPTIONS.COOKIE_PROPERTIES,
    maxAge: COOKIE_OPTIONS.COOKIE_MAX_AGE,
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "User already exists",
      });

    const user = await User.create({ email, password });

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(STATUS.CREATED).json({
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    res.status(STATUS.OK).json({
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie(COOKIE_OPTIONS.TOKEN_COOKIE_NAME, "", {
    ...COOKIE_OPTIONS.COOKIE_PROPERTIES,
    maxAge: 0,
  });

  res.status(STATUS.OK).json({ message: "Logged out successfully" });
};
