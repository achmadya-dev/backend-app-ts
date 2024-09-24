import { Post } from "@prisma/client";
import PostType from "../types/post.type";
import prisma from "../utils/client";

export const getAllPostService = async (): Promise<Post[]> => {
    return await prisma.$queryRaw`SELECT * FROM Post`;
};

export const createPostService = async (data: PostType): Promise<Post> => {
    await prisma.$queryRaw`
        INSERT INTO Post (title, content, authorId, poster)
        VALUES (${data.title}, ${data.content}, ${data.authorId}, ${data.poster});
    `;

    const inserted: Post[] = await prisma.$queryRaw`
        SELECT * FROM Post WHERE id = LAST_INSERT_ID();
    `;

    return inserted[0];
};

export const getPostByIdService = async (id: number): Promise<Post | null> => {
    const post: Post[] = await prisma.$queryRaw`SELECT * FROM Post WHERE id = ${id}`;

    return post.length === 0 ? null : post[0];
};

export const updatePostService = async (id: number, data: PostType): Promise<Post> => {
    await prisma.$queryRaw`
        UPDATE Post
        SET title = ${data.title}, content = ${data.content}, authorId = ${data.authorId}, poster = ${data.poster}
        WHERE id = ${id};
    `;

    const updated: Post[] = await prisma.$queryRaw`
        SELECT * FROM Post WHERE id = ${id};
    `;

    return updated[0];
};

export const deletePostService = async (id: number): Promise<Post> => {
    const deleted: Post[] = await prisma.$queryRaw`
        SELECT * FROM Post WHERE id = ${id};
    `;

    await prisma.$queryRaw`
        DELETE FROM Post WHERE id = ${id};
    `;

    return deleted[0];
};
