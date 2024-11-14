import getData from "@/app/dashboard/followerItems"
export default async function DashboardPage() {
    const items = await getData();

    if (items) {
        return (
            <div className="flex flex-col gap-6 p-12">
                {items.map((userWithItems) => (
                    <div key={userWithItems.user.id}>
                        <h1 className="font-bold text-2xl mb-3">{userWithItems.user.given_name} {userWithItems.user.family_name}</h1>
                        <div className="flex flex-col gap-6">
                            {userWithItems.items.map((item) => (
                                <div key={item.id} className="flex flex-row gap-3">
                                    <img src={item.photoLink} alt={item.name} className="w-20 h-20 rounded-lg" />
                                    <div className="flex flex-col self-center">
                                        <h2 className="font-bold text-lg">{item.name}</h2>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div className="flex self-center">
                <h1 className="font-bold text-2xl">No items to display</h1>
            </div>
        );
    }
}