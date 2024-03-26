import express from "express";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  EditEmployee,
  deleteEmployee,
} from "../controllers/employee.js";

const route = express.Router();

route.get("/", getEmployees);
route.get("/:id", getEmployee);
route.post("/", addEmployee);
route.patch("/:id", EditEmployee);
route.delete("/:id", deleteEmployee);

export default route;
