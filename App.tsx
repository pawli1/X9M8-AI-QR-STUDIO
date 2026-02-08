
import React, { useState } from 'react';
import QRCodePreview from './components/QRCodePreview';
import CustomizationPanel from './components/CustomizationPanel';
import AIAssistant from './components/AIAssistant';
import { QRConfig } from './types';
import { QrCode, Info } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
            <QrCode size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold font-outfit tracking-tight text-white">X9M8 AI QR STUDIO</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Next-Gen Generator</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - AI Controls */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <AIAssistant config={config} setConfig={setConfig} />
            <div className="mt-8 p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
               <div className="flex items-center gap-2 text-slate-200 font-bold text-sm mb-3">
                 <Info size={16} className="text-indigo-400" />
                 Pro Tip
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                 Use SVG export for high-quality professional printing. SVGs remain sharp at any scale!
               </p>
            </div>
          </aside>

          {/* Main Content - Editor */}
          <section className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl shadow-black/50 border border-slate-800">
               <CustomizationPanel config={config} setConfig={setConfig} />
            </div>

            <div className="flex items-center justify-between px-2">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://picsum.photos/32/32?random=${i}`} alt="user" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                   +2k
                 </div>
               </div>
               <p className="text-xs text-slate-500 font-medium">Powering businesses worldwide</p>
            </div>
          </section>

          {/* Right Sidebar - Preview */}
          <aside className="lg:col-span-3 order-3">
            <div className="sticky top-28">
               <QRCodePreview config={config} />
               <div className="mt-6 p-4 rounded-2xl bg-indigo-900/20 border border-indigo-800/30">
                  <h4 className="text-xs font-bold text-indigo-300 mb-1">Dynamic QR (Coming Soon)</h4>
                  <p className="text-[10px] text-indigo-400 leading-relaxed">
                    Track scans and switch content without reprinting.
                  </p>
               </div>
            </div>
          </aside>
          
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <QrCode className="text-indigo-500 w-5 h-5" />
              <span className="font-outfit font-bold text-slate-100">X9M8 AI QR STUDIO</span>
            </div>
            <p className="text-xs text-slate-500">
              Professional Grade AI-Powered QR Tool.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
