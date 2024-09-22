import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller";
import { authenticate } from "../controllers/error.controller";
const postRouter: Router = Router();

postRouter.get("/posts", authenticate, getAllPost);
postRouter.post("/posts", authenticate, createPost);
postRouter.get("/posts/:id", authenticate, getPostById);
postRouter.put("/posts/:id", authenticate, updatePost);
postRouter.delete("/posts/:id", authenticate, deletePost);

export default postRouter;
