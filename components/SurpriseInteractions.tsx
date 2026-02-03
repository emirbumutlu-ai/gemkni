import React, { useState, useEffect } from 'react';
import { ThemeColor } from '../types';

interface Props {
  theme: ThemeColor;
  accentColor: string;
}

interface Petal {
  id: number;
  rotation: number;
  isDropped: boolean;
}

export const SurpriseInteractions: React.FC<Props> = ({ theme, accentColor }) => {
  const [ventText, setVentText] = useState('');
  const [ventResponse, setVentResponse] = useState('');
  
  // Papatya Falı State
  const INITIAL_PETALS = 9;
  const [petals, setPetals] = useState<Petal[]>(
    Array.from({ length: INITIAL_PETALS }).map((_, i) => ({
      id: i,
      rotation: (360 / INITIAL_PETALS) * i,
      isDropped: false
    }))
  );
  const [fallingPetals, setFallingPetals] = useState<{ id: number; rotation: number; x: number }[]>([]);
  const [daisyStep, setDaisyStep] = useState(0);
  
  // İstediğin döngü: 2 kere sevmiyor, 1 kere seviyor
  const daisyWords = [
    "Sevmiyor", "Sevmiyor", "Seviyor", 
    "Sevmiyor", "Sevmiyor", "Seviyor", 
    "Sevmiyor", "Sevmiyor", "SEVİYORRR! ❤️"
  ];

  const [timeDiff, setTimeDiff] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2025-05-14T00:00:00');
    const calculateTime = () => {
      const now = new Date();
      const absoluteDiff = Math.abs(now.getTime() - startDate.getTime());
      const seconds = Math.floor((absoluteDiff / 1000) % 60);
      const minutes = Math.floor((absoluteDiff / (1000 * 60)) % 60);
      const hours = Math.floor((absoluteDiff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
      const years = Math.floor(daysTotal / 365);
      const months = Math.floor((daysTotal % 365) / 30);
      const days = (daysTotal % 365) % 30;
      setTimeDiff({ years, months, days, hours, minutes, seconds });
    };
    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  const pullPetal = () => {
    const availablePetals = petals.filter(p => !p.isDropped);
    if (availablePetals.length > 0) {
      const petalToDrop = availablePetals[0];
      setPetals(prev => prev.map(p => p.id === petalToDrop.id ? { ...p, isDropped: true } : p));
      const dropId = Date.now();
      setFallingPetals(prev => [...prev, { id: dropId, rotation: petalToDrop.rotation, x: (Math.random() - 0.5) * 100 }]);
      setDaisyStep(prev => prev + 1);
      setTimeout(() => {
        setFallingPetals(prev => prev.filter(p => p.id !== dropId));
      }, 1500);
    }
  };

  const resetDaisy = () => {
    setPetals(Array.from({ length: INITIAL_PETALS }).map((_, i) => ({
      id: i,
      rotation: (360 / INITIAL_PETALS) * i,
      isDropped: false
    })));
    setDaisyStep(0);
    setFallingPetals([]);
  };

  const handleVent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ventText.trim()) return;
    setVentResponse("Mesajın iletildi ama okumayacağım çünkü üşendim. 😴");
    setVentText('');
  };

  return (
    <div className="w-full max-w-md px-4 space-y-12 mt-12">
      {/* Dostluk Sayacı */}
      <div className="bg-white/80 p-8 rounded-[3rem] shadow-2xl text-center border-4 border-white transform hover:scale-[1.02] transition-transform">
        <h3 className="font-black text-gray-800 mb-6 uppercase text-sm tracking-widest flex items-center justify-center gap-2">
          <span>✨</span> DOSTLUĞUMUZUN ÖMRÜ <span>✨</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-pink-50 p-3 rounded-2xl">
            <div className="text-2xl font-black text-pink-600">{timeDiff.years}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Yıl</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-2xl">
            <div className="text-2xl font-black text-pink-600">{timeDiff.months}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Ay</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-2xl">
            <div className="text-2xl font-black text-pink-600">{timeDiff.days}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Gün</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-2xl">
            <div className="text-2xl font-black text-pink-600">{timeDiff.hours}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Saat</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-2xl">
            <div className="text-2xl font-black text-pink-600">{timeDiff.minutes}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Dakika</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-2xl shadow-inner border-2 border-pink-200 animate-pulse">
            <div className="text-2xl font-black text-pink-600">{timeDiff.seconds}</div>
            <div className="text-[10px] font-bold text-pink-400 uppercase">Saniye</div>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-400 font-black italic">"14 Mayıs 2025'ten bu yana her saniye daha değerli..."</p>
      </div>

      {/* Papatya Falı */}
      <div className="bg-white/70 p-8 rounded-[2.5rem] shadow-xl text-center border-2 border-white relative overflow-hidden">
        <h3 className="font-black text-gray-700 mb-8 uppercase text-sm tracking-widest">Beni Seviyor mu? 🌼</h3>
        
        <div className="relative w-56 h-56 mx-auto mb-8 flex items-center justify-center">
          {/* Tıklama Alanı ve Yapraklar */}
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer group z-20" onClick={pullPetal}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {petals.map((petal) => (
                <div
                  key={petal.id}
                  className={`absolute w-14 h-24 bg-white border-2 border-pink-50 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] origin-bottom transition-all duration-300 ${petal.isDropped ? 'opacity-0 scale-0' : 'opacity-100 group-hover:scale-105'}`}
                  style={{
                    transform: `rotate(${petal.rotation}deg) translateY(-40px)`,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                  }}
                />
              ))}
            </div>

            {/* Sarı Merkez - Milimetrik Hizalanmış */}
            <div className="relative w-16 h-16 bg-yellow-400 rounded-full z-30 shadow-lg border-4 border-yellow-500 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#ca8a04_20%)] bg-[length:8px_8px] opacity-20" />
            </div>
          </div>

          {/* Düşen Yapraklar Efekti */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {fallingPetals.map(p => (
              <div 
                key={p.id}
                className="absolute w-14 h-24 bg-white border-2 border-pink-50 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] animate-petal-fall"
                style={{
                  transform: `rotate(${p.rotation}deg) translateY(-40px)`,
                  '--tw-translate-x': `${p.x}px`
                } as any}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[70px] flex flex-col items-center justify-center">
          <p className={`font-black text-3xl transition-all duration-300 ${daisyStep > 0 ? 'scale-110' : ''} ${daisyWords[daisyStep-1]?.includes('SEVİYOR') ? 'text-green-500 animate-bounce' : 'text-pink-500'}`}>
            {daisyStep > 0 ? daisyWords[daisyStep - 1] : 'Yaprakları Kopar...'}
          </p>
          
          {daisyStep === INITIAL_PETALS && (
            <button 
              onClick={resetDaisy} 
              className="mt-4 text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors"
            >
              Tekrar Dene (Kaderi Değiştir) 🩹
            </button>
          )}
        </div>
      </div>

      <div className="bg-white/70 p-6 rounded-[2.5rem] shadow-xl border-2 border-white">
        <h3 className="font-black text-gray-700 mb-4 text-center uppercase text-sm tracking-widest">İçinde Kalmasın (Bana Söv) 🗣️</h3>
        <form onSubmit={handleVent} className="space-y-4">
          <textarea 
            value={ventText}
            onChange={(e) => setVentText(e.target.value)}
            placeholder="Buradan bana içini dökebilirsin..."
            className="w-full p-4 rounded-2xl border-2 border-pink-100 focus:border-pink-300 outline-none text-sm font-bold bg-white/50"
            rows={3}
          />
          <button className={`w-full py-3 rounded-xl text-white font-black shadow-md ${accentColor}`}>
            SÖVÜYORUM GÖNDER 🚀
          </button>
        </form>
        {ventResponse && (
          <p className="mt-4 text-center text-pink-600 font-black text-sm animate-bounce">{ventResponse}</p>
        )}
      </div>
    </div>
  );
};