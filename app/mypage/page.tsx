import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/prisma/db';
import Link from 'next/link';
import { deleteItem } from '@/prisma/actions';
import DeleteButton from '@/app/mypage/DeleteButton';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import UserAvatar from '@/app/components/UserAvatar';

export default async function MyPage() {
    const { isAuthenticated, getUser } = getKindeServerSession();

    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) {
        const user = await getUser();
        const { id } = user;
        const userExists = await prisma.user.findFirst({
            where: {
                userID: id,
            },
        });

        if (userExists) {
            const items = await prisma.wishlistItem.findMany({
                where: {
                    userId: userExists.id,
                },
            });

            return (
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center gap-3">
                        <UserAvatar user={userExists} />
                        <div className="text-2xl font-bold">{user.given_name} {user.family_name}</div>
                    </div >
                    <div className="flex flex-col gap-3 mt-6 w-full">
                        <Link href={'/items/add'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 self-center text-center">Add new item</Link>
                        {items.map(item => (
                            <div key={item.id} className='flex flex-row w-full md:self-center md:w-[75vw] lg:w-[50vw] xl:w-[30vw] justify-between px-6'>
                                <Link href={item.link} >
                                    <div key={item.id} className="flex flex-row gap-3">
                                        <div>
                                            <Image width={80} height={80} src={item.photoLink} alt={item.name} className="w-24 h-24 bg-clip-content rounded-xl" />
                                        </div>
                                        <div className="flex flex-col self-center items-center">
                                            <div className="text-lg">{item.name}</div>
                                            <div className="text-lg">{item.price}Ft</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='self-center'>
                                    <DeleteButton onDelete={onDelete} itemId={item.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            )
        }
    } else {
        return (
            <div>
                <h1>Not authenticated</h1>
            </div>
        )
    }
}

async function onDelete(itemId: number) {
    'use server';
    deleteItem(itemId);
    revalidatePath('/mypage');
}