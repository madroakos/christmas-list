import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavBar() {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    return (
        <nav className='h-12 flex items-center justify-end px-6 py-12'>
            <ul className='flex flex-row gap-3'>
                {isUserAuthenticated ? (
                    <li className="btn btn-primary">
                        <LogoutLink>Sign out</LogoutLink>
                    </li>
                ) : (
                    <>
                        <li className="btn btn-primary">
                            <LoginLink>Sign in</LoginLink>
                        </li>
                        <li className="btn btn-primary">
                            <RegisterLink>Sign up</RegisterLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}