// src/components/DetailSkeleton.tsx
import styles from './DetailSkeleton.module.css';

export default function DetailSkeleton() {
  return (
    <main className={styles.mainContent}>
      <div className={styles.buttonContainer}>
        <div className={styles.skeletonButton}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.poster}>
          <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
        </div>
        <div className={styles.info}>
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.wHalf}`}></div>
        </div>
      </div>
    </main>
  );
}