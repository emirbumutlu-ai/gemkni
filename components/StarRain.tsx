
import React, { useEffect, useState } from 'react';

export const StarRain: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 100 + 50,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 10
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};
