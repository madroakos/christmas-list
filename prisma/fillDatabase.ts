import prisma from "./db";

async function fillDatabase() {
    const user1 = await prisma.user.create({
        data: {
            userID: "123",
            given_name: "John",
            family_name: "Doe",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            userID: "456",
            given_name: "Bon",
            family_name: "Te",
        },
    });

    const user3 = await prisma.user.create({
        data: {
            userID: "987",
            given_name: "Jake",
            family_name: "Brown",
        },
    });

    await prisma.wishlistItem.create({
        data: {
            name: "Item 1",
            price: 1000,
            link: "https://www.amazon.de/-/en/Amazon-Basics-Piece-Non-Stick-Cookware/dp/B07481LPMF/259-4423389-2646104?pd_rd_w=UlD2Z&content-id=amzn1.sym.0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_p=0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_r=1YQRD6DRT9WDS7MBY0V9&pd_rd_wg=3q2tV&pd_rd_r=46ddd3eb-fbe3-439c-94ce-5825cf3536d6&pd_rd_i=B07481LPMF&th=1",
            photoLink: "/images/pan.jpg",
            userId: user1.id,
        },
    });

    await prisma.wishlistItem.create({
        data: {
            name: "Item 2",
            price: 2000,
            link: "https://www.amazon.de/-/en/Amazon-Basics-Piece-Non-Stick-Cookware/dp/B07481LPMF/259-4423389-2646104?pd_rd_w=UlD2Z&content-id=amzn1.sym.0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_p=0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_r=1YQRD6DRT9WDS7MBY0V9&pd_rd_wg=3q2tV&pd_rd_r=46ddd3eb-fbe3-439c-94ce-5825cf3536d6&pd_rd_i=B07481LPMF&th=1",
            photoLink: "/images/pan.jpg",
            userId: user2.id,
        },
    });

    await prisma.wishlistItem.create({
        data: {
            name: "Item 3",
            price: 3000,
            link: "https://www.amazon.de/-/en/Amazon-Basics-Piece-Non-Stick-Cookware/dp/B07481LPMF/259-4423389-2646104?pd_rd_w=UlD2Z&content-id=amzn1.sym.0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_p=0b440ba7-e55f-435d-b17d-0bbcfd69be42&pf_rd_r=1YQRD6DRT9WDS7MBY0V9&pd_rd_wg=3q2tV&pd_rd_r=46ddd3eb-fbe3-439c-94ce-5825cf3536d6&pd_rd_i=B07481LPMF&th=1",
            photoLink: "/images/pan.jpg",
            userId: user3.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user1.id,
            followingId: user2.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user1.id,
            followingId: user3.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user2.id,
            followingId: user1.id,
        },
    });

    await prisma.follow.create({
        data: {
            followerId: user2.id,
            followingId: user3.id,
        },
    });
}

fillDatabase();