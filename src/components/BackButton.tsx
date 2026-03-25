// src/components/BackButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import styles from './BackButton.module.css';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className={styles.button}>
      &larr; Retour
    </button>
  );
}