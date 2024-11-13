'use client';

export default function DeleteButton({ onDelete, itemId }: { onDelete: (id: number) => void, itemId: number }) {
    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete(itemId)}
        >
            Delete
        </button>
    );
}