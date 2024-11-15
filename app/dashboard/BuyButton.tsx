'use client';

export default function BuyButton({ handleBuyItem, itemId }: { handleBuyItem: (itemId: number) => void, itemId: number }) {
    return (
        <button className="btn btn-square btn-accent w-16" onClick={() => handleBuyItem(itemId)}>Buy</button>
    );
}