
import React, { useState } from 'react';
import QRCodePreview from './components/QRCodePreview.tsx';
import CustomizationPanel from './components/CustomizationPanel.tsx';
import { QRConfig } from './types.ts';
import { QrCode, ShieldCheck, Zap, Download } from 'lucide-react';

const INITIAL_CONFIG: QRConfig = {
  value: 'https://x9m8.com',
  fgColor: '#6366f1',
  bgColor: '#ffffff',
  qrStyle: 'square',
  eyeStyle: 'square',
  logoWidth: 60,
  logoHeight: 60,
  logoOpacity: 1,
  gradient: false,
  gradientType: 'linear',
  backgroundAlpha: 1,
};

const App: React.FC = () => {
  const [config, setConfig] = useState<QRConfig>(INITIAL_CONFIG);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
              <QrCode size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-outfit tracking-tight text-white uppercase">X9M8 STUDIO</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Standalone Engine</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              Private & Local
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Zap size={14} className="text-amber-500" />
              Instant Render
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-white tracking-tight">
            Professional <span className="text-indigo-500">QR Generation</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            High-performance QR engine optimized for web and print. No tracking, no data collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl border border-slate-800">
               <CustomizationPanel config={config} setConfig={setConfig} />
            </div>
          </section>

          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <QRCodePreview config={config} />
            
            <div className="mt-8">
               <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800 flex items-start gap-4">
                 <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                   <Download size={24} />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Vector Ready</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     Downloads are optimized for high-resolution print and digital use.
                   </p>
                 </div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 py-12 text-center">
        <p className="text-xs text-slate-600 font-medium uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} X9M8 QR STUDIO • 100% Client-Side
        </p>
      </footer>
    </div>
  );
};

export default App;
