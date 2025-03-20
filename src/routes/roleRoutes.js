import express from "express";
import { createRole, getAllRoles, getRoleById, softDeleteRole } from "../controllers/roleController.js";


const roleRouter = express.Router();

roleRouter.get("/role/", getAllRoles);
roleRouter.post("/role/post", isAuthenticated, isAdmin, createRole);
roleRouter.put("/role/:id", isAuthenticated, isAdmin, updateRole);
roleRouter.delete("/role/:id", isAuthenticated, isAdmin, softDeleteRole);

export default roleRouter;