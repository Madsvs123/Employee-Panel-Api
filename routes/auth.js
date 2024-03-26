import express from "express";
import { authLogin } from "../controllers/auth.js";

const route = express.Router();

route.post("/", authLogin);

export default route;
