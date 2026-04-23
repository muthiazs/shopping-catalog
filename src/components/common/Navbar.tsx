import React from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tighter">
          TJERMIN
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
          <Link href="/" className="text-blue-900 font-semibold border-b-2">Home</Link>
          <Link href="/" className="hover:text-blue-900 transition-colors">Inventory</Link>
          <Link href="/" className="hover:text-blue-900 transition-colors">Financing</Link>
          <Link href="/" className="hover:text-blue-900 transition-colors">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-gray-700">
          <Search className="w-5 h-5 cursor-pointer hover:text-primary" />
          <User className="w-5 h-5 cursor-pointer hover:text-primary" />
          <div className="relative cursor-pointer group">
            <ShoppingCart className="w-5 h-5 group-hover:text-primary" />
            {/* Badge Counter - Nanti konek ke Redux */}
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};