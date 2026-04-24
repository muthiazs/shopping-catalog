import React from 'react';
import Link from 'next/link';
// Pakai ikon generic yang PASTI ada di setiap versi Lucide
import { Globe, Camera, Play, Share2 } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1227] text-gray-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-white text-2xl font-bold tracking-tighter mb-2">TJERMIN</h2>
            <p className="text-sm opacity-60">
              © {currentYear} BasicWear. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Social Media Icons (Generic Version) */}
          <div className="flex items-center gap-4">
            <a href="#" title="Our Website" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Globe size={18} />
            </a>
            <a href="#" title="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Camera size={18} />
            </a>
            <a href="#" title="YouTube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Play size={18} />
            </a>
            <a href="#" title="Share" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Share2 size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};