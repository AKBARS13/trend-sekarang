// components/LivePoll.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type PollRow = {
  id: string;
  question: string;
  yes_count: number;
  no_count: number;
};

const POLL_ID = 'bd01cdd4-2448-4f4e-a0ac-a6c0f70aedbe'; // ganti pakai id dari tabel polls

export function LivePoll() {
  const [poll, setPoll] = useState<PollRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);

  // Ambil data awal + cek localStorage
  useEffect(() => {
    const voted = localStorage.getItem(`poll_voted_${POLL_ID}`);
    if (voted === 'true') setHasVoted(true);

    const fetchPoll = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', POLL_ID)
        .single();

      if (!error && data) {
        setPoll(data as PollRow);
      }
      setLoading(false);
    };

    fetchPoll();
  }, []);

  // Subscribe real-time ke perubahan polls
  useEffect(() => {
    const channel = supabase
      .channel('polls-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'polls',
          filter: `id=eq.${POLL_ID}`,
        },
        (payload) => {
          setPoll(payload.new as PollRow);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleVote = async (choice: 'yes' | 'no') => {
    if (hasVoted || !poll) return;

    await supabase.rpc('increment_vote', {
      poll_id: poll.id,
      choice,
    });

    setHasVoted(true);
    localStorage.setItem(`poll_voted_${POLL_ID}`, 'true');
  };

  if (loading || !poll) {
    return (
      <div className="mt-8 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
        <p className="text-sm text-zinc-400">Memuat poll...</p>
      </div>
    );
  }

  const total = poll.yes_count + poll.no_count;
  const yesPercent = total > 0 ? Math.round((poll.yes_count / total) * 100) : 0;
  const noPercent = total > 0 ? 100 - yesPercent : 0;

  return (
    <div className="mt-8 p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
      <h3 className="text-lg font-semibold mb-4">📊 Poll Live</h3>
      <p className="mb-4 text-sm">{poll.question}</p>

      <div className="space-y-3">
        {/* Tombol SETUJU */}
        <button
          onClick={() => handleVote('yes')}
          disabled={hasVoted}
          className="w-full text-left disabled:opacity-60"
        >
          <div className="flex justify-between mb-1 text-sm">
            <span>Setuju</span>
            <span className="text-green-400">{yesPercent}%</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${yesPercent}%` }}
            />
          </div>
        </button>

        {/* Tombol TIDAK SETUJU */}
        <button
          onClick={() => handleVote('no')}
          disabled={hasVoted}
          className="w-full text-left disabled:opacity-60"
        >
          <div className="flex justify-between mb-1 text-sm">
            <span>Tidak setuju</span>
            <span className="text-red-400">{noPercent}%</span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${noPercent}%` }}
            />
          </div>
        </button>
      </div>

      <p className="text-xs text-zinc-500 mt-4">
        👥 {total.toLocaleString('id-ID')} suara • update real-time
        {hasVoted ? ' • Anda sudah ikut voting' : ''}
      </p>
    </div>
  );
}