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

export async function buyItem(itemId: number, buyerId: number) {
    'use server';
    return prisma.wishlistItem.update({
        where: {
            id: itemId,
        },
        data: {
            boughtbyUserId: buyerId,
        },
    });
}

export async function cancelBuy(itemId: number) {
    'use server';
    return prisma.wishlistItem.update({
        where: {
            id: itemId,
        },
        data: {
            boughtbyUserId: null,
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

export async function followUser(followerId: number, followedId: number) {
    'use server';
    return prisma.follow.create({
        data: {
            followerId,
            followingId: followedId,
        },
    });
}

export async function unfollowUser(followerId: number, followedId: number) {
    'use server';
    return prisma.follow.deleteMany({
        where: {
            followerId,
            followingId: followedId,
        },
    });
}

export async function getIfUserFollows(followerId: number, followedId: number) {
    'use server';
    return prisma.follow.findFirst({
        where: {
            followerId: followerId,
            followingId: followedId,
        },
    });
}

export async function getItemsByUser(ownerUserId: number) {
    'use server';
    return prisma.wishlistItem.findMany({
        where: {
            ownerUserId,
        },
    });
}