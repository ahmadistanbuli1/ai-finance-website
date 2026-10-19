import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { CATEGORIES } from "@/validations/record.schema";

// 1. Initialize the official Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-3.8-flash"; // The latest 2026 model

export const POST = async (req: Request) => {
  try {
    const { description } = await req.json();

    // 2. Guard Clause: Validate input
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length < 3
    ) {
      return NextResponse.json(
        { error: "Description must be at least 3 characters" },
        { status: 400 },
      );
    }

    // 3. Ask Gemini using the official SDK with Structured Output
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Categorize this expense: "${description}". It MUST be one of these: ${CATEGORIES.join(", ")}.`,
      config: {
        // Enforce JSON output for 100% strict formatting (no thinking steps or extra words)
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              description: `The exact matched category from the allowed list`,
            },
          },
          required: ["category"],
        },
        temperature: 0.1,
      },
    });

    // 4. Safely extract the JSON response
    const responseText = response.text;
    if (!responseText) {
      throw new Error("No text returned from Gemini");
    }

    const jsonResult = JSON.parse(responseText);
    const rawSuggestion = jsonResult.category;

    // 5. Security Check: Ensure the returned word matches our schema exactly
    const validCategory =
      CATEGORIES.find(
        (cat) => cat.toLowerCase() === rawSuggestion?.trim().toLowerCase(),
      ) ?? "Other";

    return NextResponse.json({ category: validCategory }, { status: 200 });
  } catch (error) {
    console.error("AI Categorization Error:", error);
    return NextResponse.json(
      { error: "Failed to suggest category" },
      { status: 500 },
    );
  }
};
