import { User } from "@prisma/client";
import UserType from "../types/user.type";
import prisma from "../utils/client";

export const createUserService = async (user: UserType) => {
    let newUser: User | null = null as User | null;

    // Limited Prisma Transaction: queryRaw is not supported in Prisma Transaction
    await prisma.$transaction(async (tx) => {
        newUser = await tx.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user?.password || ""
            }
        });
        await tx.post.create({
            data: {
                title: "Hello World",
                content: "This is my first post",
                authorId: newUser.id
            }
        });
    });

    return await prisma.user.findUnique({
        where: {
            id: newUser?.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            posts: true
        }
    });
};

export const getUserByEmailService = async (email: string): Promise<User | null> => {
    const user: User[] = await prisma.$queryRaw`
        SELECT * FROM User
        WHERE email = ${email};
    `;

    if (user.length === 0) return null;

    return user[0];
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user: User[] = await prisma.$queryRaw`
        SELECT * FROM User
        WHERE id = ${id};
    `;

    return user.length === 0 ? null : user[0];
};

export const getCountUserPostsService = async (): Promise<User[]> => {
    return await prisma.$queryRaw`
        SELECT u.id, u.name, u.email, CAST(COUNT(p.id) AS CHAR) AS totalPosts        
        FROM User u
        LEFT JOIN Post p ON u.id = p.authorId
        GROUP BY u.id, u.name, u.email;
    `;
};
