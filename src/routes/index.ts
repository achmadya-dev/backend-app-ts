import { Router } from "express";
import postRouter from "./post.route";
import userRouter from "./user.route";
import { errorHandler, notFoundHandler } from "../controllers/error.controller";

const app: Router = Router();

app.use(postRouter);
app.use(userRouter);

app.use("*", errorHandler);
app.use("*", notFoundHandler);

export default app;
