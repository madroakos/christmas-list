import Link from "next/link";
import Image from "next/image";
import DeleteButton from "../components/DeleteButton/DeleteButton";
import { formatPrice } from "../helpers/formatPrice";
import CancelBuyButton from "../components/CancelBuyButton/CancelBuyButton";

export default function ProductList({ userId, items, buttonType }: { userId: number, items: any[], buttonType: "delete" | "cancel" }) {

    return (
        <>
            {items ? (items.map(item => {
                const photoLink = item.photoLink === "default" ? '/images/default_item.png' : item.photoLink;
                return (
                    <div key={item.id} className='flex flex-row w-full md:self-center md:w-[40em] lg:w-[43em] xl:w-[45em] 2xl:w-[50em] justify-between px-6'>
                        <Link href={item.link} >
                            <div key={item.id} className="flex flex-row gap-3">
                                <div>
                                    <Image width={80} height={80} src={photoLink} alt={item.name} className="rounded-xl" />
                                </div>
                                <div className="flex flex-col self-center">
                                    <div className="text-lg">{item.name}</div>
                                    <div className="text-lg">{formatPrice(item.price)}</div>
                                </div>
                            </div>
                        </Link>
                        <div className='self-center'>
                            {buttonType === "delete" && <DeleteButton itemId={item.id} />}
                            {buttonType === "cancel" && <CancelBuyButton userId={userId} itemId={item.id} />}
                        </div>
                    </div>
                )
            })) : (
                <div className="flex self-center">
                    <p className="text-lg">No items</p>
                </div>
            )
            }
        </>
    )
}