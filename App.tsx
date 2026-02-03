import React, { useState, useEffect } from 'react';
import { PasswordGate } from './components/PasswordGate';
import { PhotoGallery } from './components/PhotoGallery';
import { ThemePicker } from './components/ThemePicker';
import { SurpriseInteractions } from './components/SurpriseInteractions';
import { FriendshipContract } from './components/FriendshipContract';
import { HugEffect } from './components/HugEffect';
import { CompatibilityMeter } from './components/CompatibilityMeter';
import { StarRain } from './components/StarRain';
import { SurprisePopups } from './components/SurprisePopups';
import { Photo, ThemeColor } from './types';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('pink');
  const [isNightMode, setIsNightMode] = useState(false);
  const [showHug, setShowHug] = useState(false);
  const [popups, setPopups] = useState({ tax: false, error31: false });

  const photos: Photo[] = [
    { id: 1, url: 'https://i.imgur.com/42VMuvo.jpeg', emoji: '❤️', caption: 'OYYYY ÖLEMMM SANAAAA' },
    { id: 2, url: 'https://i.imgur.com/tFzeBy4.jpeg', emoji: '🔥', caption: 'GÜNEŞ SACİYOOO MASALLAHHH' },
    { id: 3, url: 'https://i.imgur.com/GdiFgZn.jpeg', emoji: '✨', caption: 'GÜZELLİK ABİDESİİİ BU KADİNNN 😍' },
    { id: 4, url: 'https://i.imgur.com/RfPlCNm.jpeg', emoji: '👸', caption: 'MÜKEMMELLİYETTTCİ ABİDESİİİİİ❤️⛄' },
    { id: 5, url: 'https://i.imgur.com/7rcUXaH.jpeg', emoji: '🥰', caption: 'OHA OHA OHAAAAAAAAA😍😍🫠🫠' },
    { id: 6, url: 'https://i.imgur.com/nWodi8p.jpeg', emoji: '🤍', caption: 'FİİZİKKK KADİİİİNİİİ🫶🏻🫶🏻🤍' },
  ];

  // 120 FPS Fluidity: Preload images immediately
  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
    });
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const taxTimer = setTimeout(() => setPopups(p => ({ ...p, tax: true })), 15000);
      const errorTimer = setInterval(() => {
        if (Math.random() > 0.7) setPopups(p => ({ ...p, error31: true }));
      }, 30000);
      return () => { clearTimeout(taxTimer); clearInterval(errorTimer); };
    }
  }, [isAuthorized]);

  const triggerHug = () => {
    setShowHug(true);
    setTimeout(() => setShowHug(false), 2000);
  };

  const getAccentColor = () => {
    switch (currentTheme) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-emerald-500';
      case 'yellow': return 'bg-amber-500';
      default: return 'bg-pink-500';
    }
  };

  const getBgColor = () => {
    if (isNightMode) return 'bg-slate-900';
    switch (currentTheme) {
      case 'blue': return 'bg-blue-50';
      case 'green': return 'bg-emerald-50';
      case 'yellow': return 'bg-amber-50';
      default: return 'bg-pink-50';
    }
  };

  if (!isAuthorized) return <PasswordGate onSuccess={() => setIsAuthorized(true)} theme={currentTheme} />;

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${getBgColor()} pb-20 overflow-x-hidden ${showHug ? 'hug-active' : ''} antialiased`}>
      {isNightMode && <StarRain />}
      
      {/* Floating Controls */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <ThemePicker 
            currentTheme={currentTheme} 
            setTheme={setCurrentTheme} 
            isNightMode={isNightMode} 
            toggleNight={() => setIsNightMode(!isNightMode)} 
          />
        </div>
      </div>

      <main className="flex flex-col items-center pt-28 px-4 space-y-12 hug-target transition-transform duration-700 will-change-transform">
        <header className="text-center">
          <h1 className={`text-4xl font-black mb-4 uppercase tracking-tighter animate-bounce ${isNightMode ? 'text-pink-300' : 'text-pink-600'}`}>
            SENİN İÇİN <br/> KÜÇÜK BİR SÜRPRİZ!
          </h1>
          <p className="text-gray-400 font-bold italic">Sadece goteleklere özel... 🤍</p>
        </header>

        <PhotoGallery photos={photos} accentColor={getAccentColor()} />

        <div className="w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border-4 border-white transform translate-z-0">
          <p className="text-pink-700 font-bold leading-relaxed text-sm italic text-center whitespace-pre-wrap uppercase tracking-tight">
            "BALLİ COREGİMMMMM BİLİYOM BİRSZ KÖTÜ OLDU AMA MORALİN BOZUK KALMASINI İSTEMEDİM VE KONUŞMA YAPARAKTA BEN PEK BECEREMİYORUM KONUŞMA YAPIP MORAL DÜZELTMEYİ BEN HİÇBİR ZAMAN SENDEN ÖNCE YANİ HİÇ BANA MORAL VEREN OLMAMIŞTI ONDAN HİÇ YAPAMIYORUM ÖZÜR DİLERİM ONUN İÇİN YAPA BİLDİĞİM ŞEYLE MORALİNİ DUZELTİM DEDİMMM İNŞALLAH Kİ DUZELMİSSDİR ÇOK UĞRAŞTIM AMA OC YAPAY ZEKA YAPMADİ İŞTE VERMEDİ O YÜZÜNDN  BURDAN ATIYORUM SENNİİİ COOOOOOKK SEVİYOMMMMM KRALLİCEMMMM BENİMMMM DOSTMMMMMMMM BENİMMMMM İNAN KENDİ BACİM GİBİ ÇOK SEVİYORUMMMMMM İYİKİİVARSNNNM İYİKİ TANİSMİSİSZZZZ BALLİ COREGİMMMM ASLA MORALİNİ BOZMUYORSUN ARKANDA DAGGG GİBİ BERKEN VAR TAMAMMİİİ GÖT LALESİ GÖRÜŞÜRÜZZZZZZZZZ"
          </p>
        </div>

        <CompatibilityMeter theme={currentTheme} />
        
        <SurpriseInteractions theme={currentTheme} accentColor={getAccentColor()} />

        <button 
          onClick={triggerHug}
          className={`px-12 py-6 rounded-full text-white font-black text-2xl shadow-2xl transition-all transform active:scale-90 animate-pulse ${getAccentColor()} translate-z-0`}
        >
          BERKE'YE SARIL 🤗
        </button>

        <FriendshipContract accentColor={getAccentColor()} isNightMode={isNightMode} />

        <footer className="text-center py-10">
          <p className="text-pink-400 font-black text-[10px] tracking-widest uppercase">
            BERKE TARAFINDAN ÖZENLE KODLANDI 🫶🏻🤍
          </p>
        </footer>
      </main>

      <HugEffect />
      
      <SurprisePopups 
        showTax={popups.tax} 
        closeTax={() => setPopups(p => ({ ...p, tax: false }))}
        showError31={popups.error31}
        closeError31={() => setPopups(p => ({ ...p, error31: false }))}
        triggerHug={triggerHug}
      />
    </div>
  );
};

export default App;