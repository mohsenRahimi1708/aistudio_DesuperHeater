
import { GoogleGenAI } from "@google/genai";
import { Source } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSuperheaterInfo(
    flow: string,
    temperature: string,
    pressure: string,
    finalTemperature?: string
): Promise<{ text: string; sources: Source[] | undefined }> {
    let prompt = `As an expert power plant engineer, provide a detailed analysis of a superheater operating under these conditions:
- Steam Flow: ${flow} t/h
- Inlet Temperature: ${temperature}°C
- Pressure: ${pressure} bar

Explain the thermodynamic principles involved, the state of the steam, and key operational considerations.`;

    if (finalTemperature) {
        prompt += `

Additionally, describe the process of attemperation using a water spray to control the final outlet steam temperature to ${finalTemperature}°C. Detail the impact of this spray on steam properties (like enthalpy and entropy), the amount of spray water required (in principle), and the effects on overall boiler efficiency. The information must be accurate and up-to-date.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources = groundingMetadata?.groundingChunks?.map(chunk => chunk.web).filter(Boolean) as Source[] | undefined;
        
        return { text, sources };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get data from Gemini: ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the Gemini API.");
    }
}
