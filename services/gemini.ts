
import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

export const getPropertyInsights = async (property: Property): Promise<string> => {
  // Always use the named parameter for API key and assume process.env.API_KEY is pre-configured.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = `Act as an expert real estate consultant in Nepal. Analyze this property and provide a 3-sentence summary of its investment potential and living quality.
    Property Title: ${property.title}
    Type: ${property.type}
    Price: NPR ${property.price.toLocaleString()}
    Area: ${property.area} Aana (${property.areaSqFt} sq.ft)
    Location: ${property.location.city}, ${property.location.district}
    Description: ${property.description}`;

    // Generate content using the recommended gemini-3-flash-preview model for text tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Access the extracted string output directly via the .text property.
    return response.text || "Insight unavailable at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI consultant is currently offline. Please check back later.";
  }
};
