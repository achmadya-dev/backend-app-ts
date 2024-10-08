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
                "Internal server error src/controllers/user.controller.ts: getCountUserPosts - " +
                    String((error as Error).message)
            )
        );
    }
};
