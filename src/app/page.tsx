'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ui/ProductCard';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { Navbar } from '@/components/common/Navbar';
import { motion } from 'framer-motion';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Nanti kita sambungin ke Redux di sini
    console.log('Added to cart:', product.title);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
          <Navbar />
        {/* Header Section */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Our Catalog
          </h1>
          <p className="mt-2 text-gray-600">
            Explore our latest products with high-quality standards.
          </p>
        </header>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Tampilkan 8 Skeleton pas lagi loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Tampilkan Produk asli dengan Animasi Framer Motion
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}