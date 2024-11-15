import { revalidatePath } from 'next/cache';
import { cancelBuy } from '@/prisma/actions';

export default async function CancelBuyButton({ userId, itemId }: { userId: number, itemId: number }) {
    const handleCancelBuy = async (formData: FormData) => {
        'use server';
        if (!userId || !itemId) {
            return;
        }
        await cancelBuy(itemId);
        revalidatePath('/dashboard');
    }

    return (
        <form action={handleCancelBuy}>
            <button className="btn btn-square btn-error w-16" type='submit'>Cancel</button>
        </form >
    )
}
