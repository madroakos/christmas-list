import prisma from "@/prisma/db"
import Link from "next/link"

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
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="text-2xl font-bold">{user.given_name} {user.family_name}</div>
            </div>
            <div className="flex flex-col gap-3 mt-6 w-full">
                {items.map(item => (
                    <Link href={item.link} key={item.id}>
                        <div key={item.id} className="flex flex-row gap-3">
                            <div>
                                <img src={item.photoLink} className="w-24 h-24 bg-clip-content rounded-xl" />
                            </div>
                            <div className="flex flex-col self-center items-center">
                                <div className="text-lg">{item.name}</div>
                                <div className="text-lg">{item.price}Ft</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
    return <div>My Post: {userId}</div>
}