// app/api/trends/news/route.js
import { NextResponse } from 'next/server';

const DUMMY_NEWS = [
  {
    rank: 1,
    title: 'Harga beras naik di beberapa daerah Indonesia',
    link: '#',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 2,
    title: 'Rupiah menguat terhadap dolar AS',
    link: '#',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 3,
    title: 'Cuaca ekstrem diprediksi BMKG pekan ini',
    link: '#',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 4,
    title: 'Pemerintah siapkan kebijakan baru untuk UMKM',
    link: '#',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 5,
    title: 'Pengguna internet Indonesia terus meningkat',
    link: '#',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 6,
    title: 'Startup lokal raih pendanaan seri A',
    link: '#',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 7,
    title: 'Tips mengatur keuangan untuk anak kos',
    link: '#',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 8,
    title: 'Tren kerja remote di Indonesia',
    link: '#',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 9,
    title: 'Perkembangan AI dan dampaknya ke dunia kerja',
    link: '#',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 10,
    title: 'Tips aman bersosial media untuk remaja',
    link: '#',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
];

export async function GET() {
  // Selalu balikin data dummy, tanpa akses internet sama sekali
  return NextResponse.json({
    trends: DUMMY_NEWS,
    updatedAt: new Date().toISOString(),
  });
}