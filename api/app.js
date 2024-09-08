import express from "express";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import cors from 'cors';
import postRouter from "./route/posts.route.js";
import authRouter from "./route/auth.route.js";
import testRouter from "./route/test.route.js";

const app = express();
//handling the CROS issue
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//Auth routes and controller
app.use("/api/auth", authRouter);

//Post route and controller
app.use("/api/post", postRouter);

//test route and controller
app.use("/api/test", testRouter);

//User routes and controller
// /app.use("/api/user", us);

app.listen(process.env.PORT, () => {
    console.log(`Server is up and running in PORT no ${process.env.PORT}`);
});