import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Providers from "./_app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot - Scraping Integration",
  description: "Chatbot with scraping integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#EEF2F6] text-[#212529]`}
      >
        <Navbar />
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <script src={`${process.env.NEXT_PUBLIC_CHATBOT_URL}/widget.js`} async></script>
      </body>
    </html>
  );
}
