import "dotenv/config";
import jwt from "jsonwebtoken";
import UserType from "../types/user.type";

export const generateToken = (payload: UserType): string => {
    return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: String(process.env.JWT_ACCESS_EXPIRATION) });
};

export const generateRefreshToken = (payload: UserType): string => {
    return jwt.sign(payload, String(process.env.JWT_REFRESH_SECRET), {
        expiresIn: String(process.env.JWT_REFRESH_EXPIRATION)
    });
};

export const verifyToken = (token: string): UserType | null => {
    try {
        return jwt.verify(token, String(process.env.JWT_SECRET)) as UserType;
    } catch {
        return null;
    }
};

export const verifyRefreshToken = (token: string): UserType | null => {
    try {
        return jwt.verify(token, String(process.env.JWT_REFRESH_SECRET)) as UserType;
    } catch {
        return null;
    }
};
