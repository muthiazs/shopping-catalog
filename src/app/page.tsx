"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { motion } from "framer-motion";
import { Hero } from "@/components/common/Hero";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { useSearchParams } from "next/dist/client/components/navigation";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true); // State untuk hasil filter
  const [activePriceRange, setActivePriceRange] = useState("All Prices");
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeCategory === "all"
            ? "/products"
            : `/products/category/${activeCategory}`;

        const response = await api.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // useEffect untuk Filter Logic
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // 1. Logic Filter Search (Keyword dari Navbar)
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // 2. Logic Filter Harga
    if (activePriceRange !== "All Prices") {
      if (activePriceRange === "$0 - $50") {
        result = result.filter((p) => p.price <= 50);
      } else if (activePriceRange === "$50 - $100") {
        result = result.filter((p) => p.price > 50 && p.price <= 100);
      } else if (activePriceRange === "$100 - $500") {
        result = result.filter((p) => p.price > 100 && p.price <= 500);
      } else if (activePriceRange === "Above $500") {
        result = result.filter((p) => p.price > 500);
      }
    }

    return result;
  }, [activePriceRange, products, query]);

  const handleAddToCart = (product: Product) => {
    // Nanti kita sambungin ke Redux di sini
    console.log("Added to cart:", product.title);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 2. Hero Section (Full Width, tidak terpotong kontainer) */}
      <Hero />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* 3. Filter Sidebar (Kiri) */}
          <FilterSidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activePriceRange={activePriceRange} // <-- Tambahin ini
            onPriceChange={setActivePriceRange} // <-- Tambahin ini
          />

          {/* 4. Katalog Section (Kanan) */}
          <div className="flex-1">
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight capitalize">
                {activeCategory === "all" ? "Our Catalog" : activeCategory}
              </h1>
              <p className="mt-2 text-gray-500 italic">
                {products.length} Items Found
              </p>
            </header>

            {/* Grid System - Kita ganti jadi 3 kolom karena sudah ada sidebar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : filteredProducts.length > 0 ? ( // Cek filteredProducts
                filteredProducts.map(
                  (
                    product, // Render filteredProducts
                  ) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </motion.div>
                  ),
                )
              ) : (
                <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-900 font-bold text-xl mb-2">No products found</p>
                  <p className="text-gray-500">
                    {query 
                      ? `We couldn't find anything for "${query}". Try another keyword.` 
                      : "No products match your selected price range."}
                  </p>
                  {(query || activePriceRange !== 'All Prices') && (
                    <button 
                      onClick={() => {
                        setActivePriceRange('All Prices');
                        window.location.href = '/'; // Reset search & filter
                      }}
                      className="mt-6 text-blue-900 font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
