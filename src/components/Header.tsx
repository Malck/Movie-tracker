'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import { FiSearch, FiX, FiMenu } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?query=${query}`);
      setIsSearchVisible(false);
      setQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer le menu mobile au changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          🎬 Movie Tracker
        </Link>

        {/* Nav desktop */}
        <div className={styles.navLinks}>
          {!isSearchVisible && (
            <button onClick={() => setIsSearchVisible(true)} className={styles.searchIcon}>
              <FiSearch size={22} />
            </button>
          )}

          {isSearchVisible && (
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un film..."
                className={styles.searchInput}
                autoFocus
              />
              <button type="button" onClick={() => setIsSearchVisible(false)} className={styles.searchIcon}>
                <FiX size={22} />
              </button>
            </form>
          )}

          {session ? (
            <div className={styles.profileContainer} ref={dropdownRef}>
              <div className={styles.avatar} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownName}>{session.user?.name}</div>
                    <div className={styles.dropdownEmail}>{session.user?.email}</div>
                  </div>
                  <Link href="/watchlist" onClick={() => setIsDropdownOpen(false)}>
                    Ma Watchlist
                  </Link>
                  <button onClick={() => { setIsDropdownOpen(false); signOut({ callbackUrl: '/' }); }}>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.link}>Connexion</Link>
              <Link href="/register" className={styles.linkButton}>Inscription</Link>
            </>
          )}
        </div>

        {/* Bouton hamburger mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <form onSubmit={handleSearch} className={styles.mobileSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un film..."
              className={styles.mobileSearchInput}
            />
            <button type="submit" className={styles.mobileSearchButton}>
              <FiSearch size={18} />
            </button>
          </form>

          {session ? (
            <>
              <div className={styles.mobileUser}>
                <div className={styles.avatarSmall}>{session.user?.name?.charAt(0).toUpperCase()}</div>
                <span>{session.user?.name}</span>
              </div>
              <Link href="/watchlist" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
                Ma Watchlist
              </Link>
              <button
                className={styles.mobileLinkButton}
                onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
                Connexion
              </Link>
              <Link href="/register" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
                Inscription
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}