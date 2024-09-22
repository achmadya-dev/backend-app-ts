import { NextFunction, type Request, type Response } from "express";
import logger from "../utils/winston";
import { verifyToken } from "../utils/jwt";
import UserType from "../types/user.type";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    logger.error(err);
    res.status(500).json({
        error: true,
        message: "Internal Server Error",
        data: null
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction): void => {
    res.status(404).json({
        error: true,
        message: "Not Found",
        data: null
    });
};

export const authenticate = (req: Request & { user?: UserType }, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        });
    }

    const user = verifyToken(token);

    if (!user) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        });
    }

    req.user = user;
    next();
};
