
import React, { useState } from 'react';
import { QRConfig } from '../types';
import { getAIStyleSuggestions, generateQRBackground, refineQRContent } from '../services/geminiService';
import { Wand2, ImagePlus, CheckCircle2, Loader2, Sparkles, MessageSquare } from 'lucide-react';

interface Props {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const AIAssistant: React.FC<Props> = ({ config, setConfig }) => {
  const [brandDesc, setBrandDesc] = useState('');
  const [bgPrompt, setBgPrompt] = useState('');
  const [contentPrompt, setContentPrompt] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStyleSuggest = async () => {
    if (!brandDesc) return;
    setLoading('styling');
    setError(null);
    try {
      const suggestion = await getAIStyleSuggestions(brandDesc);
      setConfig(prev => ({
        ...prev,
        fgColor: suggestion.fgColor,
        bgColor: suggestion.bgColor,
        qrStyle: suggestion.qrStyle,
        eyeStyle: suggestion.eyeStyle
      }));
    } catch (err) {
      setError('Failed to get style suggestions. Check your API key.');
    } finally {
      setLoading(null);
    }
  };

  const handleBgGenerate = async () => {
    if (!bgPrompt) return;
    setLoading('background');
    setError(null);
    try {
      const imgUrl = await generateQRBackground(bgPrompt);
      setConfig(prev => ({ ...prev, backgroundImage: imgUrl, backgroundAlpha: 0.8 }));
    } catch (err) {
      setError('Failed to generate image. Try a simpler prompt.');
    } finally {
      setLoading(null);
    }
  };

  const handleContentRefine = async () => {
    if (!contentPrompt) return;
    setLoading('content');
    setError(null);
    try {
      const refined = await refineQRContent(contentPrompt);
      setConfig(prev => ({ ...prev, value: refined }));
    } catch (err) {
      setError('Failed to refine content.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="text-indigo-400" size={24} />
        <h3 className="text-xl font-bold text-white font-outfit">AI Lab</h3>
      </div>

      {/* Style Suggestion */}
      <div className="bg-slate-900 p-5 rounded-2xl shadow-lg border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <Wand2 size={16} />
          AI Styler
        </div>
        <p className="text-xs text-slate-400">Describe your brand to get perfect color and shape suggestions.</p>
        <textarea
          value={brandDesc}
          onChange={(e) => setBrandDesc(e.target.value)}
          placeholder="e.g., A minimalist organic coffee shop..."
          className="w-full text-xs p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 focus:bg-slate-800/80 transition-all resize-none h-20 outline-none placeholder-slate-600"
        />
        <button
          onClick={handleStyleSuggest}
          disabled={!!loading || !brandDesc}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading === 'styling' ? <Loader2 className="animate-spin" size={16} /> : 'Apply AI Style'}
        </button>
      </div>

      {/* Background Generation */}
      <div className="bg-slate-900 p-5 rounded-2xl shadow-lg border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <ImagePlus size={16} />
          AI Background
        </div>
        <p className="text-xs text-slate-400">Generate an artistic background for your QR code.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={bgPrompt}
            onChange={(e) => setBgPrompt(e.target.value)}
            placeholder="e.g., Cyberpunk neon..."
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 outline-none placeholder-slate-600"
          />
          <button
            onClick={handleBgGenerate}
            disabled={!!loading || !bgPrompt}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all disabled:opacity-50"
          >
            {loading === 'background' ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={18} />}
          </button>
        </div>
      </div>

      {/* Content Assistant */}
      <div className="bg-slate-900 p-5 rounded-2xl shadow-lg border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <MessageSquare size={16} />
          Content Helper
        </div>
        <p className="text-xs text-slate-400">Let AI format your raw data into a valid QR string.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={contentPrompt}
            onChange={(e) => setContentPrompt(e.target.value)}
            placeholder="e.g., wifi login for MyWiFi..."
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-100 outline-none placeholder-slate-600"
          />
          <button
            onClick={handleContentRefine}
            disabled={!!loading || !contentPrompt}
            className="px-3 py-2 bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 rounded-lg transition-all disabled:opacity-50"
          >
            {loading === 'content' ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={18} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-900/20 border border-rose-800/30 rounded-xl text-rose-400 text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
