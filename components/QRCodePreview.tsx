
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRConfig } from '../types.ts';

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
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        if (config.bgColor) {
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
    <div className="flex flex-col items-center gap-8 p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800">
      <div 
        ref={containerRef}
        className="relative p-8 rounded-[2rem] bg-white shadow-2xl overflow-hidden flex items-center justify-center border border-slate-800"
        style={{ 
          backgroundColor: config.bgColor,
          minWidth: '320px',
          minHeight: '320px'
        }}
      >
        <div className="relative z-10 qr-container">
          <QRCodeSVG
            value={config.value || 'https://x9m8.com'}
            size={260}
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

      <div className="grid grid-cols-1 gap-4 w-full">
        <button 
          onClick={downloadPNG}
          className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-indigo-950/50 active:scale-95 text-sm uppercase tracking-widest"
        >
          Download High-Res PNG
        </button>
        <button 
          onClick={downloadSVG}
          className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-black transition-all border border-slate-700 active:scale-95 text-sm uppercase tracking-widest"
        >
          Download Scalable SVG
        </button>
      </div>
    </div>
  );
};

export default QRCodePreview;
