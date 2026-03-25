'use client';

import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import styles from '../AuthForm.module.css';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
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
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Connexion</h1>
        {error && <p className={styles.error}>{error}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
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
          Pas encore de compte ? <Link href="/register" className={styles.link}>Inscrivez-vous</Link>
        </p>
      </form>
    </div>
  );
}