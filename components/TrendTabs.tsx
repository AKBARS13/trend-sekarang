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

type GameItem = {
  rank: number;
  name: string;
  type: string;
  note: string;
  image: string; // URL gambar online
};

const tabs = [
  { id: 'news', label: 'Berita' },
  { id: 'youtube', label: 'YouTube Trending' },
  { id: 'google', label: 'Google Trends' },
  { id: 'games', label: 'Game Viral' },
];

const YT_CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: '10', label: 'Musik' },
  { id: '20', label: 'Game' },
  { id: '24', label: 'Hiburan' },
  { id: '17', label: 'Olahraga' },
  { id: '25', label: 'Berita & Politik' },
];

const GOOGLE_DUMMY = [
  { rank: 1, keyword: 'Harga beras naik', note: 'Naik di banyak daerah, pengaruhi biaya hidup.' },
  { rank: 2, keyword: 'Harga cabai hari ini', note: 'Komoditas yang sering bikin inflasi melonjak.' },
  { rank: 3, keyword: 'Kurs dolar ke rupiah', note: 'Dipantau pebisnis dan yang belanja luar negeri.' },
  { rank: 4, keyword: 'Bbm naik atau turun', note: 'Topik sensitif yang langsung terasa ke masyarakat.' },
  { rank: 5, keyword: 'Cuaca ekstrem hari ini', note: 'Warga cari info banjir dan potensi hujan lebat.' },

  { rank: 6, keyword: 'Bmkg peringatan dini cuaca', note: 'Sumber info resmi soal cuaca dan gelombang tinggi.' },
  { rank: 7, keyword: 'Pendaftaran cpns 2025', note: 'Selalu ramai tiap ada pengumuman formasi baru.' },
  { rank: 8, keyword: 'Gaji umr 2025 provinsi', note: 'Dicari pekerja untuk cek hak gaji minimal.' },
  { rank: 9, keyword: 'Bansos cair kapan', note: 'Info pencairan bantuan sosial pemerintah.' },
  { rank: 10, keyword: 'Kartu prakerja gelombang terbaru', note: 'Program pelatihan kerja yang diminati banyak orang.' },

  { rank: 11, keyword: 'Cara daftar umkm online', note: 'Pelaku usaha kecil ingin legalitas dan akses bantuan.' },
  { rank: 12, keyword: 'Pinjol legal ojk', note: 'Mencari platform pinjaman yang aman dan resmi.' },
  { rank: 13, keyword: 'Investasi reksadana untuk pemula', note: 'Minat investasi naik di kalangan anak muda.' },
  { rank: 14, keyword: 'Saham bca hari ini', note: 'Saham bluechip yang sering dipantau investor.' },
  { rank: 15, keyword: 'Harga emas antam hari ini', note: 'Instrumen lindung nilai favorit.' },

  { rank: 16, keyword: 'Belajar coding gratis', note: 'Skill digital yang makin dibutuhkan di dunia kerja.' },
  { rank: 17, keyword: 'Kursus online ui ux design', note: 'Minat desain produk digital meningkat.' },
  { rank: 18, keyword: 'Kerja remote luar negeri', note: 'Keinginan gaji dolar sambil kerja dari Indonesia.' },
  { rank: 19, keyword: 'Kara jadi content creator tiktok', note: 'Banyak yang ingin bangun personal brand.' },
  { rank: 20, keyword: 'Kompet digital cashback terbaru', note: 'Promo e-wallet yang diburu pengguna.' },
];

