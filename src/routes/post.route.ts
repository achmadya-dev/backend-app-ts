import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../controllers/post.controller";
import { authenticate } from "../middleware/handler";
import { upload } from "../utils/multer";
const postRouter: Router = Router();

postRouter.get("/posts", authenticate, getAllPost);
postRouter.post("/posts", upload.single("poster"), authenticate, createPost);
postRouter.get("/posts/:id", authenticate, getPostById);
postRouter.put("/posts/:id", upload.single("poster"), authenticate, updatePost);
postRouter.delete("/posts/:id", authenticate, deletePost);

export default postRouter;
