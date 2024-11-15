'use client';

export default function CancelBuyButton({ handleCancelBuy, itemId }: { handleCancelBuy: (itemId: number) => void, itemId: number }) {

    return (
        <button className="btn btn-square btn-error w-16" onClick={() => handleCancelBuy(itemId)}>Cancel</button>
    )
}