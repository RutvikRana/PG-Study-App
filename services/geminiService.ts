import { GoogleGenAI, Type } from "@google/genai";
import { DrugInfo, Explanation } from '../types';

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

const explanationSchema = {
    type: Type.OBJECT,
    properties: {
        error: {
            type: Type.STRING,
            description: "An error message if the question is invalid or cannot be answered. Otherwise, omit this field.",
            nullable: true,
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed but easy-to-understand explanation for the user's question."
        },
        mermaidDiagram: {
            type: Type.STRING,
            description: "A Mermaid syntax diagram (using 'flowchart TD' or 'graph TD') to visually illustrate the key steps or relationships in the process."
        }
    },
    required: ["explanation", "mermaidDiagram"]
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

export const fetchExplanation = async (question: string): Promise<Explanation> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Explain in simple terms: "${question}". Provide a detailed but easy-to-understand explanation and a Mermaid syntax diagram (using 'flowchart TD' or 'graph TD') to visually illustrate the process. The entire response must be a single JSON object. If the question is unclear, not medically related, or cannot be answered, respond with an object containing only an 'error' field.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: explanationSchema,
            },
        });

        const textResponse = response.text.trim();
        if (!textResponse) {
            throw new Error("Received an empty response from the API.");
        }
        
        const parsedData = JSON.parse(textResponse);
        return parsedData as Explanation;

    } catch (error) {
        console.error("Error fetching explanation from Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch explanation: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching the explanation.");
    }
};