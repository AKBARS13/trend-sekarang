// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trend Sekarang',
  description: 'Agregator tren dan berita terbaru Indonesia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}