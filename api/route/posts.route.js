import express from "express";
const postRouter = express.Router();

postRouter.get("/test",(request,response)=>{
    response.send("Router from posts")
});


export default postRouter;