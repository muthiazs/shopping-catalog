import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';

export const ProductGallery = ({ image, title }: { image: string, title: string }) => (
  <div className="space-y-4">
    {/* Main Image Container */}
    <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex items-center justify-center">
      {image ? (
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain p-12" 
          priority 
        />
      ) : (
        <ImageIcon size={64} className="text-gray-300" />
      )}
    </div>
    
    {/* Thumbnail Dummy */}
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={`aspect-square rounded-xl border-2 flex items-center justify-center ${
            i === 1 ? 'border-blue-900' : 'border-gray-100'
          } bg-gray-50`}
        >
          <ImageIcon size={24} className={i === 1 ? 'text-blue-900' : 'text-gray-300'} />
        </div>
      ))}
    </div>
  </div>
);