// components/Ticker.tsx

type TickerProps = {
  items: string[];
};

export function Ticker({ items }: TickerProps) {
  if (!items || items.length === 0) return null;

  // Gandakan array biar animasi loop halus
  const loopItems = [...items, ...items];

  return (
    <div className="w-full bg-zinc-900 border-y border-zinc-800 py-2 mb-6 overflow-hidden">
      <div className="ticker-track whitespace-nowrap px-4">
        {loopItems.map((title, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mr-10 text-sm"
          >
            <span className="text-orange-500">🔥</span>
            <span>{title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}