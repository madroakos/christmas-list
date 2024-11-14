import { User } from "@prisma/client";
import prisma from "./db";

export async function getUserById(userId: string) {
    'use server';
    return prisma.user.findUnique({
        where: {
            userID: userId,
        },
    });
}

export async function createItem(userId: number, name: string, link: string, price: number, photoLink = "default") {
    'use server';
    return prisma.wishlistItem.create({
        data: {
            name,
            link,
            price,
            photoLink,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}

export async function deleteItem(itemId: number) {
    'use server';
    return prisma.wishlistItem.delete({
        where: {
            id: itemId,
        },
    });
}

export async function getFollowedUsers(follower: User) {
    'use server';
    return prisma.user.findMany({
        where: {
            followers: {
                some: {
                    follower: follower,
                },
            },
        },
    });
}

export async function getItemsByUser(userId: number) {
    'use server';
    return prisma.wishlistItem.findMany({
        where: {
            userId,
        },
    });
}