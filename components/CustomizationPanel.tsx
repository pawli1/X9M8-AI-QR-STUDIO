
import React, { useState, useEffect } from 'react';
import { QRConfig, QRStyle, EyeStyle } from '../types';
import { Palette, Layers, Type as TypeIcon, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface Props {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const CustomizationPanel: React.FC<Props> = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = React.useState<'content' | 'colors' | 'design' | 'logo'>('content');
  const [localValue, setLocalValue] = useState(config.value);

  useEffect(() => {
    setLocalValue(config.value);
  }, [config.value]);

  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleCreate = () => {
    updateConfig({ value: localValue });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateConfig({ logoUrl: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-hide shrink-0">
        {[
          { id: 'content', icon: TypeIcon, label: 'Content' },
          { id: 'colors', icon: Palette, label: 'Colors' },
          { id: 'design', icon: Layers, label: 'Shapes' },
          { id: 'logo', icon: ImageIcon, label: 'Logo' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-5 text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-950/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8 flex-grow flex flex-col gap-8">
        <div className="flex-grow">
          {activeTab === 'content' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">QR Content</label>
              <p className="text-xs text-slate-500 mb-2">Paste your URL, email, or plain text below.</p>
              <textarea
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleCreate();
                  }
                }}
                className="w-full h-44 px-5 py-4 rounded-2xl border-2 border-slate-800 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none font-mono text-sm shadow-inner"
                placeholder="https://example.com"
              />
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Foreground</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.fgColor}
                      onChange={(e) => updateConfig({ fgColor: e.target.value })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-2 border-slate-800 p-1 bg-slate-950 overflow-hidden"
                    />
                    <input
                      type="text"
                      value={config.fgColor.toUpperCase()}
                      onChange={(e) => updateConfig({ fgColor: e.target.value })}
                      className="flex-1 px-4 py-3 text-sm border-2 border-slate-800 bg-slate-950 text-slate-100 rounded-xl outline-none font-mono focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Background</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => updateConfig({ bgColor: e.target.value })}
                      className="w-14 h-14 rounded-xl cursor-pointer border-2 border-slate-800 p-1 bg-slate-950 overflow-hidden"
                    />
                    <input
                      type="text"
                      value={config.bgColor.toUpperCase()}
                      onChange={(e) => updateConfig({ bgColor: e.target.value })}
                      className="flex-1 px-4 py-3 text-sm border-2 border-slate-800 bg-slate-950 text-slate-100 rounded-xl outline-none font-mono focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Module Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['square', 'dots', 'rounded', 'classy'] as QRStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => updateConfig({ qrStyle: style })}
                      className={`py-4 px-2 rounded-2xl text-xs font-bold border-2 transition-all uppercase tracking-widest ${
                        config.qrStyle === style 
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-500'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Eye Shape</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['square', 'rounded', 'circle', 'leaf'] as EyeStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => updateConfig({ eyeStyle: style })}
                      className={`py-4 px-2 rounded-2xl text-xs font-bold border-2 transition-all uppercase tracking-widest ${
                        config.eyeStyle === style 
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-500'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logo' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Add Logo / Icon</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="p-8 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-950 text-center group-hover:border-indigo-500/50 transition-colors">
                    <ImageIcon className="mx-auto text-slate-600 mb-3" size={32} />
                    <p className="text-sm font-bold text-slate-400">Click to upload or drag & drop</p>
                    <p className="text-[10px] text-slate-600 mt-1 uppercase">PNG, JPG or SVG (Max 2MB)</p>
                  </div>
                </div>
              </div>

              {config.logoUrl && (
                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-800 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <img src={config.logoUrl} alt="Logo preview" className="h-14 w-14 object-contain rounded-xl border border-slate-700 bg-white p-1" />
                     <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Logo Size</label>
                        <input
                          type="range"
                          min="30"
                          max="80"
                          value={config.logoWidth}
                          onChange={(e) => updateConfig({ logoWidth: Number(e.target.value), logoHeight: Number(e.target.value) })}
                          className="w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                     </div>
                   </div>
                   <button 
                    onClick={() => updateConfig({ logoUrl: undefined })}
                    className="text-xs text-rose-400 font-bold hover:text-rose-300 bg-rose-500/10 px-3 py-2 rounded-lg transition-colors"
                   >
                     REMOVE
                   </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Create Button */}
        <div className="pt-8 border-t border-slate-800">
          <button
            onClick={handleCreate}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-indigo-900/40 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-tighter"
          >
            <CheckCircle size={24} strokeWidth={3} />
            Update QR Code
          </button>
          <p className="text-center text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">
            Settings are applied instantly locally
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
