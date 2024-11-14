import { createItem } from "@/prisma/actions"
import BackButton from "./BackButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserById } from "@/prisma/actions";

export default async function AddItemPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userFromDatabase = await getUserById(user.id);

    const submitForm = async (formData: FormData) => {
        'use server'
        if (userFromDatabase?.id) {
            const name = formData.get('name') as string | null;
            const link = formData.get('url') as string | null;
            const price = formData.get('price') as string | null;

            if (name && link && price) {
                createItem(userFromDatabase.id, name, link, parseFloat(price));
            } else {
                console.error("Form data is incomplete");
            }
        } else {
            console.error("User ID is undefined");
        }
    }

    return (
        <div className="flex flex-col items-center h-full">
            <form action={submitForm} className="flex flex-col items-center h-full pt-12 gap-6 w-[60vw]">
                <div className="self-start ">
                    <BackButton />
                </div>
                <p className="font-bold text-xl">Input a link for you item:</p>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                <div className="divider self-center">OR</div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product name:</span>
                    </div>
                    <input name="name" type="text" required placeholder='"LEGO Piece 32557..."' className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product link:</span>
                    </div>
                    <input name="url" type="text" required placeholder='url' className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Product price:</span>
                    </div>
                    <input name="price" type="number" required placeholder='HUF' className="input input-bordered w-full max-w-xs" />
                </label>
                <button className="btn btn-primary" type="submit">Add item</button>
            </form>
        </div>
    )
}