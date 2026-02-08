
import React, { useState, useEffect } from 'react';
import { QRConfig, QRStyle, EyeStyle } from '../types';
import { Palette, Layers, Type as TypeIcon, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';

interface Props {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const CustomizationPanel: React.FC<Props> = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = React.useState<'content' | 'colors' | 'design' | 'logo' | 'background'>('content');
  const [localValue, setLocalValue] = useState(config.value);

  // Sync local value when config value changes externally (e.g. from AI assistant)
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
          { id: 'logo', icon: ImageIcon, label: 'Logo' },
          { id: 'background', icon: Sparkles, label: 'Background' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
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

      <div className="p-6 flex-grow flex flex-col gap-6">
        <div className="flex-grow">
          {activeTab === 'content' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <label className="block text-sm font-semibold text-slate-300">Enter Content (URL, Text, or Email)</label>
              <textarea
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleCreate();
                  }
                }}
                className="w-full h-40 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none placeholder-slate-600 font-mono text-sm"
                placeholder="https://example.com"
              />
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Foreground</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.fgColor}
                      onChange={(e) => updateConfig({ fgColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 overflow-hidden bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.fgColor.toUpperCase()}
                      onChange={(e) => updateConfig({ fgColor: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-slate-700 bg-slate-800 text-slate-100 rounded-lg outline-none font-mono focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => updateConfig({ bgColor: e.target.value })}
                      className="w-12 h-12 rounded-lg cursor-pointer border-none p-0 overflow-hidden bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.bgColor.toUpperCase()}
                      onChange={(e) => updateConfig({ bgColor: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-slate-700 bg-slate-800 text-slate-100 rounded-lg outline-none font-mono focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-900/30">
                <p className="text-xs text-amber-500 font-medium">
                  Tip: Ensure high contrast between the foreground and background for better scannability.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Body Shape (Experimental)</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['square', 'dots', 'rounded', 'classy'] as QRStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => updateConfig({ qrStyle: style })}
                      className={`py-3 px-2 rounded-xl text-xs font-medium border-2 transition-all ${
                        config.qrStyle === style 
                          ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300' 
                          : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 text-slate-500'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Eye Shape</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['square', 'rounded', 'circle', 'leaf'] as EyeStyle[]).map(style => (
                    <button
                      key={style}
                      onClick={() => updateConfig({ eyeStyle: style })}
                      className={`py-3 px-2 rounded-xl text-xs font-medium border-2 transition-all ${
                        config.eyeStyle === style 
                          ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300' 
                          : 'border-slate-800 bg-slate-800/50 hover:border-slate-700 text-slate-500'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Upload Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-900/30 file:text-indigo-400 hover:file:bg-indigo-900/50 cursor-pointer"
                />
              </div>

              {config.logoUrl && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <img src={config.logoUrl} alt="Logo preview" className="h-12 w-12 object-contain rounded border border-slate-700 bg-slate-800" />
                     <button 
                      onClick={() => updateConfig({ logoUrl: undefined })}
                      className="text-xs text-rose-400 font-semibold hover:underline"
                     >
                       Remove Logo
                     </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Logo Size ({config.logoWidth}px)</label>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={config.logoWidth}
                      onChange={(e) => updateConfig({ logoWidth: Number(e.target.value), logoHeight: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'background' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Background Transparency</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.backgroundAlpha}
                  onChange={(e) => updateConfig({ backgroundAlpha: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-medium">
                  <span>Transparent</span>
                  <span>Solid</span>
                </div>
              </div>

              <div className="p-4 bg-blue-950/20 rounded-xl border border-blue-900/30">
                <p className="text-xs text-blue-400 font-medium leading-relaxed">
                  Want a custom image background? Use the AI Assistant in the sidebar to generate beautiful backgrounds automatically.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Global Create Button - Visible in all tabs */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <button
            onClick={handleCreate}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-900/40 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Wand2 size={20} />
            CREATE QR CODE
          </button>
          
          <p className="text-center text-[10px] text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400">Cmd + Enter</kbd> to generate instantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
