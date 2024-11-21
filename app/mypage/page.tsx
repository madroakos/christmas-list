import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/prisma/db";
import Link from "next/link";
import UserAvatar from "@/app/components/UserAvatar";
import ProductList from "@/app/components/ProductList";
import ShareProfileButton from "./ShareProfileButton";
import { headers } from "next/headers";

export default async function MyPage() {
  const headersList = headers();
  const origin = (await headersList).get("host");

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
          ownerUserId: userExists.id,
        },
      });

      const itemsBought = await prisma.wishlistItem.findMany({
        where: {
          boughtbyUserId: userExists.id,
        },
      });

      return (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-3">
            <UserAvatar user={userExists} />
            <div className="text-2xl font-bold">
              {user.given_name} {user.family_name}
            </div>
            <ShareProfileButton profileId={id} origin={origin} />
          </div>
          <div className="flex flex-col gap-3 mt-6 w-full">
            <Link
              href={"/items/add"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 self-center text-center"
            >
              Add new item
            </Link>
            <ProductList
              userId={userExists.id}
              items={items}
              buttonType={"delete"}
            />
          </div>
          <div className="mt-12">
            <h1 className="text-2xl font-bold text-center mb-6">
              Items you marked for buy
            </h1>
            <ProductList
              userId={userExists.id}
              items={itemsBought}
              buttonType={"cancel"}
            />
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h1>Not authenticated</h1>
      </div>
    );
  }
}
