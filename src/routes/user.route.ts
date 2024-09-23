import { Router } from "express";
import { getCountUserPosts, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/handler";

const userRouter: Router = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authenticate, logoutUser);
userRouter.get("/refresh-token", refreshToken);
userRouter.get("/count-user-posts", authenticate, getCountUserPosts);

export default userRouter;
