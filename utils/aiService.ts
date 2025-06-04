
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ColorEntry } from '../types';
import { hexToRgbString } from './colorUtils'; // Import centralized utility

// Ensure API_KEY is handled as per project setup (e.g., from process.env)
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API Key is not configured. AI-powered color detection will be disabled.");
}

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (reader.result) {
            resolve((reader.result as string).split(',')[1]);
        } else {
            reject(new Error("Failed to read file for base64 conversion."));
        }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
  
  try {
    const data = await base64EncodedDataPromise;
    return {
      inlineData: {
        mimeType: file.type,
        data,
      },
    };
  } catch (error) {
    console.error("Error converting file to generative part:", error);
    throw error; // Re-throw to be caught by the caller
  }
};

export const detectDominantColors = async (file: File): Promise<ColorEntry[]> => {
  if (!ai) {
    console.log("AI service not initialized. Skipping color detection.");
    return [];
  }

  try {
    const imagePart = await fileToGenerativePart(file);
    const prompt = `Analyze this logo image and identify the 3 to 5 most dominant colors.
Return these colors as a JSON object with a key "colors" containing an array of hex color strings.
Each hex string should start with '#'.
For example: {"colors": ["#RRGGBB", "#RRGGBB", "#RRGGBB"]}.
If you cannot reliably identify distinct colors or if the image is unsuitable, return an empty array for "colors".`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: { parts: [imagePart, {text: prompt}] },
      config: {
        responseMimeType: "application/json",
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s; // Matches ```json ... ``` or ``` ... ```
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsed = JSON.parse(jsonStr);

    if (parsed && parsed.colors && Array.isArray(parsed.colors)) {
      return parsed.colors
        .filter((hexColor: string) => typeof hexColor === 'string' && /^#[0-9A-F]{6}$/i.test(hexColor)) // Basic validation
        .map((hexColor: string, index: number) => ({
          id: `detected-${index}-${Date.now()}`,
          hex: hexColor,
          rgb: hexToRgbString(hexColor),
      }));
    }
    console.warn("Could not parse colors from AI response or colors array is invalid/empty:", parsed);
    return [];
  } catch (error) {
    console.error('Error detecting colors with Gemini:', error);
    return []; // Fallback to empty array on error
  }
};