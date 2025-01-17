'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export default function ShareProfileButton({ profileId, origin }: { profileId: string, origin: string | null }) {
    const handleClick = async () => {
        if (!origin) return;
        const profileUrl = `/user/${profileId}`;
        if (navigator.share) {
            const shareData = {
                title: 'Wishy',
                text: 'Check out my profile on Wishy',
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