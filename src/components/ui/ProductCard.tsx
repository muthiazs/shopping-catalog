'use client'; // Tambahkan ini di baris pertama paling atas

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useDispatch } from 'react-redux'; // Sudah benar
import { addToCart } from '@/store/cartSlice';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void; // Kasih tanda tanya (?) biar optional
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // --- INI YANG KURANG TADI, MUT ---
  const dispatch = useDispatch(); 

  const handleQuickAdd = (e: React.MouseEvent) => {
    // 1. Biar pas klik tombol Add, dia nggak malah pindah ke halaman detail
    e.preventDefault();
    e.stopPropagation();

    // 2. Dispatch ke Redux
    dispatch(addToCart({ product, quantity: 1 }));

    // 3. Munculkan Toast (Biar PR kamu kelar!)
    toast.success(`${product.title} added!`, {
      style: {
        borderRadius: '12px',
        background: '#0a1227',
        color: '#fff',
      },
    });
  };

  return (
    // Tambahkan "relative" di div utama supaya tombol cart absolute-nya nggak lari kemana-mana
    <div className="relative bg-white border border-gray-100 rounded-2xl p-3 flex flex-col group transition-all duration-300 hover:shadow-md h-full">
      
      <Link href={`/products/${product.id}`} className="cursor-pointer">
        <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gray-50">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="px-1 flex flex-col flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
          ))}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1 hover:text-blue-900 transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          {product.category}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="border-t border-gray-50 pt-4 mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium">Starting at</span>
            <span className="text-xl text-blue-900 font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <Link href={`/products/${product.id}`} className="flex items-center text-xs font-bold text-blue-900 hover:translate-x-1 transition-transform group/btn">
            View <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
      <button 
        onClick={handleQuickAdd}
        className="absolute top-4 right-4 p-3 bg-blue-900 text-white rounded-xl shadow-lg hover:scale-110 transition-all z-10"
      >
        <ShoppingCart size={18} />
      </button>
    </div>
  );
};