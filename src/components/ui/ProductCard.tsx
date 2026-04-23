// src/components/ui/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { ChevronRight, Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col group transition-all duration-300 hover:shadow-md h-full">
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gray-50">
        <Image 
          src={product.image} 
          alt={product.title} 
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Info Content */}
      <div className="px-1 flex flex-col flex-grow">
        {/* Rating stars */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
          ))}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          {product.category}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="border-t border-gray-50 pt-4 mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium">Starting at</span>
            <span className="text-xl text-blue-900 font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center text-xs font-bold text-primary hover:translate-x-1 transition-transform group/btn"
          >
            View <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};