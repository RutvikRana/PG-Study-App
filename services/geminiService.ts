
import { GoogleGenAI, Type } from "@google/genai";
import { DrugInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const drugInfoSchema = {
  type: Type.OBJECT,
  properties: {
    error: {
      type: Type.STRING,
      description: "An error message if the drug is not found or invalid. Otherwise, this field should be omitted.",
      nullable: true,
    },
    drugClass: {
      type: Type.STRING,
      description: "The pharmacological class of the drug."
    },
    genericName: {
      type: Type.STRING,
      description: "The official generic name of the drug."
    },
    brandNames: {
      type: Type.ARRAY,
      description: "A list of common brand names for the drug.",
      items: {
        type: Type.STRING
      }
    },
    mechanismOfAction: {
      type: Type.STRING,
      description: "A detailed explanation of the drug's mechanism of action (MOA)."
    },
    uses: {
      type: Type.ARRAY,
      description: "A list of clinical uses and indications for the drug.",
      items: {
        type: Type.STRING
      }
    },
    sideEffects: {
      type: Type.ARRAY,
      description: "A list of common side effects (S/E).",
      items: {
        type: Type.STRING
      }
    },
    adverseReactions: {
      type: Type.ARRAY,
      description: "A list of serious adverse drug reactions (ADRs).",
      items: {
        type: Type.STRING
      }
    },
  },
  required: ["drugClass", "genericName", "brandNames", "mechanismOfAction", "uses", "sideEffects", "adverseReactions"]
};


export const fetchDrugInfo = async (drugName: string): Promise<DrugInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a detailed pharmacological profile for the drug: "${drugName}". If the drug is not found or is not a recognized pharmaceutical, respond with an object containing only an 'error' field explaining that the drug could not be found.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: drugInfoSchema,
      },
    });

    const textResponse = response.text.trim();
    if (!textResponse) {
        throw new Error("Received an empty response from the API.");
    }
    
    const parsedData = JSON.parse(textResponse);
    return parsedData as DrugInfo;

  } catch (error) {
    console.error("Error fetching drug info from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch drug information: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching drug information.");
  }
};
   