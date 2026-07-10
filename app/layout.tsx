import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYSHOPPY — Luxury Fashion & Lifestyle",
  description: "Discover curated fashion, footwear, and electronics at MYSHOPPY",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: 'var(--surface-canvas)' }}>
      <body style={{ color: 'var(--color-carbon)', backgroundColor: 'var(--surface-canvas)' }}>
        <Header />
        <main className="mx-auto px-4 sm:px-8" style={{ maxWidth: 'var(--page-max-width)', paddingTop: 'var(--spacing-48)', paddingBottom: 'var(--spacing-48)' }}>
          {children}
        </main>
        <footer style={{ marginTop: 'var(--spacing-72)', borderTop: '1px solid var(--color-smoke)', backgroundColor: 'var(--surface-inversion)', color: 'var(--color-paper)', padding: 'var(--spacing-48)' }}>
          <div className="mx-auto px-4 sm:px-8 text-center" style={{ maxWidth: 'var(--page-max-width)', fontSize: 'var(--text-caption)' }}>
            <p>© 2024 MYSHOPPY. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
