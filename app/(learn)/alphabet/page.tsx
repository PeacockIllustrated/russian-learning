import { AlphabetBoard } from "@/components/alphabet/AlphabetBoard";

export default function AlphabetPage() {
  return (
    <div className="pt-2">
      <h1 className="font-display text-lg font-extrabold">Cyrillic refresher</h1>
      <p className="mb-4 mt-1 text-xs text-greyish">Tap a card to flip. You have seen these before.</p>
      <AlphabetBoard />
    </div>
  );
}
