import { User } from "@prisma/client"
import Image from "next/image"

export default function UserAvatar({ user }: { user: User }) {
    if (user.profile_picture.includes("default")) {
        return (
            <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">{user.given_name.substring(0, 1)}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <Image width={80} height={80} src={user.profile_picture} alt={`Profile picture of ${user.given_name} ${user.family_name}`} />
                </div>
            </div>
        )
    }
}