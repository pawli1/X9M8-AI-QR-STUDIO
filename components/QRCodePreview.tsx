
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRConfig } from '../types';

interface Props {
  config: QRConfig;
}

const QRCodePreview: React.FC<Props> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadSVG = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'x9m8-qrcode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // High resolution render
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        // Clear and draw background if necessary
        if (!config.backgroundImage && config.bgColor) {
            ctx.fillStyle = config.bgColor;
            ctx.fillRect(0, 0, 1000, 1000);
        }
        ctx.drawImage(img, 0, 0, 1000, 1000);
      }
      
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'x9m8-qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800">
      <div 
        ref={containerRef}
        className="relative p-6 rounded-2xl bg-white shadow-inner overflow-hidden flex items-center justify-center border border-slate-700"
        style={{ 
          backgroundColor: config.backgroundImage ? 'transparent' : config.bgColor,
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '280px',
          minHeight: '280px'
        }}
      >
        {/* Overlay for better readability if background image exists */}
        {config.backgroundImage && (
          <div 
            className="absolute inset-0 z-0" 
            style={{ backgroundColor: `rgba(255,255,255,${config.backgroundAlpha})` }}
          />
        )}
        
        <div className="relative z-10 qr-container">
          <QRCodeSVG
            value={config.value || 'https://x9m8.com'}
            size={240}
            level="H"
            fgColor={config.fgColor}
            bgColor="transparent"
            imageSettings={config.logoUrl ? {
              src: config.logoUrl,
              x: undefined,
              y: undefined,
              height: config.logoHeight,
              width: config.logoWidth,
              excavate: true,
            } : undefined}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <button 
          onClick={downloadPNG}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-900/40 active:scale-95 text-sm"
        >
          Download PNG
        </button>
        <button 
          onClick={downloadSVG}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-all border border-slate-700 active:scale-95 text-sm"
        >
          Download SVG
        </button>
      </div>
      
      <p className="text-[10px] text-slate-500 text-center max-w-[250px]">
        Professional export. Transparent backgrounds supported.
      </p>
    </div>
  );
};

export default QRCodePreview;
