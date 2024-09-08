import express from "express";
import { shouldbeAdmin, shouldbeLoggedin } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const testRouter = express.Router();

testRouter.get("/should-be-loggedin",verifyToken, shouldbeLoggedin);

testRouter.get("/should-be-admin",shouldbeAdmin);

export default testRouter;