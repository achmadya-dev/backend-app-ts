import express, { type Application } from "express";
import cors from "cors";
import app from "../routes";
import "../utils/winston";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../utils/swagger";

const web: Application = express();

web.use(cors({ origin: true, credentials: true }));
web.use(express.static(path.join(__dirname, "../uploads")));
web.use(express.urlencoded({ extended: true }));
web.use(express.json());
web.use(cookieParser());
web.use("/api", app);
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

export default web;
