import React from 'react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image dengan Overlay Biru */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero1.jpg"
          alt="Tjermin Marketplace Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay Biru Transparan sesuai desain TJERMIN */}
        <div className="absolute inset-0 bg-[#1E3A5F]/60 mix-blend-multiply"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Tjermin Marketplace
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl opacity-90 leading-relaxed">
          Find your perfect things from our premium selection.
        </p>
        
        {/* Optional: Small line under the text (Clean Look) */}
        <div className="mt-8 w-16 h-1 bg-white rounded-full opacity-50"></div>
      </div>
    </section>
  );
};