import prisma from "@/prisma/db"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/app/helpers/formatPrice"
import UserAvatar from "@/app/components/UserAvatar"
import { getIfUserFollows } from "@/prisma/actions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const userId = (await params).id;
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    let currentUser = null;
    let currentUserDBId = null;
    if (isUserAuthenticated) {
        currentUser = await getUser();
        currentUserDBId = await prisma.user.findFirst({
            where: {
                userID: userId
            }
        })
    }

    const userSearchedFor = await prisma.user.findUnique({
        where: {
            userID: userId
        }
    })

    if (!userSearchedFor) {
        return <div>User not found</div>
    }

    const items = await prisma.wishlistItem.findMany({
        where: {
            ownerUserId: userSearchedFor?.id
        }
    })

    let isFollowedAlready = null;
    if (currentUserDBId) isFollowedAlready = await getIfUserFollows(currentUserDBId.id, userSearchedFor.id)


    return (
        <div className="flex flex-col items-center px-12">
            <div className="flex flex-col items-center gap-3">
                <UserAvatar user={userSearchedFor} />
                <div className="text-2xl font-bold">{userSearchedFor.given_name} {userSearchedFor.family_name}</div>
                {isUserAuthenticated && !isFollowedAlready && (
                    <form action="/api/follow" method="post">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 self-center text-center">Follow</button>
                    </form>)}
                {isUserAuthenticated && isFollowedAlready && (
                    <form action="/api/logout" method="post">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 self-center text-center">Follow</button>
                    </form>)}
            </div>
            <div className="flex flex-col gap-3 mt-6 w-full">
                {items.map(item => {
                    const photoLink = item.photoLink === "default" ? '/images/default_item.png' : item.photoLink;
                    return (
                        <Link href={item.link} key={item.id} className="flex w-full sm:w-10/12">
                            <div key={item.id} className="flex flex-row gap-3">
                                <div className="relative min-w-24 min-h-24 max-h-24">
                                    <Image alt={item.name} src={photoLink} fill={true} objectFit="cover" className=" rounded-lg" />
                                </div>
                                <div className="flex flex-col w-[80%]">
                                    <div className="text-lg">{item.name}</div>
                                    <div className="text-lg">{formatPrice(item.price)}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
    return <div>My Post: {userId}</div>
}