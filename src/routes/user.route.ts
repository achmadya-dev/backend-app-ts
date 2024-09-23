import { Router } from "express";
import {
    getAllUsersWithPosts,
    loginUser,
    logoutUser,
    refreshToken,
    registerUser
} from "../controllers/user.controller";
import { authenticate } from "../middleware/handler";

const userRouter: Router = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authenticate, logoutUser);
userRouter.get("/refresh-token", refreshToken);
userRouter.get("/all-users-with-posts", authenticate, getAllUsersWithPosts);

export default userRouter;
