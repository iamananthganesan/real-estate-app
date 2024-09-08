import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.get("/yo", (req, res)=>{ res.send("yo")})
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/register", registerUser);

export default authRouter;
