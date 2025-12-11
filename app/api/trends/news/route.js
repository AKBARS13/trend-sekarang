// app/api/trends/news/route.js
import { NextResponse } from 'next/server';

const DUMMY_NEWS = [
  {
    rank: 1,
    title: 'Harga beras dan cabai naik jelang akhir tahun',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 2,
    title: 'Rupiah menguat terhadap dolar AS di tengah ketidakpastian global',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 3,
    title: 'Cuaca ekstrem diprediksi BMKG, warga diminta waspada banjir',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 4,
    title: 'Pemerintah siapkan insentif baru untuk pelaku UMKM digital',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 5,
    title: 'Pengguna internet Indonesia tembus rekor tertinggi',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 6,
    title: 'Startup lokal bidang AI raup pendanaan puluhan miliar rupiah',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 7,
    title: 'Tips mengatur keuangan buat anak kos di tengah harga naik',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 8,
    title: 'Tren kerja remote dan hybrid masih diminati karyawan muda',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 9,
    title: 'Perkembangan kecerdasan buatan pengaruhi banyak jenis pekerjaan',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 10,
    title: 'Tips aman bersosial media di era hoaks dan doxing',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 11,
    title: 'Antusiasme masyarakat terhadap kendaraan listrik meningkat',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 12,
    title: 'Harga tiket konser dan event musik meroket, ini kata pengamat',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 13,
    title: 'Generasi muda makin tertarik investasi saham dan reksadana',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 14,
    title: 'Ramai dibahas, aturan baru pajak digital mulai diberlakukan',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 15,
    title: 'Konten kreator lokal makin dilirik brand internasional',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 16,
    title: 'Pendaftaran beasiswa dalam negeri dan luar negeri diburu pelajar',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 17,
    title: 'Minat belajar coding dan desain UI/UX meningkat di kalangan mahasiswa',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 18,
    title: 'Tips menjaga kesehatan mental di tengah tekanan kerja dan studi',
    source: 'CNN Indonesia',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 19,
    title: 'Aplikasi dompet digital makin jadi pilihan utama pembayaran harian',
    source: 'Detik',
    pubDate: new Date().toISOString(),
  },
  {
    rank: 20,
    title: 'Kampanye hemat energi dan gaya hidup ramah lingkungan makin luas',
    source: 'Kompas',
    pubDate: new Date().toISOString(),
  },
];

export async function GET() {
  // Tambahkan link Google Search untuk tiap berita
  const trends = DUMMY_NEWS.map((item) => ({
    ...item,
    link:
      'https://www.google.com/search?q=' +
      encodeURIComponent(item.title + ' ' + item.source),
  }));

  return NextResponse.json({
    trends,
    updatedAt: new Date().toISOString(),
  });
}