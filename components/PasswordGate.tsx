import React, { useState, useRef } from 'react';
import { ThemeColor } from '../types';

interface Props {
  onSuccess: () => void;
  theme: ThemeColor;
}

export const PasswordGate: React.FC<Props> = ({ onSuccess, theme }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const CORRECT_PASSWORD = 'pasam';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePointerEnter = () => {
    if (escapeCount < 4) {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 150;
      setBtnPos({ x: randomX, y: randomY });
      setEscapeCount(prev => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === CORRECT_PASSWORD) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setError('Bana sorsana be goteleek!');
      } else {
        setError(`Yanlış şifre 🐰 (${3 - newAttempts} hakkın kaldı)`);
      }
      setPassword('');
      setEscapeCount(0);
      setBtnPos({ x: 0, y: 0 });
    }
  };

  const getButtonColor = () => {
    switch (theme) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-emerald-500';
      case 'yellow': return 'bg-amber-500';
      default: return 'bg-pink-500';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-pink-100/20 backdrop-blur-md z-[100]">
      <div className="bg-white/90 p-10 rounded-[40px] shadow-2xl w-full max-w-sm text-center transform transition-all border-4 border-white">
        <div className="text-6xl mb-6 animate-pulse">🔒</div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tighter">SUPRİİZİZİZZZZ</h2>
        <p className="text-gray-400 text-sm mb-8 font-bold">Açmak için doğru anahtar lazım...</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Şifreyi yaz bebeğim..."
            className="w-full px-6 py-4 rounded-2xl border-4 border-pink-100 focus:border-pink-300 outline-none transition-all text-center text-xl font-black text-pink-600 bg-white"
          />
          {error && <p className="text-red-500 font-black animate-bounce">{error}</p>}
          
          <div className="relative py-2">
            <button
              ref={btnRef}
              type="submit"
              onPointerEnter={handlePointerEnter}
              style={{
                transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                transition: escapeCount < 5 ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
              }}
              className={`w-full py-4 rounded-2xl text-white font-black text-xl shadow-lg transition-all transform active:scale-95 ${getButtonColor()}`}
            >
              AÇ KALBİMİ ❤️
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs text-gray-300 font-bold uppercase tracking-widest italic">İpucu: Bana sor</p>
      </div>
    </div>
  );
};