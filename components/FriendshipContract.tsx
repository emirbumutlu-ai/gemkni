
import React, { useRef, useState, useEffect } from 'react';

interface Props {
  accentColor: string;
  isNightMode: boolean;
}

export const FriendshipContract: React.FC<Props> = ({ accentColor, isNightMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [isStamping, setIsStamping] = useState(false);
  const [isStamped, setIsStamped] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
      }
    }
  }, []);

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isStamped) return;
    setIsDrawing(true);
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isStamped) return;
    const { x, y } = getCoords(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = isNightMode ? '#F472B6' : '#BE185D';
      ctx.stroke();
      setHasSigned(true);
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (isStamped) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    setHasSigned(false);
  };

  const handleStamp = () => {
    if (isStamping || isStamped) return;
    setIsStamping(true);
    
    // Animasyon süreleri ile senkronize işlemler
    setTimeout(() => {
      // Çarpma anı (0.3sn civarı)
      if (containerRef.current) {
        containerRef.current.classList.add('stamp-impact');
        setTimeout(() => containerRef.current?.classList.remove('stamp-impact'), 300);
      }
      (window as any).confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#ff0000', '#be185d']
      });
    }, 300);

    setTimeout(() => {
      setIsStamping(false);
      setIsStamped(true);
      setTimeout(() => {
        alert('Sözleşme mühürlendi ve Berke tarafından onaylandı! ❤️');
      }, 200);
    }, 800);
  };

  return (
    <div 
      ref={containerRef}
      className={`p-10 rounded-[3rem] shadow-2xl transition-all ${isNightMode ? 'bg-slate-800 text-pink-100' : 'bg-white text-gray-800'} border-4 border-dashed ${accentColor.replace('bg-', 'border-')}`}
    >
      <h2 className="text-3xl font-black mb-6 text-center tracking-tighter uppercase italic">Sözleşme Vakti 📜</h2>
      <p className="text-center mb-8 leading-relaxed font-bold text-lg">
        "Bu siteyi açan kişi Berke'yi ömür boyu çekmek zorundadır. Berke'nin otistik kafa yapısını kabul eder ve onu her gün bolca öpmeyi taahhüt eder."
      </p>
      
      <div className="relative group overflow-visible">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className={`w-full border-4 border-pink-100 rounded-3xl cursor-crosshair transition-all ${isNightMode ? 'bg-slate-900 shadow-inner' : 'bg-pink-50/50 shadow-inner'} ${isStamped ? 'opacity-80' : ''}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {!hasSigned && !isStamped && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 font-black text-2xl uppercase tracking-widest text-pink-600">
            Parmakla İmza At
          </div>
        )}

        {/* Mühür Görseli */}
        {(isStamping || isStamped) && (
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 ${isStamping ? 'animate-stamp' : ''}`}>
            <svg width="150" height="150" viewBox="0 0 100 100">
              {/* Dış Halka */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#be185d" strokeWidth="4" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="40" fill="rgba(190, 24, 93, 0.1)" stroke="#be185d" strokeWidth="2" />
              {/* İç Yazı */}
              <path id="curve" d="M 20 50 A 30 30 0 1 1 80 50" fill="none" />
              <text fontSize="8" fontWeight="bold" fill="#be185d">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  SONSUZA DEK ONAYLANDI
                </textPath>
              </text>
              {/* Orta Kısım */}
              <text x="50" y="55" fontSize="12" fontWeight="black" fill="#be185d" textAnchor="middle" style={{fontFamily: 'sans-serif'}}>
                BERKE ❤️
              </text>
              <text x="50" y="70" fontSize="6" fontWeight="bold" fill="#be185d" textAnchor="middle">
                OFFICIAL SEAL
              </text>
            </svg>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {!isStamped && (
          <button
            onClick={clearCanvas}
            className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-pink-500 transition-colors"
          >
            İmzayı Sıfırla
          </button>
        )}
        
        {hasSigned && !isStamped && (
          <button
            className={`w-full py-5 rounded-3xl text-white font-black text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-90 ${accentColor} ${isStamping ? 'opacity-50' : 'animate-pulse'}`}
            onClick={handleStamp}
            disabled={isStamping}
          >
            {isStamping ? 'MÜHÜRLENİYOR...' : 'MÜHÜRÜ BAS 🤍'}
          </button>
        )}

        {isStamped && (
          <div className="text-center py-4 bg-pink-100 rounded-2xl border-2 border-pink-500 text-pink-700 font-black uppercase tracking-widest animate-bounce">
            ✅ BU SÖZLEŞME RESMİDİR
          </div>
        )}
      </div>
    </div>
  );
};
