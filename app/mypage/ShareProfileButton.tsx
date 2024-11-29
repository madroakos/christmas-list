'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export default function ShareProfileButton({ profileId, origin }: { profileId: number, origin: string | null }) {
    const handleClick = async () => {
        if (!origin) return;
        const profileUrl = `${origin}/user/${profileId}`;
        if (navigator.share) {
            const shareData = {
                title: 'Whishy',
                text: 'Check out my profile on Whishy',
                url: profileUrl,
            };
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(profileUrl);
        }
    }


    return (
        <button
            className="btn btn-ghost w-fit self-center text-center"
            onClick={handleClick}>
            <FontAwesomeIcon icon={faShareNodes} />
        </button>
    );
}