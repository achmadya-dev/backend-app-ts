import { Router } from "express";
import { loginUser, refreshToken, registerUser } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/refresh-token", refreshToken);

export default userRouter;
