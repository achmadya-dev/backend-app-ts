import express, { type Application } from "express";
import cors from "cors";
import app from "../routes";
import "../utils/winston";
import cookieParser from "cookie-parser";
import path from "path";

const web: Application = express();

web.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
        preflightContinue: false
    })
);
web.options("*", cors());
web.use(express.urlencoded({ extended: true }));
web.use(express.json());
web.use(express.static(path.join(__dirname, "../uploads")));
web.use(cookieParser());
web.use("/api", app);

export default web;
