import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/user/", isAuthenticated, isMod, getAllUsers);
userRouter.get("/user/:id", isAuthenticated, isMod, getUserById);
userRouter.post("/user/post", isAuthenticated, isAdmin, createUser);
userRouter.put("/user/:id", isAuthenticated, isAdmin, updateUser);
userRouter.delete("/user/:id", isAuthenticated, isAdmin, deleteUser);

export default userRouter;