
import React from 'react';
import { ThemeColor } from '../types';

interface Props {
  currentTheme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  isNightMode: boolean;
  toggleNight: () => void;
}

export const ThemePicker: React.FC<Props> = ({ currentTheme, setTheme, isNightMode, toggleNight }) => {
  const colors: { id: ThemeColor; class: string }[] = [
    { id: 'pink', class: 'bg-pink-400' },
    { id: 'blue', class: 'bg-blue-400' },
    { id: 'green', class: 'bg-emerald-400' },
    { id: 'yellow', class: 'bg-amber-400' },
  ];

  return (
    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xl p-3 rounded-full shadow-2xl border border-white/50">
      {colors.map((c) => (
        <button
          key={c.id}
          onClick={() => setTheme(c.id)}
          className={`w-9 h-9 rounded-full border-4 transition-all transform active:scale-75 ${c.class} ${currentTheme === c.id ? 'border-white scale-125 shadow-lg' : 'border-transparent opacity-60'}`}
        />
      ))}
      <div className="w-[2px] h-8 bg-gray-200/50 mx-1 rounded-full" />
      <button
        onClick={toggleNight}
        className={`w-11 h-11 flex items-center justify-center rounded-full transition-all transform active:scale-75 shadow-lg ${isNightMode ? 'bg-indigo-900 text-yellow-300' : 'bg-yellow-100 text-yellow-600'}`}
      >
        <span className="text-xl">{isNightMode ? '🌙' : '☀️'}</span>
      </button>
    </div>
  );
};
