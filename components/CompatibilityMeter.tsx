import React, { useState, useEffect } from 'react';
import { ThemeColor } from '../types';

interface Props {
  theme: ThemeColor;
}

export const CompatibilityMeter: React.FC<Props> = ({ theme }) => {
  const [percentage, setPercentage] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [hasTested, setHasTested] = useState(false);

  const getBarColor = () => {
    switch (theme) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-emerald-500';
      case 'yellow': return 'bg-amber-500';
      default: return 'bg-pink-500';
    }
  };

  const runTest = () => {
    if (isTesting) return;
    
    setIsTesting(true);
    setHasTested(true);
    let cycles = 0;
    
    const interval = setInterval(() => {
      // Kararsızlık simülasyonu için rastgele değerler
      setPercentage(Math.floor(Math.random() * 100));
      cycles++;

      if (cycles > 15) { // Kısa süreli rastgelelikten sonra finale geç
        clearInterval(interval);
        const finalTarget = Math.floor(Math.random() * 9) + 92; // %92 - %100 arası
        
        // Yavaşça finale oturma animasyonu
        let current = percentage;
        const finalStep = setInterval(() => {
          if (current < finalTarget) {
            current += 1;
            setPercentage(current);
          } else if (current > finalTarget) {
            current -= 1;
            setPercentage(current);
          } else {
            clearInterval(finalStep);
            setIsTesting(false);
          }
        }, 30);
      }
    }, 80);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl text-center border-4 border-white w-full max-w-md transform translate-z-0">
      <h3 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tight">❤️ UYUM ANALİZİ ❤️</h3>
      
      <div className="flex items-center justify-around mb-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-2 shadow-inner">🤴</div>
          <span className="font-black text-blue-600 text-lg uppercase tracking-tighter">BERKE</span>
        </div>
        
        <div className={`text-4xl ${isTesting ? 'animate-spin' : 'animate-pulse'}`}>
          {isTesting ? '⚙️' : '⚡'}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-3xl mb-2 shadow-inner">👸</div>
          <span className="font-black text-pink-600 text-lg uppercase tracking-tighter">Armin</span>
        </div>
      </div>
      
      <div className="w-full h-12 bg-gray-100/50 rounded-full overflow-hidden relative shadow-inner p-1 mb-6">
        <div 
          className={`h-full transition-all duration-150 ease-out rounded-full shadow-lg flex items-center justify-center ${getBarColor()} will-change-[width]`}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 10 && (
            <span className="font-black text-white text-lg drop-shadow-md">
              %{percentage}
            </span>
          )}
        </div>
        {percentage === 0 && !isTesting && (
          <div className="absolute inset-0 flex items-center justify-center font-black text-gray-300 text-sm uppercase tracking-widest">
            Analize Hazır
          </div>
        )}
      </div>

      {!isTesting && !hasTested ? (
        <button 
          onClick={runTest}
          className={`w-full py-4 rounded-2xl text-white font-black text-xl shadow-lg transform transition-all active:scale-95 hover:brightness-110 ${getBarColor()}`}
        >
          UYUMU TEST ET 🚀
        </button>
      ) : isTesting ? (
        <div className="py-4 text-pink-600 font-black animate-pulse uppercase tracking-tighter text-lg">
          Kaderiniz Hesaplanıyor...
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-pink-700 font-black italic leading-tight animate-bounce">
            "Mükemmel bir dostluk var aranızda!"
          </p>
          <button 
            onClick={runTest}
            className="text-[10px] font-black uppercase text-gray-300 hover:text-pink-500 transition-colors"
          >
            Yeniden Hesapla (Sonuç Değişmez ❤️)
          </button>
        </div>
      )}
    </div>
  );
};