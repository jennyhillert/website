import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jenny Hillert",
  description: "Equestrian — Austin, TX",
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL("https://website-gamma-ten-93.vercel.app"),
  openGraph: {
    title: "Jenny Hillert",
    description: "Hunter · Equitation · IEA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenny Hillert",
    description: "Hunter · Equitation · IEA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
