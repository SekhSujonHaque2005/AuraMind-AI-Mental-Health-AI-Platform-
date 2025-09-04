
'use server';

/**
 * @fileOverview A flow to translate the initial welcome message and suggested questions.
 *
 * - translateWelcomeMessage - Translates the welcome message and options to the target language.
 */

import {ai} from '@/ai/genkit';
import { 
    TranslateWelcomeMessageOutputSchema, 
    type TranslateWelcomeMessageInput, 
    type TranslateWelcomeMessageOutput,
    englishContent
} from '@/contexts/ChatContext';
import { z } from 'zod';

/**
 * Extracts a JSON object from a string.
 * It can handle JSON wrapped in markdown code blocks (```json ... ```) or raw JSON strings.
 * @param str The string to extract JSON from.
 * @returns The parsed JSON object or null if parsing fails.
 */
function extractJson(str: string): any | null {
  // Regex to find JSON wrapped in ```json ... ``` or as a raw object.
  const match = str.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
  if (match && (match[1] || match[2])) {
    const jsonString = match[1] || match[2];
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON from extracted string:", e, "\nOriginal string part:", jsonString);
      return null;
    }
  }
   // Fallback for strings that might just be the JSON object without fences
  try {
      return JSON.parse(str);
  } catch(e) {
      // The string is likely not JSON, or is malformed.
      return null;
  }
}

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;

    // Bypass for English to avoid unnecessary API calls and potential errors.
    if (targetLanguage.toLowerCase() === 'english') {
        return englishContent;
    }

    // This prompt is now defined inside the function to ensure it is always fresh.
    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        model: 'googleai/gemini-1.5-flash',
        input: { schema: z.object({ language: z.string() }) },
        prompt: `You are an expert translator. Your task is to translate the user-facing text in the provided English JSON object into {{language}}.

You MUST produce a valid JSON object as your output, wrapped in \`\`\`json tags. Do not add any other text before or after the JSON block. Ensure all translated strings are valid JSON strings (e.g., escape double quotes).

Here is the English JSON object to translate:
${JSON.stringify(englishContent, null, 2)}
`,
    });

    try {
        const llmResponse = await translationPrompt({ language: targetLanguage });
        const rawOutput = llmResponse.text;

        if (!rawOutput) {
             throw new Error("LLM response was empty.");
        }
        
        const parsedJson = extractJson(rawOutput);

        if (!parsedJson) {
            console.error(`[Translation Flow Error] Failed to extract JSON for language: ${targetLanguage}. Raw output was:`, rawOutput);
            throw new Error("Failed to extract valid JSON from the AI's response.");
        }

        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        
        return validatedOutput;
        
    } catch (error) {
        console.error(`[Translation Flow Error] Failed to translate content for language: ${targetLanguage}`, error);
        // Fallback to English content on any error.
        return englishContent;
    }
}
