'use client';
import React from 'react';

export default function PlaceholderPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-6">
      {/* Logo Tjermin di Tengah */}
      <h1 className="text-6xl font-black text-blue-900 tracking-tighter mb-4 animate-pulse">
        TJERMIN
      </h1>
      
      {/* Garis Dekoratif */}
      <div className="w-16 h-1 bg-blue-900 mb-6"></div>
      
      {/* Teks Penanda Halaman */}
      <p className="text-gray-400 font-medium tracking-[0.2em] uppercase text-sm">
        This page is coming soon
      </p>
    </div>
  );
}