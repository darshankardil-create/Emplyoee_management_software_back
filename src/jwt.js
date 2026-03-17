import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function token(payload) {
  const password = process.env.jwtpassword;

  return jwt.sign(payload, password, { expiresIn: "60d" });
}
