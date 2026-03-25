'use client';

import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import styles from '../AuthForm.module.css';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue lors de l'inscription.");
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Inscription</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <button
          type="button"
          className={styles.googleButton}
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <FcGoogle size={20} />
          Continuer avec Google
        </button>

        <p className={styles.linkText}>
          Déjà un compte ? <Link href="/login" className={styles.link}>Connectez-vous</Link>
        </p>
      </form>
    </div>
  );
}