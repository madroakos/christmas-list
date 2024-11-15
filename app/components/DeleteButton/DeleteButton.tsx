import { deleteItem } from "@/prisma/actions";
import { revalidatePath } from "next/cache";

export default async function DeleteButton({ itemId }: { itemId: number }) {
    const onDelete = async (formData: FormData) => {
        'use server';
        const itemId = Number(formData.get('itemId'));
        await deleteItem(itemId);
        revalidatePath('/mypage');
    }

    return (
        <form action={onDelete}>
            <input type="hidden" name="itemId" value={itemId} />
            <button className="btn btn-error w-16" type={"submit"}>Delete</button>
        </form >
    );
}