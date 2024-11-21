import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  console.log("isUserAuthenticated", isUserAuthenticated);

  if (!isUserAuthenticated && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isUserAuthenticated && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isUserAuthenticated) {
    const user = await getUser();
    if (request.nextUrl.pathname === `/user/${user.id}`) {
      return NextResponse.redirect(new URL("/mypage", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/mypage/:path*", "/user/:path*"],
};
