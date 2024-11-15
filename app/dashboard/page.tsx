'use server';
import getData from "@/app/dashboard/followerItems"
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/app/helpers/formatPrice";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getUserById } from "@/prisma/actions";
import BuyButton from "../components/BuyButton/BuyButton";
import CancelBuyButton from "../components/CancelBuyButton/CancelBuyButton";

export default async function DashboardPage() {
    const items = await getData();

    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    const user = await getUserById(kindeUser.id);


    return (
        <div className="flex flex-col gap-6 p-12 md:mx-auto md:w-[40em] lg:w-[50em] xl:w-[55em] 2xl:w-[60em]">
            <h1 className="font-bold text-3xl self-center">Santa&apos;s list</h1>

            {items ? items.map((userWithItems) => (
                <div key={userWithItems.user.id}>
                    <Link href={`/user/${userWithItems.user.userID}`} passHref>
                        <h1 className="font-bold text-2xl mb-3">{userWithItems.user.given_name} {userWithItems.user.family_name}</h1>
                    </Link>
                    <div className="flex flex-col gap-6">
                        {userWithItems.items.map((item) => {
                            const photoLink = item.photoLink === "default" ? '/images/default_item.png' : item.photoLink;

                            return (

                                <div key={item.id} className="flex flex-row justify-between">
                                    <Link href={item.link} passHref>
                                        <div className="flex flex-row gap-3">
                                            <div className="relative min-w-24 min-h-24 max-h-24">
                                                <Image src={photoLink} alt={item.name} className="rounded-lg" fill={true} objectFit="cover" />
                                            </div>
                                            <div className="flex flex-col self-center">
                                                <h2 className="font-bold text-lg">{item.name}</h2>
                                                <p>{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="self-center">
                                        {item.boughtbyUserId ?
                                            item.boughtbyUserId === user?.id ? (
                                                <CancelBuyButton userId={user.id} itemId={item.id} />
                                            ) : (
                                                <p className="btn btn-ghost w-16 btn-disabled">Bought</p>
                                            ) : (
                                                user ? (
                                                    <BuyButton userId={user?.id} itemId={item.id} />
                                                ) : (<></>)
                                            )}
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            )) : (<div className="flex self-center">
                <h1 className="text-2xl">Follow other people to see their wishes</h1>
            </div>)
            }
        </div >
    )
}