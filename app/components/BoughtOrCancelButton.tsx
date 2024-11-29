import CancelBuyButton from "./CancelBuyButton/CancelBuyButton";
import BuyButton from "./BuyButton/BuyButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserById } from "@/prisma/actions";

export default async function BoughtOrCancelButton({ itemId, itemBoughtById }: { itemId: number, itemBoughtById: number }) {
    const { getUser } = getKindeServerSession();
    const currentUser = await getUser();
    const userId = await getUserById(currentUser.id);

    if (userId?.id && itemBoughtById === userId.id) {
        return (
            <CancelBuyButton userId={userId.id} itemId={itemId} />
        );
    } else if (userId?.id && itemBoughtById !== userId.id) {
        return (
            <BuyButton userId={userId.id} itemId={itemId} />
        );
    } else {
        return null;
    }
}