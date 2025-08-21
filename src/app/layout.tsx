import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from "./lib/providers"

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Search Movies",
  description: "Search up movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
