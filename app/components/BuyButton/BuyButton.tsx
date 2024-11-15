import { buyItem } from "@/prisma/actions";
import { revalidatePath } from "next/cache";
import { format } from "path";

export default function BuyButton({ userId, itemId }: { userId: number, itemId: number }) {
    const handleBuyItem = async (formData: FormData) => {
        'use server';
        if (userId === null) {
            return;
        }
        buyItem(itemId, userId);
        revalidatePath('/dashboard');
    }

    return (
        <form action={handleBuyItem}>
            <button className="btn btn-square btn-accent w-16" type={"submit"}>Buy</button>
        </form>
    );
}