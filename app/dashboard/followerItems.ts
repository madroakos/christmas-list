import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getFollowedUsers, getUserById, getItemsByUser } from "@/prisma/actions";
import { User, WishlistItem } from "@prisma/client";

type UserWithItems = {
    user: User;
    items: WishlistItem[];
};

export default async function getData(): Promise<UserWithItems[] | null> {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) {
        const user = await getUser();
        const userID = (await getUserById(user.id));

        if (userID) {
            const followedUsers = await getFollowedUsers(userID);
            const userWithItemsPromises = followedUsers.map(async (followedUser) => {
                const items = await getItemsByUser(followedUser.id);
                if (items.length === 0) {
                    return null;
                }
                return {
                    user: followedUser,
                    items,
                };
            });

            const userWithItems = (await Promise.all(userWithItemsPromises)).filter(
                (result) => result !== null
            );

            return userWithItems.length > 0 ? userWithItems : null;
        }
    }
    return null;
}