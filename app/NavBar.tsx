import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavBar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const userName = await getUser();
    console.log(userName);

    return (
        <nav className='h-12 flex items-center justify-end p-6'>
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