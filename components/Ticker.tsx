// components/Ticker.tsx

type TickerProps = {
  items: string[];
};

export function Ticker({ items }: TickerProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-zinc-900 border-y border-zinc-800 py-2 mb-6 overflow-x-auto">
      <div className="flex gap-8 text-sm whitespace-nowrap px-4">
        {items.map((title, i) => (
          <span key={i} className="flex items-center gap-2 mr-4">
            <span className="text-orange-500">🔥</span>
            {title}
          </span>
        ))}
      </div>
    </div>
  );
}