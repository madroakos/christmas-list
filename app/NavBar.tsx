import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function NavBar() {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    return (
        <nav className='h-12 flex flex-row justify-between items-center px-6 py-12'>
            <div className="">
                <Link href='/'>
                    <span className="text-4xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-white bg-clip-text text-transparent">Public Wishlist</span>
                </Link>
            </div>
            <div>
                <ul className='flex flex-row gap-3'>
                    {isUserAuthenticated ? (
                        <>
                            <Link href='/mypage'>
                                <li className="btn btn-primary">My page</li>
                            </Link>
                            <LogoutLink>
                                <li className="btn btn-primary">Sign out</li>
                            </LogoutLink>

                        </>
                    ) : (
                        <>
                            <li className="btn btn-primary">
                                <LoginLink>Login</LoginLink>
                            </li>
                            <li className="btn btn-primary">
                                <RegisterLink>Sign up</RegisterLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}