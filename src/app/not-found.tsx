import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', color: 'white', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 'bold', margin: 0, color: '#c53030' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Page introuvable</h2>
      <p style={{ color: '#a0aec0', marginTop: '0.5rem' }}>Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', backgroundColor: '#3182ce', color: 'white', borderRadius: '0.25rem', textDecoration: 'none' }}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}