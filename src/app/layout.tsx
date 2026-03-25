import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Movie Tracker",
    template: "%s | Movie Tracker",
  },
  description: "Suivez les films que vous voulez voir et ceux que vous avez déjà vus.",
  keywords: ["films", "watchlist", "cinéma", "movie tracker"],
  openGraph: {
    title: "Movie Tracker",
    description: "Suivez les films que vous voulez voir et ceux que vous avez déjà vus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}