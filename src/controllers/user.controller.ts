import { NextFunction, Request, Response } from "express";
import { inputLoginValidation, inputUserValidation } from "../validations/user.validation";
import { createUserService, getUserByEmailService } from "../services/user.service";
import { compare, encrypt } from "../utils/bcrypt";
import { generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { error, value } = inputUserValidation(req.body);

        if (error) {
            return res.status(400).json({
                error: true,
                message: error.details[0].message,
                data: null
            });
        }

        const userExist = await getUserByEmailService(value.email);

        if (userExist) {
            return res.status(400).json({
                error: true,
                message: "Email already exist",
                data: null
            });
        }

        value.password = await encrypt(value.password as string);

        const user = await createUserService(value);

        return res.status(201).json({
            error: false,
            message: "User created successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: unknown) {
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
                error: true,
                message: error.details[0].message,
                data: null
            });
        }

        const user = await getUserByEmailService(value.email);

        if (!user || !(await compare(value.password as string, user.password))) {
            return res.status(401).json({
                error: true,
                message: "Invalid email or password",
                data: null
            });
        }

        const accessToken = generateToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        const refreshToken = generateRefreshToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            error: false,
            message: "Login successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            refreshToken
        });
    } catch (error: unknown) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: loginUser - " + String((error as Error).message)
            )
        );
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
                data: null
            });
        }

        const refreshToken = req.headers.authorization.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
                data: null
            });
        }

        const user = verifyRefreshToken(refreshToken);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
                data: null
            });
        }

        const accessToken = generateToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        const refeshToken = generateRefreshToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            error: false,
            message: "Token refreshed successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            refeshToken
        });
    } catch (error: unknown) {
        next(
            new Error(
                "Error pada file src/controllers/user.controller.ts: refreshToken - " + String((error as Error).message)
            )
        );
    }
};
