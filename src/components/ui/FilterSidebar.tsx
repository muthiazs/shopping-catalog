import React from 'react';

interface FilterSidebarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  // TAMBAHKAN DUA BARIS INI:
  activePriceRange: string;
  onPriceChange: (range: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  activePriceRange, // Ambil dari props
  onPriceChange     // Ambil dari props
}) => {
  const priceRanges = [
    'All Prices', 
    '$0 - $50', 
    '$50 - $100', 
    '$100 - $500', 
    'Above $500'
  ];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Category Section tetap sama */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1 h-5 bg-primary rounded-full"></div>
          <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Filters</h3>
        </div>
      </div>

      {/* Category Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1 h-5 bg-primary rounded-full"></div>
          <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Category</h3>
        </div>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onCategoryChange('all')}
              className={`text-sm transition-all ${activeCategory === 'all' ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat} className="capitalize">
              <button
                onClick={() => onCategoryChange(cat)}
                className={`text-sm transition-all text-left ${activeCategory === cat ? 'text-primary font-bold border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Section - Hubungkan ke Props */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1 h-5 bg-primary rounded-full"></div>
          <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Price Range</h3>
        </div>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range} className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="radio" // Ubah ke radio agar hanya bisa pilih satu
                name="priceRange"
                className="w-4 h-4 rounded-full border-gray-300 text-primary focus:ring-primary cursor-pointer"
                checked={activePriceRange === range}
                onChange={() => onPriceChange(range)} // Panggil fungsi saat diklik
              />
              <span className={`text-sm transition-colors ${activePriceRange === range ? 'text-primary font-bold' : 'text-gray-600 group-hover:text-primary'}`}>
                {range}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};