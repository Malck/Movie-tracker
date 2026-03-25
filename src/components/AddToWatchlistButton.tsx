'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from './Toast';
import styles from './AddToWatchlistButton.module.css';

interface AddToWatchlistButtonProps {
  tmdbId: number;
  title: string;
  posterPath: string;
}

export default function AddToWatchlistButton({ tmdbId, title, posterPath }: AddToWatchlistButtonProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      const checkStatus = async () => {
        const res = await fetch(`/api/watchlist/${tmdbId}`);
        if (res.ok) {
          const data = await res.json();
          setInWatchlist(data.inWatchlist);
        }
        setLoading(false);
      };
      checkStatus();
    }
    if (sessionStatus === 'unauthenticated') {
      setLoading(false);
    }
  }, [sessionStatus, tmdbId]);

  const handleClick = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setActionLoading(true);

    if (inWatchlist) {
      await fetch(`/api/watchlist/${tmdbId}`, { method: 'DELETE' });
      setInWatchlist(false);
      setToast({ message: `"${title}" retiré de la watchlist`, type: 'info' });
    } else {
      await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdbId, title, posterPath }),
      });
      setInWatchlist(true);
      setToast({ message: `"${title}" ajouté à la watchlist !`, type: 'success' });
    }

    setActionLoading(false);
  };

  if (loading || sessionStatus === 'loading') {
    return <div style={{ height: '48px' }}></div>;
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={actionLoading}
        className={`${styles.button} ${inWatchlist ? styles.remove : styles.add}`}
      >
        {actionLoading ? '...' : inWatchlist ? '✕ Retirer de la watchlist' : '+ Ajouter à ma watchlist'}
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}