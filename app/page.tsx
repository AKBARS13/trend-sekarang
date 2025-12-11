// app/page.tsx

import { TrendTabs, TrendItem } from '../components/TrendTabs';
import { Ticker } from '../components/Ticker';
import { LivePoll } from '../components/LivePoll';

type NewsResponse = {
  trends: TrendItem[];
  updatedAt?: string;
};

// Base URL beda antara dev & production (Vercel)
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://trend-sekarang.vercel.app' // domain vercel kamu
    : 'http://localhost:3000';

async function getNewsTrends(): Promise<NewsResponse> {
  const res = await fetch(`${baseUrl}/api/trends/news`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Gagal ambil data berita (status ${res.status})`);
  }

  const data = (await res.json()) as NewsResponse;
  return data;
}

export default async function Home() {
  const { trends = [], updatedAt } = await getNewsTrends();

  // Ambil 5 judul teratas buat ticker
  const tickerItems = trends.slice(0, 5).map((t) => t.title);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Trend Sekarang</h1>
            <p className="text-sm text-zinc-400">
              Agregator tren dan berita terbaru Indonesia.
            </p>
          </div>
          <span className="text-xs text-zinc-500">
            Last update:{' '}
            {updatedAt ? new Date(updatedAt).toLocaleTimeString('id-ID') : '-'}
          </span>
        </header>

        {/* Ticker headline */}
        <Ticker items={tickerItems} />

        {/* Tabs: Berita / YouTube / Google Trends */}
        <TrendTabs newsTrends={trends} />

        {/* Live poll */}
        <LivePoll />
      </div>
    </main>
  );
}