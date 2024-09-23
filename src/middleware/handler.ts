import { NextFunction, type Request, type Response } from "express";
import { verifyToken } from "../utils/jwt";
import { RedisClient } from "../utils/redis";
import logger from "../utils/winston";
import UserType from "../types/user.type";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    logger.error(err);
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: null
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction): void => {
    res.status(404).json({
        status: "error",
        message: "Not Found",
        data: null
    });
};

export const authenticate = async (req: Request & { user?: UserType }, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1] as string;

    if (!accessToken) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
            data: null
        });
    }

    const user = verifyToken(accessToken);

    const blackListedAccessToken = await RedisClient.get(accessToken);

    if (!user || blackListedAccessToken) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
            data: null
        });
    }

    req.user = user;
    next();
};
