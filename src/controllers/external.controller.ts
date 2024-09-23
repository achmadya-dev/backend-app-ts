import { NextFunction, Request, Response } from "express";
import axios from "axios";

export const external = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const response = await axios.get(process.env.EXTERNAL_API_URL as string);
        return res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data: response.data
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
