import jwt from "jsonwebtoken";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in .env");
}
export const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
};