const GAME_TRENDS: GameItem[] = [
  {
    rank: 1,
    name: 'GTA 6 (Grand Theft Auto VI)',
    type: 'Open-world, Action',
    note: 'Trailer dan hype global, jadi bahan pembicaraan di mana-mana.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
  },
  {
    rank: 2,
    name: 'Mobile Legends: Bang Bang',
    type: 'MOBA (Mobile)',
    note: 'Masih jadi salah satu game mobile paling ramai di Indonesia.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/0/0f/Mobile_Legends_Bang_Bang_logo.png',
  },
  {
    rank: 3,
    name: 'Valorant',
    type: 'FPS (PC)',
    note: 'Esports aktif, banyak turnamen lokal dan internasional.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/5/5f/Valorant_cover_art.jpg',
  },
  {
    rank: 4,
    name: 'PUBG Mobile',
    type: 'Battle Royale (Mobile)',
    note: 'Turnamen rutin dan player aktif besar di Asia.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/2/20/PlayerUnknown%27s_Battlegrounds_Steam_Logo.jpg',
  },
  {
    rank: 5,
    name: 'Roblox',
    type: 'Platform game & creation',
    note: 'Digemari anak-anak dan remaja, banyak mini-game viral.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/16/Roblox_Logo_2022.svg',
  },
  {
    rank: 6,
    name: 'Genshin Impact',
    type: 'Action RPG (Multi-platform)',
    note: 'Banyak update karakter & event kolaborasi.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/4/4a/Genshin_Impact_cover.jpg',
  },
  {
    rank: 7,
    name: 'Free Fire',
    type: 'Battle Royale (Mobile)',
    note: 'Basis pemain kuat di Indonesia & Amerika Latin.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/0/0e/Garena_Free_Fire_logo.png',
  },
  {
    rank: 8,
    name: 'EA FC 25 (FIFA)',
    type: 'Sports, Sepak bola',
    note: 'Selalu rame tiap musim baru dimulai.',
    image:
      'https://images.ea.com/ea/ea-sports-fc/ea-sports-fc-25-share-image.jpg',
  },
  {
    rank: 9,
    name: 'Minecraft',
    type: 'Sandbox, Survival',
    note: 'Konten kreator dan server roleplay terus bikin game ini hidup.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
  },
  {
    rank: 10,
    name: 'Honkai: Star Rail',
    type: 'Turn-based RPG',
    note: 'Game dari miHoYo yang lagi naik di komunitas anime/gacha.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/4/44/Honkai_Star_Rail_key_art.jpg',
  },
  {
    rank: 11,
    name: 'Fortnite',
    type: 'Battle Royale (Multi-platform)',
    note: 'Sering kolaborasi dengan film, artis, dan IP besar.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/0/0e/Fortnite_Square_Logo.png',
  },
  {
    rank: 12,
    name: 'Call of Duty: Warzone',
    type: 'FPS Battle Royale',
    note: 'Mode baru dan update map bikin player balik lagi.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/d/d9/Call_of_Duty_Warzone_Logo.jpg',
  },
  {
    rank: 13,
    name: 'Stumble Guys',
    type: 'Party game (Mobile)',
    note: 'Masih sering nongol di TikTok & YouTube short.',
    image:
      'https://play-lh.googleusercontent.com/uFid1OnE8xZ4G4uxw74iGay6mju6GtUrQPw1TvTADHGFdcowAB7ZK-f0E38xYQkjAik',
  },
  {
    rank: 14,
    name: 'Arena of Valor (AOV)',
    type: 'MOBA (Mobile)',
    note: 'Skena kompetitif masih aktif di beberapa negara.',
    image:
      'https://play-lh.googleusercontent.com/2dDrimKETmYHobGp7LVe4VMJHNXJYdyWIoUDXqig6K2nIpSo-sdauuHlKCCxt3QBDOI',
  },
  {
    rank: 15,
    name: 'Clash of Clans',
    type: 'Strategy (Mobile)',
    note: 'Game lama yang masih punya komunitas loyal.',
    image:
      'https://play-lh.googleusercontent.com/0P4t6l9JO0GtQXl3k5qVvP-yfaS-ksye-GHtAWx4i01wcAoWZd1mgZD1db8KQJ12yA',
  },
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
  const [activeTab, setActiveTab] = useState<
    'news' | 'youtube' | 'google' | 'games'
  >('news');

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
                    className={`text-2xl font-bold w-8 text-right ${
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
                      className={`text-2xl font-bold w-8 text-right ${
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
                          className={`text-2xl font-bold w-8 text-right ${
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

        {/* TAB: GAME VIRAL */}
        {activeTab === 'games' && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 space-y-3">
            {GAME_TRENDS.map((game) => {
              const searchUrl =
                'https://www.google.com/search?q=' +
                encodeURIComponent(game.name + ' game');

              return (
                <a
                  key={game.rank}
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
                        className={`text-2xl font-bold w-8 text-right ${
                          game.rank <= 3
                            ? 'text-purple-400'
                            : 'text-zinc-500'
                        }`}
                      >
                        {game.rank}
                      </span>

                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-10 h-10 rounded-md object-cover bg-zinc-800"
                        onError={(e) => {
                          // kalau gagal load gambar, pakai icon controller default
                          e.currentTarget.onerror = null; // hindari loop
                          e.currentTarget.src =
                            'https://img.icons8.com/fluency/48/ffffff/controller.png';
                        }}
                      />

                      <div>
                        <p className="font-medium flex items-center gap-2">
                          <span>🎮</span>
                          <span>{game.name}</span>
                        </p>
                        <p className="text-xs text-zinc-400">{game.type}</p>
                        <p className="text-xs text-zinc-500">{game.note}</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}