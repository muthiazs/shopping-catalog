'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const Navbar = () => {
  // 1. Logic Menghitung Total Quantity (Bukan cuma length array)
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);


  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tighter">
          TJERMIN
        </Link>

        {/* Menu Links */}
       <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
        <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
        <Link href="/inventory" className="hover:text-blue-900 transition-colors">Inventory</Link>
        <Link href="/financing" className="hover:text-blue-900 transition-colors">Financing</Link>
        <Link href="/contact" className="hover:text-blue-900 transition-colors">Contact</Link>
      </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-900 transition-colors" />
          <User className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-900 transition-colors" />
          
          {/* Shopping Cart Container */}
          <div className="relative cursor-pointer group">
            <ShoppingCart 
              size={24} 
              className="text-gray-600 group-hover:text-blue-900 transition-all duration-300" 
            />
            
            {/* BADGE ANGKA - Dibuat cantik dan bulat sempurna */}
            {mounted && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-in fade-in zoom-in duration-300">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};