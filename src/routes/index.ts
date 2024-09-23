import { Router } from "express";
import postRouter from "./post.route";
import userRouter from "./user.route";
import { errorHandler, notFoundHandler } from "../middleware/handler";
import externalRouter from "./external.route";

const app: Router = Router();

app.use(postRouter);
app.use(userRouter);
app.use(externalRouter);

app.use("*", errorHandler);
app.use("*", notFoundHandler);

export default app;
