
import { GoogleGenAI, Type } from "@google/genai";
import { AIStyleSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIStyleSuggestions = async (brandDescription: string): Promise<AIStyleSuggestion> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a QR code style (colors and shapes) for a brand with this description: "${brandDescription}". 
    The styles available are:
    QR Styles: 'square', 'dots', 'rounded', 'classy'
    Eye Styles: 'square', 'rounded', 'circle', 'leaf'
    Return JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fgColor: { type: Type.STRING, description: "HEX color for foreground" },
          bgColor: { type: Type.STRING, description: "HEX color for background" },
          qrStyle: { type: Type.STRING, enum: ['square', 'dots', 'rounded', 'classy'] },
          eyeStyle: { type: Type.STRING, enum: ['square', 'rounded', 'circle', 'leaf'] },
          explanation: { type: Type.STRING, description: "Why these styles were chosen" }
        },
        required: ["fgColor", "bgColor", "qrStyle", "eyeStyle", "explanation"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateQRBackground = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `A beautiful, high-quality, abstract or scenic background suitable for a QR code background. Subject: ${prompt}. High resolution, artistic style.` }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Failed to generate image");
};

export const refineQRContent = async (userInput: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user wants to create a QR code. Their raw input is: "${userInput}". 
    Convert this into the most appropriate final string for a QR code (e.g., a properly formatted URL, vCard, or plain text). 
    Return ONLY the final string to be encoded, no explanation.`,
  });
  return response.text.trim();
};
