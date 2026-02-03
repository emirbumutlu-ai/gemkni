import React, { useState } from 'react';

interface Props {
  showTax: boolean;
  closeTax: () => void;
  showError31: boolean;
  closeError31: () => void;
  triggerHug: () => void;
}

export const SurprisePopups: React.FC<Props> = ({ showTax, closeTax, showError31, closeError31, triggerHug }) => {
  const [taxPaid, setTaxPaid] = useState(false);

  const handlePayTax = () => {
    triggerHug();
    setTaxPaid(true);
    setTimeout(() => {
      closeTax();
    }, 2000);
  };

  return (
    <>
      {showTax && (
        <div className="fixed inset-0 flex items-center justify-center z-[300] p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-sm w-full text-center border-4 border-pink-400 animate-stamp">
            {!taxPaid ? (
              <>
                <div className="text-5xl mb-4">💸</div>
                <h2 className="text-2xl font-black text-pink-600 mb-4 uppercase">GÜZELLİK VERGİSİ UYARISI!</h2>
                <p className="text-gray-600 font-bold mb-6">Çok güzel olduğunuz için sisteme 150 TL güzellik vergisi borcunuz bulunmaktadır.</p>
                <button 
                  onClick={handlePayTax}
                  className="w-full py-4 bg-pink-500 text-white font-black rounded-2xl shadow-lg hover:bg-pink-600 transition-all"
                >
                  BERKE'YE SARIL VE ÖDE 🤗
                </button>
              </>
            ) : (
              <div className="py-10 animate-bounce">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-black text-green-500 uppercase">BORCUNUZ KALMADI GÜZELLİK!</h2>
              </div>
            )}
          </div>
        </div>
      )}

      {showError31 && (
        <div className="fixed inset-0 flex items-end justify-center z-[400] p-6 pointer-events-none">
          <div className="bg-red-600 text-white p-6 rounded-3xl shadow-2xl max-w-sm w-full border-4 border-white animate-bounce pointer-events-auto">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚨</div>
              <div>
                <h2 className="text-xl font-black uppercase mb-1">HATA KODU 31!</h2>
                <p className="text-sm font-bold opacity-90">Kullanıcı aşırı dozda tatlılık içeriyor, sistem error veriyor. 🌡️💥</p>
                <button 
                  onClick={closeError31}
                  className="mt-4 px-4 py-2 bg-white text-red-600 font-black rounded-xl text-xs uppercase"
                >
                  Sistemi Soğut
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};