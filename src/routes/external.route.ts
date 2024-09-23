import { Router } from "express";
import { external } from "../controllers/external.controller";
import { authenticate } from "../middleware/handler";

const externalRouter: Router = Router();

externalRouter.get("/external", authenticate, external);

export default externalRouter;
