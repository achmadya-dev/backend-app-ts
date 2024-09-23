import { User } from "@prisma/client";
import UserType from "../types/user.type";
import prisma from "../utils/client";

export const createUserService = async (user: UserType): Promise<User> => {
    return await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password as string
        }
    });
};

export const getUserByEmailService = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
};

export const getUserWithPostsService = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        include: {
            posts: true
        }
    });
};
