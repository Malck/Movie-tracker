import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma Watchlist",
  description: "Retrouvez tous les films que vous souhaitez voir ou que vous avez déjà vus.",
};

export default function WatchlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}