import express from "express";
const { loginUser, logoutUser, registerUser } = require("../controllers/auth.controller");

const authRouter = express.Router();
authRouter.get("/yo", (req, res)=>{ res.send("yo")})
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/register", registerUser);

module.exports = {
    authRouter
}