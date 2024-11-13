import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: NextRequest) {
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

        if (!userExists) {
            await prisma.user.create({
                data: {
                    userID: id,
                    family_name: user.family_name || '',
                    given_name: user.given_name || '',
                },
            });
        }

        return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
        return NextResponse.redirect(new URL('/', req.url));
    }
}