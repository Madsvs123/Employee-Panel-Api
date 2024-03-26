import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({ error: `User Not Exist` });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).json({ error: `Wrong username Or password` });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
    res.status(200).json({ username: user.username, token: token });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
