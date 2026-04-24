'use client'; // Pastikan ada ini karena kita pakai state & dispatch

import React, { useState } from "react";
import { Star, ShoppingCart, Heart, ChevronRight, Plus, Minus, Info } from "lucide-react";
import { Product } from "@/types/product";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { toast } from 'react-hot-toast'; // Pakai ini biar pro, install: npm install react-hot-toast

export const ProductInfo = ({ product }: { product: Product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // State harus di atas fungsi-fungsi lain agar terbaca
  const [quantity, setQuantity] = useState(1);

  // Logic Quantity
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAdd = () => {
    // Memanggil dispatch dengan object yang sesuai payload di cartSlice
    
    // Feedback manis, ganti alert bawaan browser
    toast.success(`${quantity} item(s) added to your cart!`, {
      style: {
        borderRadius: '12px',
        background: '#0a1227',
        color: '#fff',
      },
    });
  };

  const goToHome = () => {
    router.push('/');
  };

  const technicalData = {
    sku: `TJ-${product.category.substring(0, 2).toUpperCase()}-${product.id.toString().padStart(3, '0')}`,
    material: "Premium Cotton Blend",
    stock: 147
  };

  return (
    <div className="flex flex-col font-sans">
      {/* 1. BREADCRUMBS */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2 font-medium">
        <span 
          onClick={goToHome}
          className="hover:text-blue-900 transition-colors cursor-pointer"
        >
          Home
        </span>
        <ChevronRight size={16} className="text-gray-300" />
        <span className="capitalize text-gray-500">{product.category}</span>
        <ChevronRight size={16} className="text-gray-300" />
        <span className="text-blue-900 font-semibold truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      {/* 2. JUDUL */}
      <h1 className="text-5xl font-extrabold text-gray-950 mb-4 tracking-tighter leading-tight">
        {product.title}
      </h1>
      <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-2xl">
        {product.description}
      </p>

      {/* 3. HARGA & RATING */}
      <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-8">
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-extrabold text-blue-950 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-2xl text-gray-300 line-through font-medium">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"}
                className={i < Math.round(product.rating.rate) ? "" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>

      {/* 4. TECHNICAL DETAILS */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-10 space-y-4 border border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 uppercase tracking-wider text-xs">SKU</span>
          <span className="font-bold text-blue-950">{technicalData.sku}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 uppercase tracking-wider text-xs">Material</span>
          <span className="font-bold text-gray-900">{technicalData.material}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-500 uppercase tracking-wider text-xs">Stock Status</span>
          <span className="font-bold text-green-600">In Stock ({technicalData.stock})</span>
        </div>
      </div>

      {/* 5. ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row gap-5 mb-12">
        <div className="flex items-center justify-between border border-gray-200 rounded-2xl h-16 px-2 bg-white w-full md:w-auto md:min-w-[160px] shadow-sm">
          <button onClick={decrement} className="p-3 text-gray-400 hover:text-blue-900 transition-colors">
            <Minus size={20} />
          </button>
          <span className="w-14 text-center text-2xl font-bold text-blue-950">
            {quantity}
          </span>
          <button onClick={increment} className="p-3 text-gray-400 hover:text-blue-900 transition-colors">
            <Plus size={20} />
          </button>
        </div>
        
        <button 
          onClick={handleAdd}
          className="flex-1 bg-blue-950 text-white rounded-2xl h-16 font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20 active:scale-[0.98]"
        >
          <ShoppingCart size={24} /> Add to Cart
        </button>
        
        <button className="h-16 w-16 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 text-gray-300 hover:text-red-500 transition-all flex items-center justify-center shrink-0">
          <Heart size={26} />
        </button>
      </div>

      {/* 6. ACCORDIONS */}
      <div className="border-t border-gray-100">
        {[
          { title: "Additional Info", icon: Info },
          { title: "Details", icon: ChevronRight }
        ].map((item, index) => (
          <div key={index} className="border-b border-gray-100 py-6 flex justify-between items-center cursor-pointer group hover:bg-gray-50 px-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
               {index === 0 && <item.icon size={18} className="text-gray-400 group-hover:text-blue-900" />}
               <span className="font-semibold text-gray-900 text-lg">{item.title}</span>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-900" />
          </div>
        ))}
      </div>
    </div>
  );
};