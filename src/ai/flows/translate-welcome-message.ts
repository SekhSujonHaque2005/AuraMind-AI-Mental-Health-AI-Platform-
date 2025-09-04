
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

function extractJson(str: string): any | null {
  const match = str.match(/```json\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      console.error("Failed to parse JSON from code block:", e);
      return null;
    }
  }
  try {
      return JSON.parse(str);
  } catch(e) {
      return null;
  }
}

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;

    // Bypass for English to avoid unnecessary API calls.
    if (targetLanguage.toLowerCase() === 'english') {
        return englishContent;
    }

    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        model: 'googleai/gemini-1.5-flash',
        input: { schema: z.object({ language: z.string() }) },
        prompt: `You are an expert translator. Your task is to translate the user-facing text in the provided English JSON object into {{language}}.

You MUST produce a valid JSON object as your output. Wrap the JSON in \`\`\`json tags. Do not add any other text before or after the JSON block.

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
            console.error(`[Translation Flow Error] Failed to extract JSON for language: ${targetLanguage}. Raw output:`, rawOutput);
            throw new Error("Failed to extract JSON from LLM response.");
        }

        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        
        return validatedOutput;
        
    } catch (error) {
        console.error(`[Translation Flow Error] Failed to translate content for language: ${targetLanguage}`, error);
        return englishContent;
    }
}
