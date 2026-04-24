'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { Navbar } from '@/components/common/Navbar';
import { ProductGallery } from '@/components/product-detail/ProductGallery';
import { ProductInfo } from '@/components/product-detail/ProductInfo';
import { RelatedProducts } from '@/components/product-detail/RelatedProducts'; // Import di sini

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      window.scrollTo(0, 0); // Biar pas pindah produk otomatis scroll ke atas
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-blue-900">Loading Product Detail...</p>
    </div>
  );
  
  if (!product) return <div className="h-screen flex items-center justify-center">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-white">
      
      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* Main Content: Info & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <ProductGallery image={product.image} title={product.title} />
          <ProductInfo product={product} />
        </div>

        {/* Section Baru: Related Products */}
        <RelatedProducts 
          category={product.category} 
          currentId={product.id} 
        />
      </main>
    </div>
  );
}