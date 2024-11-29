import prisma from "@/prisma/db";
import ProductList from "@/app/components/ProductList";
import UserAvatar from "@/app/components/UserAvatar";
import { getIfUserFollows, followUser, unfollowUser } from "@/prisma/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  let currentUser = null;
  let currentUserDBId: User | null = null;
  if (isUserAuthenticated) {
    currentUser = await getUser();
    currentUserDBId = await prisma.user.findFirst({
      where: {
        userID: currentUser.id,
      },
    });
  }

  const userSearchedFor = await prisma.user.findUnique({
    where: {
      userID: userId,
    },
  });

  if (!userSearchedFor) {
    return <div>User not found</div>;
  }

  const items = await prisma.wishlistItem.findMany({
    where: {
      ownerUserId: userSearchedFor?.id,
    },
  });

  let isFollowedAlready = null;
  if (currentUserDBId)
    isFollowedAlready = await getIfUserFollows(
      currentUserDBId.id,
      userSearchedFor.id
    );

  async function handleFollowUser() {
    "use server";
    if (!currentUserDBId || !userSearchedFor) return;
    await followUser(currentUserDBId.id, userSearchedFor.id);
    revalidatePath(`/user/${userId}`);
  }

  async function handleUnfollowUser() {
    "use server";
    if (!currentUserDBId || !userSearchedFor) return;
    await unfollowUser(currentUserDBId.id, userSearchedFor.id);
    revalidatePath(`/user/${userId}`);
  }

  return (
    <div className="flex flex-col items-center px-12">
      <div className="flex flex-col items-center gap-3">
        <UserAvatar user={userSearchedFor} />
        <div className="text-2xl font-bold">
          {userSearchedFor.given_name} {userSearchedFor.family_name}
        </div>
        {isUserAuthenticated && !isFollowedAlready && (
          <form action={handleFollowUser}>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 self-center text-center"
            >
              Follow
            </button>
          </form>
        )}
        {isUserAuthenticated && isFollowedAlready && (
          <form action={handleUnfollowUser}>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 self-center text-center"
            >
              Unfollow
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-6 w-full">
        <div className="flex flex-col gap-3 mt-6 w-full">
          {isAuthenticated ? (
            <ProductList
              userId={userSearchedFor.id}
              items={items}
              buttonType={"buy"}
            />
          ) : (
            <ProductList
              userId={userSearchedFor.id}
              items={items}
              buttonType={"bought"}
            />
          )}

        </div>
      </div>
    </div>
  );
  return <div>My Post: {userId}</div>;
}
