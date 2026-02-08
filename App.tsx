
import React, { useState } from 'react';
import QRCodePreview from './components/QRCodePreview';
import CustomizationPanel from './components/CustomizationPanel';
import { QRConfig } from './types';
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
              <QrCode size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold font-outfit tracking-tight text-white uppercase">X9M8 STUDIO</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Professional QR Engine</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              Privacy First
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Zap size={14} className="text-amber-500" />
              Instant Gen
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-white tracking-tight">
            Create Professional <span className="text-indigo-500">QR Codes</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Customize every detail of your QR code. Perfect for business cards, marketing materials, and digital links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content - Editor */}
          <section className="lg:col-span-7 space-y-8">
            <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl border border-slate-800">
               <CustomizationPanel config={config} setConfig={setConfig} />
            </div>
          </section>

          {/* Right Side - Preview */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <QRCodePreview config={config} />
            
            <div className="mt-8 grid grid-cols-1 gap-4">
               <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-start gap-4">
                 <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                   <Download size={20} />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-white mb-1">Vector Ready</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     Download in SVG format for infinite scalability without losing quality. Perfect for print.
                   </p>
                 </div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-12 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <QrCode className="text-indigo-500 w-5 h-5" />
              <span className="font-outfit font-bold text-slate-100 tracking-wider">X9M8 STUDIO</span>
            </div>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} X9M8. No tracking. No data collection. 100% Client-side.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
