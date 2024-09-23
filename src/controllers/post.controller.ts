import { type NextFunction, type Request, type Response } from "express";
import { inputPostValidation } from "../validations/post.validation";
import {
    createPostService,
    deletePostService,
    getAllPostService,
    getPostByIdService,
    updatePostService
} from "../services/post.service";
import { Post } from "@prisma/client";

export const getAllPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const posts: Post[] = await getAllPostService();
        return res.status(200).json({
            status: "success",
            message: "All posts fetched successfully",
            data: posts
        });
    } catch (error: Error | unknown) {
        next(
            new Error(
                "Error pada file src/controllers/barang.controller.ts: getAllBarang - " +
                    String((error as Error).message)
            )
        );
    }
};

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { error, value } = inputPostValidation(req.body);

        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
                data: null
            });
        }

        if (req.file) value.poster = req.file.filename;

        const post = await createPostService(value);

        return res.status(201).json({
            status: "success",
            message: "Post created successfully",
            data: post
        });
    } catch (error: Error | unknown) {
        next(
            new Error(
                "Internal server error ./src/controllers/post.controller.ts: createPost - " +
                    String((error as Error).message)
            )
        );
    }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const post = await getPostByIdService(Number(req.params.id));

        if (!post) {
            return res.status(404).json({
                status: "error",
                message: "The requested post was not found",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Post fetched successfully",
            data: post
        });
    } catch (error) {
        next(
            new Error(
                "Internal server error ./src/controllers/post.controller.ts: getPostById - " +
                    String((error as Error).message)
            )
        );
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { error, value } = inputPostValidation(req.body);
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
                data: null
            });
        }

        if (req.file) value.poster = req.file.filename;

        const post = await updatePostService(Number(req.params.id), value);

        return res.status(200).json({
            status: "success",
            message: "Post updated successfully",
            data: post
        });
    } catch (error) {
        next(
            new Error(
                "Internal server error ./src/controllers/post.controller.ts: updatePost - " +
                    String((error as Error).message)
            )
        );
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const post = await deletePostService(Number(req.params.id));

        return res.status(200).json({
            status: "success",
            message: "Post deleted successfully",
            data: post
        });
    } catch (error) {
        next(
            new Error(
                "Internal server error ./src/controllers/post.controller.ts: deletePost - " +
                    String((error as Error).message)
            )
        );
    }
};
