import React from 'react';
import Image from '../../../components/AppImage';

const GenreCard = ({ id, name, image, color, trackCount, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className="relative group w-full aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-80"
        style={{ 
          background: `linear-gradient(135deg, ${color}40, ${color}80)` 
        }}
      />
      <Image
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200" />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-white font-semibold text-lg mb-1 text-left">
          {name}
        </h3>
        <p className="text-white text-sm opacity-90 text-left">
          {trackCount?.toLocaleString()} tracks
        </p>
      </div>
    </button>
  );
};

export default GenreCard;