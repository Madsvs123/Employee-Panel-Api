import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const vertifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(500)
        .json({ error: "Access Denied. Please Login First." });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
      if (err) {
        return res.status(500).json({ error: "Access Denied." });
      }
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
