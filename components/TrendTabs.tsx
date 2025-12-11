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
  { rank: 1, keyword: 'harga beras hari ini', note: 'Isu ekonomi harian, sering dicari menjelang gajian.' },
  { rank: 2, keyword: 'kurs dolar hari ini', note: 'Dipantau pebisnis, traveler, dan yang belanja online luar negeri.' },
  { rank: 3, keyword: 'jadwal timnas indonesia', note: 'Naik saat ada laga persahabatan atau turnamen besar.' },
  { rank: 4, keyword: 'hasil liga 1 indonesia', note: 'Update skor pertandingan sepak bola lokal.' },
  { rank: 5, keyword: 'jadwal sholat hari ini', note: 'Pencarian rutin harian di berbagai daerah.' },

  { rank: 6, keyword: 'cuaca hari ini', note: 'Ramai saat musim hujan atau cuaca ekstrem.' },
  { rank: 7, keyword: 'gempa hari ini', note: 'Naik setiap ada info gempa baru dari BMKG.' },
  { rank: 8, keyword: 'pendaftaran cpns 2025', note: 'Selalu trending saat rumor atau pembukaan formasi baru.' },
  { rank: 9, keyword: 'gaji umr 2025', note: 'Dicari pekerja untuk cek upah minimal di kotanya.' },
  { rank: 10, keyword: 'beasiswa kuliah luar negeri', note: 'Minat studi lanjut dan program beasiswa internasional.' },

  { rank: 11, keyword: 'cara daftar kartu prakerja', note: 'Ramai setiap gelombang pendaftaran baru dibuka.' },
  { rank: 12, keyword: 'cara cek bantuan sosial', note: 'Pencarian terkait program bantuan pemerintah.' },
  { rank: 13, keyword: 'daftar bpjs kesehatan online', note: 'Pendaftaran dan layanan kesehatan nasional.' },
  { rank: 14, keyword: 'sim online perpanjangan', note: 'Perpanjangan SIM tanpa datang ke kantor polisi.' },
  { rank: 15, keyword: 'harga emas hari ini', note: 'Dipantau investor kecil dan toko perhiasan.' },

  { rank: 16, keyword: 'saham bca hari ini', note: 'Contoh saham bluechip yang sering dipantau.' },
  { rank: 17, keyword: 'bitcoin hari ini', note: 'Kripto masih jadi perhatian banyak orang.' },
  { rank: 18, keyword: 'cara investasi reksadana', note: 'Pencarian pemula yang mau mulai investasi.' },
  { rank: 19, keyword: 'cara nabung 1 juta per bulan', note: 'Topik perencanaan keuangan pribadi.' },
  { rank: 20, keyword: 'aplikasi catatan keuangan gratis', note: 'Tools buat tracking pengeluaran harian.' },

  { rank: 21, keyword: 'tutorial microsoft excel pemula', note: 'Skill kantoran paling banyak dicari.' },
  { rank: 22, keyword: 'belajar bahasa inggris online gratis', note: 'Soft skill populer untuk pelajar dan pekerja.' },
  { rank: 23, keyword: 'belajar coding untuk pemula', note: 'Naik terus seiring minat di industri IT.' },
  { rank: 24, keyword: 'cara buat website sendiri', note: 'Pencarian umum untuk UMKM dan personal brand.' },
  { rank: 25, keyword: 'cara bikin cv menarik', note: 'Dicari fresh graduate dan pencari kerja baru.' },

  { rank: 26, keyword: 'contoh surat lamaran kerja', note: 'Salah satu keyword klasik di dunia kerja.' },
  { rank: 27, keyword: 'pertanyaan interview kerja', note: 'Persiapan wawancara di berbagai perusahaan.' },
  { rank: 28, keyword: 'cara nego gaji saat interview', note: 'Topik sensitif tapi sering dicari diam-diam.' },
  { rank: 29, keyword: 'lowongan kerja remote indonesia', note: 'Naik setelah tren kerja dari rumah.' },
  { rank: 30, keyword: 'pekerjaan freelance online', note: 'Alternatif penghasilan sampingan.' },

  { rank: 31, keyword: 'obat batuk alami', note: 'Ramai saat musim pancaroba dan flu.' },
  { rank: 32, keyword: 'cara turunkan berat badan', note: 'Topik kesehatan dan lifestyle yang abadi.' },
  { rank: 33, keyword: 'menu diet sehat murah', note: 'Diet tapi tetap ramah kantong anak kos.' },
  { rank: 34, keyword: 'olahraga di rumah tanpa alat', note: 'Populer sejak pandemi dan masih dicari.' },
  { rank: 35, keyword: 'cara hilangkan jerawat', note: 'Permasalahan kulit paling sering dicari remaja.' },

  { rank: 36, keyword: 'skincare routine remaja', note: 'Konten beauty yang terus naik di kalangan pelajar.' },
  { rank: 37, keyword: 'drakor terbaru 2025', note: 'Drama Korea baru selalu masuk trending.' },
  { rank: 38, keyword: 'film bioskop terbaru', note: 'Untuk cari referensi nonton akhir pekan.' },
  { rank: 39, keyword: 'review iphone terbaru', note: 'Setiap rilis iPhone baru pasti ramai.' },
  { rank: 40, keyword: 'hp gaming 2 jutaan terbaik', note: 'Segmen HP populer untuk pelajar dan gamer kasual.' },

  { rank: 41, keyword: 'laptop untuk kuliah murah', note: 'Dicari mahasiswa baru dan orang tua.' },
  { rank: 42, keyword: 'rekomendasi headset murah', note: 'Kebutuhan meeting online dan gaming.' },
  { rank: 43, keyword: 'template undangan gratis', note: 'Untuk acara nikah, ulang tahun, dan lainnya.' },
  { rank: 44, keyword: 'desain poster online canva', note: 'Desain cepat untuk tugas atau promosi.' },
  { rank: 45, keyword: 'ide konten tiktok harian', note: 'Content creator pemula cari inspirasi.' },

  { rank: 46, keyword: 'cara live tiktok di pc', note: 'Teknik live streaming dari komputer.' },
  { rank: 47, keyword: 'cara jadi youtuber pemula', note: 'Banyak yang ingin mulai channel sendiri.' },
  { rank: 48, keyword: 'cara menambah followers instagram', note: 'Topik populer di kalangan UMKM dan creator.' },
  { rank: 49, keyword: 'wisata murah dekat jakarta', note: 'Rencana short trip akhir pekan.' },
  { rank: 50, keyword: 'promo tiket pesawat hari ini', note: 'Perjalanan liburan dan mudik.' },
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
              {GOOGLE_DUMMY.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-3
                             bg-zinc-950 rounded-lg border border-zinc-800"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}