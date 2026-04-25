'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Tambah ini
import { Search, User, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ambil keyword dari URL jika ada (biar input gak kosong pas diredirect)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Fungsi Handle Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect ke Home dengan query search
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // Kalau kosong, balik ke home biasa
      router.push('/');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tighter shrink-0">
          TJERMIN
        </Link>

        {/* Menu Links - Hidden di mobile/tablet kecil biar gak tabrakan sama search */}
        <div className="hidden xl:flex space-x-8 text-sm font-medium text-gray-500 shrink-0">
          <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
          <Link href="/inventory" className="hover:text-blue-900 transition-colors">Inventory</Link>
          <Link href="/financing" className="hover:text-blue-900 transition-colors">Financing</Link>
          <Link href="/contact" className="hover:text-blue-900 transition-colors">Contact</Link>
        </div>

        {/* Search Bar - Sekarang pake Form biar bisa di-Enter */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 items-center relative max-w-md hidden md:flex"
        >
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full text-black bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all"
          />
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          {/* Tombol enter invisible biar form bisa submit */}
          <button type="submit" className="hidden">Search</button>
        </form>

        {/* Icons */}
        <div className="flex items-center space-x-5 shrink-0">
          {/* Icon Search buat Mobile (Opsional) */}
          <Search className="w-5 h-5 text-gray-500 md:hidden cursor-pointer" />
          
          <User className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-900 transition-colors" />
          
          <div className="relative cursor-pointer group">
            <ShoppingCart 
              size={24} 
              className="text-gray-600 group-hover:text-blue-900 transition-all duration-300" 
            />
            {mounted && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};