import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 animate-pulse shadow-sm">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
      
      {/* Title Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      
      {/* Price & Button Skeleton */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
};