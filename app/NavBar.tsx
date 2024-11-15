import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function NavBar() {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    return (
        <>
            < div className="navbar p-3">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-red-600 via-green-600 to-white bg-clip-text text-transparent">Wishy</Link>
                </div>
                <div className="flex-none">
                    <div className={` ${isUserAuthenticated ? 'dropdown dropdown-end' : ''} md:hidden`}>
                        {isUserAuthenticated ? (
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 sm:w-64 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                        ) : (
                            <LoginLink>Login</LoginLink>
                        )}
                        {isUserAuthenticated ? (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow">

                                <>
                                    <li>
                                        <Link href={"/"} className="justify-between">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/mypage"} className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><LogoutLink>Logout</LogoutLink></li>
                                </>

                            </ul>
                        ) : (<></>)}
                    </div>
                    <div className="hidden md:inline-block">
                        <ul className="menu menu-horizontal text-xl">
                            {isUserAuthenticated ? (
                                <>
                                    <li>
                                        <Link href={"/"} className="justify-between">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/mypage"} className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><LogoutLink>Logout</LogoutLink></li>
                                </>
                            ) : (
                                <>
                                    <li><LoginLink>Sign in</LoginLink></li>
                                    <li><RegisterLink>Register</RegisterLink></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div >
        </>
    );
}