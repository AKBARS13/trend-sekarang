// components/TrendTabs.tsx
'use client';

import { useEffect, useState } from 'react';

export type TrendItem = {
  rank: number;
  title: string;
  link: string;
  source: string;
  pubDate?: string;
};

type TrendTabsProps = {
  newsTrends: TrendItem[];
};

type YoutubeVideo = {
  rank: number;
  id: string;
  title: string;
  channelTitle: string;
  views: string;
  url: string;
  thumbnail?: string;
};

const tabs = [
  { id: 'news', label: 'Berita' },
  { id: 'youtube', label: 'YouTube Trending' },
  { id: 'google', label: 'Google Trends' },
];

const YT_CATEGORIES = [
  { id: 'all', label: 'Semua' }, // tanpa filter kategori
  { id: '10', label: 'Musik' }, // Music
  { id: '20', label: 'Game' }, // Gaming
  { id: '24', label: 'Hiburan' }, // Entertainment
  { id: '17', label: 'Olahraga' }, // Sports
  { id: '25', label: 'Berita & Politik' } // News & Politics
];

const GOOGLE_DUMMY = [
  { rank: 1, keyword: 'harga beras naik', note: 'Naik di banyak daerah, pengaruhi biaya hidup.' },
  { rank: 2, keyword: 'harga cabai hari ini', note: 'Komoditas yang sering bikin inflasi melonjak.' },
  { rank: 3, keyword: 'kurs dolar ke rupiah', note: 'Dipantau pebisnis dan yang belanja online luar negeri.' },
  { rank: 4, keyword: 'bbm naik atau turun', note: 'Topik sensitif yang langsung terasa ke masyarakat.' },
  { rank: 5, keyword: 'cuaca ekstrem hari ini', note: 'Warga cari info banjir dan potensi hujan lebat.' },

  { rank: 6, keyword: 'bmkg peringatan dini cuaca', note: 'Sumber info resmi untuk cuaca dan gelombang tinggi.' },
  { rank: 7, keyword: 'pendaftaran cpns 2025', note: 'Selalu ramai tiap ada pengumuman formasi baru.' },
  { rank: 8, keyword: 'gaji umr 2025 provinsi', note: 'Dicari pekerja untuk cek hak gaji minimal.' },
  { rank: 9, keyword: 'bansos cair kapan', note: 'Informasi bantuan sosial dari pemerintah.' },
  { rank: 10, keyword: 'kartu prakerja gelombang terbaru', note: 'Program pelatihan kerja yang diminati banyak orang.' },

  { rank: 11, keyword: 'cara daftar umkm online', note: 'Pelaku usaha kecil ingin legalitas dan akses bantuan.' },
  { rank: 12, keyword: 'pinjol legal ojk', note: 'Mencari platform pinjaman yang aman dan resmi.' },
  { rank: 13, keyword: 'investasi reksadana untuk pemula', note: 'Minat investasi naik di kalangan anak muda.' },
  { rank: 14, keyword: 'saham bca hari ini', note: 'Saham bluechip yang sering dipantau investor.' },
  { rank: 15, keyword: 'harga emas antam hari ini', note: 'Instrumen lindung nilai favorit banyak orang.' },

  { rank: 16, keyword: 'belajar coding gratis', note: 'Skill digital yang makin dibutuhkan di dunia kerja.' },
  { rank: 17, keyword: 'kursus online ui ux desain', note: 'Minat ke dunia desain produk digital meningkat.' },
  { rank: 18, keyword: 'kerja remote luar negeri', note: 'Keinginan gaji dolar sambil kerja dari Indonesia.' },
  { rank: 19, keyword: 'cara jadi content creator tiktok', note: 'Banyak yang ingin bangun personal brand dan penghasilan.' },
  { rank: 20, keyword: 'dompet digital cashback terbaru', note: 'Promo pembayaran pakai e-wallet yang diburu pengguna.' },
];

function formatViews(views: string) {
  const n = Number(views);
  if (Number.isNaN(n)) return views;

  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace('.0', '') + ' jt x ditonton';
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace('.0', '') + ' rb x ditonton';
  }
  return n.toLocaleString('id-ID') + ' x ditonton';
}

