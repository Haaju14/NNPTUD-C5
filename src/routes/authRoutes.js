import express from "express";
import {
    loginUser,
    registerUser,
    getMe,
    changePassword
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/me", isAuthenticated, getMe);
authRouter.post("/changepassword", isAuthenticated, changePassword);

export default authRouter;
