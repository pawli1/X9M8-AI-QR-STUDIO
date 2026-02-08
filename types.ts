
export type QRStyle = 'square' | 'dots' | 'rounded' | 'classy';
export type EyeStyle = 'square' | 'rounded' | 'circle' | 'leaf';

export interface QRConfig {
  value: string;
  fgColor: string;
  bgColor: string;
  qrStyle: QRStyle;
  eyeStyle: EyeStyle;
  logoUrl?: string;
  logoWidth: number;
  logoHeight: number;
  logoOpacity: number;
  gradient: boolean;
  gradientColor?: string;
  gradientType: 'linear' | 'radial';
  backgroundAlpha: number;
  backgroundImage?: string;
}

export interface AIStyleSuggestion {
  fgColor: string;
  bgColor: string;
  qrStyle: QRStyle;
  eyeStyle: EyeStyle;
  explanation: string;
}