export function TrendTabs({ newsTrends }: TrendTabsProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'youtube' | 'google'>(
    'news'
  );

  const [ytVideos, setYtVideos] = useState<YoutubeVideo[]>([]);
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);
  const [ytCategory, setYtCategory] = useState<
    'all' | '10' | '20' | '24' | '17' | '25'
  >('all');
   const [showCategoryBar, setShowCategoryBar] = useState(false);

  // FETCH YOUTUBE TRENDING
  useEffect(() => {
    if (activeTab !== 'youtube') return;

    const fetchTrending = async () => {
      setYtLoading(true);
      setYtError(null);
      setYtVideos([]);

      const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;
      if (!apiKey) {
        setYtError(
          'API key YouTube belum di-set. Tambahkan NEXT_PUBLIC_YT_API_KEY di .env.local'
        );
        setYtLoading(false);
        return;
      }

      const categoryParam =
        ytCategory === 'all' ? '' : `&videoCategoryId=${ytCategory}`;

      const url =
        'https://www.googleapis.com/youtube/v3/videos' +
        `?part=snippet,statistics&chart=mostPopular&regionCode=ID&maxResults=50${categoryParam}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data: any = await res.json();

        if (!res.ok) {
          const apiMessage = data?.error?.message || '';
          setYtError(
            `YouTube API error (${res.status}). ${
              apiMessage || 'Coba lagi nanti atau cek API key / kuota.'
            }`
          );
          return;
        }

        const items = (data.items || []) as any[];

        const mapped: YoutubeVideo[] = items.map((item, index) => ({
          rank: index + 1,
          id: item.id,
          title: item.snippet?.title ?? '(tanpa judul)',
          channelTitle: item.snippet?.channelTitle ?? '',
          views: item.statistics?.viewCount ?? '0',
          url: `https://www.youtube.com/watch?v=${item.id}`,
          thumbnail: item.snippet?.thumbnails?.medium?.url,
        }));

        setYtVideos(mapped);
      } catch (err) {
        setYtError('Tidak bisa terhubung ke YouTube. Cek koneksi internet.');
      } finally {
        setYtLoading(false);
      }
    };

    fetchTrending();
  }, [activeTab, ytCategory]);

    return (
    <section className="mt-4">
      {/* Tombol Tab */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-sm border transition
              ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* WRAPPER KONTEN TAB DENGAN ANIMASI */}
      <div key={activeTab} className="fade-in-up">
        {/* TAB: BERITA */}
        {activeTab === 'news' && (
          <div className="space-y-3">
            {newsTrends.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4
                           bg-zinc-900 rounded-xl border border-zinc-800
                           hover:border-zinc-700 hover:bg-zinc-850
                           transition-all"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-2xl font-bold ${
                      index < 3 ? 'text-orange-500' : 'text-zinc-500'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-zinc-500">
                      {item.source} •{' '}
                      {item.pubDate
                        ? new Date(item.pubDate).toLocaleString('id-ID')
                        : ''}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* TAB: YOUTUBE TRENDING */}
        {activeTab === 'youtube' && (
          <div>
            {/* Tombol toggle filter */}
            <button
              onClick={() => setShowCategoryBar((s) => !s)}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-2
                         text-xs rounded-full border border-zinc-700
                         bg-zinc-900 text-zinc-300
                         hover:border-zinc-500 hover:bg-zinc-800
                         transition-all"
            >
              <span>Filter kategori</span>
              <span
                className={`transition-transform text-[17px] ${
                  showCategoryBar ? 'rotate-90' : ''
                }`}
              >
               ▸
              </span>
            </button>

            {/* Bar kategori dengan animasi muncul / hilang */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showCategoryBar
                  ? 'max-h-24 opacity-100 mb-3'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {YT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setYtCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-full text-xs border transition
                      ${
                        ytCategory === cat.id
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {ytLoading && (
              <p className="text-sm text-zinc-400">
                Mengambil data YouTube Trending...
              </p>
            )}

            {ytError && !ytLoading && (
              <p className="text-sm text-red-400">{ytError}</p>
            )}

            {!ytLoading && !ytError && ytVideos.length === 0 && (
              <p className="text-sm text-zinc-500">
                Tidak ada video untuk kategori ini dalam 50 trending teratas.
              </p>
            )}

            <div className="space-y-3 mt-2">
              {ytVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4
                             bg-zinc-900 rounded-xl border border-zinc-800
                             hover:border-zinc-700 hover:bg-zinc-850
                             transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-2xl font-bold ${
                        video.rank <= 3 ? 'text-red-500' : 'text-zinc-500'
                      }`}
                    >
                      {video.rank}
                    </span>
                    <div className="flex items-center gap-3">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-xs text-zinc-500">
                          {video.channelTitle} • {formatViews(video.views)}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

                {/* TAB: GOOGLE TRENDS */}
        {activeTab === 'google' && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 text-xs text-zinc-400">
              <span>Google Trends – Contoh pencarian populer di Indonesia</span>
              <a
                href="https://trends.google.com/trends/trendingsearches/daily?geo=ID&hl=id"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:text-orange-300"
              >
                Buka di Google Trends
              </a>
            </div>

            <div className="p-4 space-y-3">
              {GOOGLE_DUMMY.map((item) => {
                // URL Google Search untuk keyword ini
                const searchUrl =
                  'https://www.google.com/search?q=' +
                  encodeURIComponent(item.keyword + ' tren Indonesia');

                return (
                  <a
                    key={item.rank}
                    href={searchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div
                      className="flex items-center justify-between p-3
                                 bg-zinc-950 rounded-lg border border-zinc-800
                                 hover:bg-zinc-900 hover:border-zinc-700
                                 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-2xl font-bold ${
                            item.rank <= 3 ? 'text-green-500' : 'text-zinc-500'
                          }`}
                        >
                          {item.rank}
                        </span>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <span>🔍</span>
                            <span>{item.keyword}</span>
                          </p>
                          <p className="text-xs text-zinc-500">{item.note}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}