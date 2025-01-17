import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma/db";
import Link from "next/link";
import UserAvatar from "@/app/components/UserAvatar";
import ProductList from "@/app/components/ProductList";
import ShareProfileButton from "./ShareProfileButton";
import { headers } from "next/headers";
import { User, WishlistItem } from "@prisma/client";

export default async function MyPage() {
    const headersList = headers();
    const origin = (await headersList).get("host");

    const { isAuthenticated, getUser } = getKindeServerSession();

    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) {
        const user = await getUser();
        const { id } = user;
        const userExists = await prisma.user.findFirst({
            where: {
                userID: id,
            },
        });

        if (userExists) {
            const items = await prisma.wishlistItem.findMany({
                where: {
                    ownerUserId: userExists.id,
                },
            });

            const itemsTheyBoughtForUsers = await prisma.wishlistItem.findMany({
                where: {
                    boughtbyUserId: userExists.id,
                },
            });

            console.log(itemsTheyBoughtForUsers);

            const itemsArray: { user: User, items: WishlistItem[] }[] = [];
            for (const item of itemsTheyBoughtForUsers) {
                const ownerUser = await prisma.user.findUnique({
                    where: { id: item.ownerUserId },
                });
                if (ownerUser) {
                    const existingUser = itemsArray.find(entry => entry.user.id === ownerUser.id);
                    if (existingUser) {
                        existingUser.items.push(item);
                    } else {
                        itemsArray.push({ user: ownerUser, items: [item] });
                    }
                }
            }

            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-3">
                        <UserAvatar user={userExists} />
                        <div className="text-2xl font-bold">
                            {user.given_name} {user.family_name}
                        </div>
                        <ShareProfileButton profileId={id} origin={origin} />
                    </div>
                    <div className="flex flex-col gap-3 mt-6 w-full">
                        <Link
                            href={"/items/add"}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 self-center text-center"
                        >
                            Add new item
                        </Link>
                        <ProductList
                            userId={userExists.id}
                            items={items}
                            buttonType={"delete"}
                        />
                    </div>
                    <div className="mt-12">
                        <h1 className="text-2xl font-bold text-center mb-6">
                            Items you marked for buy
                        </h1>
                        {itemsArray.length > 0 &&
                            itemsArray.map(({ user, items }, index) => (
                                items.length > 0 && (
                                    <div key={index} className="flex flex-col items-center gap-3 mb-9">
                                        <Link href={`/user/${user.userID}`} className="text-2xl font-bold self-start pl-3">
                                            {user.given_name} {user.family_name}
                                        </Link>
                                        <ProductList key={user.id} items={items} userId={user.id} buttonType="cancel" />
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div >
            );
        }
    } else {
        return (
            <div>
                <h1>Not authenticated</h1>
            </div>
        );
    }
}
