import { Post } from "@prisma/client";
import PostType from "../types/post.type";
import prisma from "../utils/client";

export const getAllPostService = async (): Promise<Post[]> => {
    return await prisma.post.findMany();
};

export const createPostService = async (data: PostType): Promise<Post> => {
    return await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            authorId: data.authorId
        }
    });
};

export const getPostByIdService = async (id: number): Promise<Post | null> => {
    return await prisma.post.findUnique({
        where: {
            id
        }
    });
};

export const updatePostService = async (id: number, data: PostType): Promise<Post> => {
    return await prisma.post.update({
        where: {
            id
        },
        data
    });
};

export const deletePostService = async (id: number): Promise<Post> => {
    return await prisma.post.delete({
        where: {
            id
        }
    });
};
