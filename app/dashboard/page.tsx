import getData from "@/app/dashboard/followerItems"
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/app/helpers/formatPrice";

export default async function DashboardPage() {
    const items = await getData();

    if (items) {
        return (
            <div className="flex flex-col gap-6 p-12">
                {items.map((userWithItems) => (
                    <div key={userWithItems.user.id}>
                        <Link href={`/user/${userWithItems.user.userID}`} passHref>
                            <h1 className="font-bold text-2xl mb-3">{userWithItems.user.given_name} {userWithItems.user.family_name}</h1>
                        </Link>
                        <div className="flex flex-col gap-6">
                            {userWithItems.items.map((item) => (
                                <Link key={item.id} href={item.link} passHref>
                                    <div className="flex flex-row gap-3">
                                        <Image width={80} height={80} src={item.photoLink} alt={item.name} className="rounded-lg" />
                                        <div className="flex flex-col self-center">
                                            <h2 className="font-bold text-lg">{item.name}</h2>
                                            <p>{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div className="flex self-center">
                <h1 className="font-bold text-2xl">No items to display</h1>
            </div>
        );
    }
}