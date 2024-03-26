import express from "express";
import { getUsers, addUser, deleteUser } from "../controllers/user.js";

const route = express.Router();

route.get("/", getUsers);
route.post("/", addUser);
route.delete("/:id", deleteUser);

export default route;
