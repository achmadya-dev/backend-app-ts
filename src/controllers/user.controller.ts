import { NextFunction, Request, Response } from "express";
import { inputLoginValidation, inputUserValidation } from "../validations/user.validation";
import { createUserService, getUserByEmailService, getUserWithPostsService } from "../services/user.service";
import { compare, encrypt } from "../utils/bcrypt";
import { decodeToken, generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/jwt";
import { RedisClient } from "../utils/redis";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { error, value } = inputUserValidation(req.body);
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
                data: null
            });
        }

        const userExist = await getUserByEmailService(value.email);
        if (userExist) {
            return res.status(400).json({
                status: "error",
                message: "Email already exists",
                data: null
            });
        }

        value.password = await encrypt(value.password as string);
        const user = await createUserService(value);

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: registerUser - " + String((error as Error).message)
            )
        );
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { error, value } = inputLoginValidation(req.body);
        if (error) {
            return res.status(401).json({
                status: "error",
                message: error.details[0].message,
                data: null
            });
        }

        const user = await getUserByEmailService(value.email);
        if (!user || !(await compare(value.password as string, user.password))) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password",
                data: null
            });
        }

        const accessToken = generateToken({ id: user.id, name: user.name, email: user.email });
        const refreshToken = generateRefreshToken({ id: user.id, name: user.name, email: user.email });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken
            }
        });
    } catch (error) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: loginUser - " + String((error as Error).message)
            )
        );
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1] as string;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: null
            });
        }

        const blacklistedToken = await RedisClient.get(refreshToken);
        if (blacklistedToken) {
            return res.status(403).json({
                status: "error",
                message: "Unauthorized",
                data: null
            });
        }

        const user = verifyRefreshToken(refreshToken);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: null
            });
        }

        const decodedRefreshToken = decodeToken(refreshToken) as { exp: number };
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decodedRefreshToken.exp - currentTime;

        // blacklist
        await RedisClient.setEx(refreshToken, remainingTime, "true");
        await RedisClient.setEx(accessToken, remainingTime, "true");

        const newAccessToken = generateToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const newRefreshToken = generateRefreshToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status: "success",
            message: "Token refreshed successfully",
            data: {
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: refreshToken - " + String((error as Error).message)
            )
        );
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1] as string;
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: null
            });
        }

        const decodedRefreshToken = decodeToken(refreshToken) as { exp: number };
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decodedRefreshToken.exp - currentTime;

        await RedisClient.setEx(refreshToken, remainingTime, "true");
        await RedisClient.setEx(accessToken, remainingTime, "true");

        res.clearCookie("refreshToken");

        return res.status(200).json({
            status: "success",
            message: "Logout successful",
            data: null
        });
    } catch (error) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: logoutUser - " + String((error as Error).message)
            )
        );
    }
};

export const getAllUsersWithPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> => {
    try {
        const users = await getUserWithPostsService();

        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: getAllUsersWithPosts - " +
                    String((error as Error).message)
            )
        );
    }
};
