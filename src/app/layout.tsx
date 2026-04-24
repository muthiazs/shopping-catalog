import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import ReduxProvider from "@/components/providers/ReduxProvider"; 
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TJERMIN | Premium Basic Wear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {/* Bungkus semua children pake ReduxProvider */}
        <ReduxProvider>
          <Toaster position="top-right" reverseOrder={false} /> {/* 2. Pasang ini di sini */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}