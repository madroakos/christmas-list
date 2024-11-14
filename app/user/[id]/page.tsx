import prisma from "@/prisma/db"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/app/helpers/formatPrice"
import UserAvatar from "@/app/components/UserAvatar"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const userId = (await params).id

    const user = await prisma.user.findUnique({
        where: {
            userID: userId
        }
    })

    const items = await prisma.wishlistItem.findMany({
        where: {
            userId: user?.id
        }
    })

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div className="flex flex-col items-center px-12">
            <div className="flex flex-col items-center gap-3">
                <UserAvatar user={user} />
                <div className="text-2xl font-bold">{user.given_name} {user.family_name}</div>
            </div>
            <div className="flex flex-col gap-3 mt-6 w-full">
                {items.map(item => (
                    <Link href={item.link} key={item.id} className="flex justify-center">
                        <div key={item.id} className="flex flex-row gap-3">
                            <div>
                                <Image width={80} height={80} alt={item.name} src={item.photoLink} className="w-24 h-24 bg-clip-content rounded-xl" />
                            </div>
                            <div className="flex flex-col w-[80%]">
                                <div className="text-lg">{item.name}</div>
                                <div className="text-lg">{formatPrice(item.price)}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
    return <div>My Post: {userId}</div>
}