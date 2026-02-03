
import React from 'react';

export const HugEffect: React.FC = () => {
  return (
    <>
      {/* Sol Kol */}
      <div className="hug-arm hug-arm-left fixed left-0 top-1/2 -translate-y-1/2 -translate-x-full z-[200] pointer-events-none">
        <svg width="280" height="400" viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <path 
            d="M-50 150C50 150 150 120 220 180C260 215 260 280 220 315C150 375 50 345 -50 345" 
            stroke="#FFB6C1" 
            strokeWidth="80" 
            strokeLinecap="round" 
            className="opacity-90"
          />
          <path 
            d="M-50 150C50 150 150 120 220 180C260 215 260 280 220 315C150 375 50 345 -50 345" 
            stroke="white" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeDasharray="20 20"
            className="opacity-30"
          />
          {/* El/Pati kısmı */}
          <circle cx="225" cy="247" r="45" fill="#FFB6C1" />
          <circle cx="210" cy="210" r="15" fill="#FFC0CB" />
          <circle cx="245" cy="225" r="15" fill="#FFC0CB" />
          <circle cx="245" cy="270" r="15" fill="#FFC0CB" />
        </svg>
      </div>
      
      {/* Sağ Kol */}
      <div className="hug-arm hug-arm-right fixed right-0 top-1/2 -translate-y-1/2 translate-x-full z-[200] pointer-events-none">
        <svg width="280" height="400" viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <path 
            d="M330 150C230 150 130 120 60 180C20 215 20 280 60 315C130 375 230 345 330 345" 
            stroke="#FFB6C1" 
            strokeWidth="80" 
            strokeLinecap="round" 
            className="opacity-90"
          />
          <path 
            d="M330 150C230 150 130 120 60 180C20 215 20 280 60 315C130 375 230 345 330 345" 
            stroke="white" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeDasharray="20 20"
            className="opacity-30"
          />
          {/* El/Pati kısmı */}
          <circle cx="55" cy="247" r="45" fill="#FFB6C1" />
          <circle cx="70" cy="210" r="15" fill="#FFC0CB" />
          <circle cx="35" cy="225" r="15" fill="#FFC0CB" />
          <circle cx="35" cy="270" r="15" fill="#FFC0CB" />
        </svg>
      </div>
    </>
  );
};
