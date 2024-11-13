import prisma from "./db";

export async function deleteItem(itemId: number) {
    'use server';
    return prisma.wishlistItem.delete({
        where: {
            id: itemId,
        },
    });
}