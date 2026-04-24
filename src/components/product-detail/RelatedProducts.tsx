import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/ProductCard';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';

export const RelatedProducts = ({ category, currentId }: { category: string, currentId: number }) => {
  const [related, setRelated] = useState<Product[]>([]);
  const router = useRouter();

  // Fungsi buat pindah ke halaman kategori
  const viewCategory = () => {
    router.push(`/category/${category}`);
  };

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await api.get(`/products/category/${category}`);
        // Filter supaya produk yang lagi dibuka nggak muncul lagi di bawah
        const filtered = res.data.filter((p: Product) => p.id !== currentId).slice(0, 4);
        setRelated(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <section className="mt-24 border-t border-gray-100 pt-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
          You might also like
        </h2>
        <button 
          onClick={viewCategory}
          className="flex items-center gap-1 text-sm font-bold text-blue-900 hover:gap-2 transition-all cursor-pointer p-2 hover:bg-blue-50 rounded-lg"
        >
          More Products <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map((item) => (
          <ProductCard 
            key={item.id} 
            product={item} 
            onAddToCart={(p) => console.log('Quick Add:', p)} 
          />
        ))}
      </div>
    </section>
  );
};