import React, { useState, useRef } from 'react';
import { Photo } from '../types';

interface Props {
  photos: Photo[];
  accentColor: string;
}

export const PhotoGallery: React.FC<Props> = ({ photos, accentColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
      setActiveIndex(index);
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handlePhotoTouch = (e: React.MouseEvent | React.TouchEvent, emoji: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    const randomEmojis = ['❤️', '🔥', emoji, '🥰', '✨', '⚡'];
    const selectedEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: selectedEmoji
    };

    setParticles(prev => [...prev, newParticle]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 py-4 px-2 translate-z-0"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className="flex-none w-[85vw] max-w-[320px] snap-center relative will-change-transform"
            onClick={(e) => handlePhotoTouch(e, photo.emoji)}
          >
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-pink-50/50 p-3 shadow-2xl transition-all duration-300 transform active:scale-105 active:rotate-2 border-4 border-white translate-z-0">
              {/* Image with Fade-in Effect */}
              <div className="relative w-full aspect-[4/5] bg-pink-100/30 rounded-[2rem] overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  onLoad={() => handleImageLoad(photo.id)}
                  className={`w-full h-full object-cover pointer-events-none transition-all duration-700 ease-out ${loadedImages[photo.id] ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'}`}
                  loading="eager"
                />
                {!loadedImages[photo.id] && (
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                     <span className="text-4xl opacity-20">🖼️</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pb-2 text-center">
                <p className="text-pink-600 font-dancing text-2xl font-black italic">{photo.caption}</p>
              </div>
              
              {/* Particle Layer */}
              {particles.map(p => (
                <div 
                  key={p.id}
                  className="absolute pointer-events-none animate-emoji text-4xl z-50 translate-z-0"
                  style={{ left: p.x, top: p.y }}
                >
                  {p.emoji}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {photos.map((_, i) => (
          <div 
            key={i}
            className={`h-3 rounded-full transition-all duration-500 ${i === activeIndex ? `w-10 ${accentColor}` : 'w-3 bg-gray-200'}`}
          />
        ))}
      </div>

      <style>{`
        .font-dancing { font-family: 'Dancing Script', cursive; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .translate-z-0 { transform: translateZ(0); }
      `}</style>
    </div>
  );
};