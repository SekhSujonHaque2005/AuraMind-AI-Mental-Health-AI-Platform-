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

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;
    if (targetLanguage.toLowerCase() === 'english') {
        return englishContent;
    }

    // Define the prompt without an output schema.
    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        model: 'googleai/gemini-1.5-flash',
        input: { schema: z.object({ language: z.string() }) },
        prompt: `You are an expert translator. Your task is to translate the user-facing text in the provided English JSON object into {{language}}.

You MUST produce a valid JSON object as your output. Do not add any text or markdown formatting (like \`\`\`json) before or after the JSON object itself.

Here is the English JSON object to translate:
${JSON.stringify(englishContent, null, 2)}
`,
    });

    try {
        const llmResponse = await translationPrompt({ language: targetLanguage });
        // Get the raw text output from the LLM.
        const rawOutput = llmResponse.text;

        if (!rawOutput) {
             throw new Error("LLM response was empty.");
        }
        
        // Manually parse and validate the JSON.
        const parsedJson = JSON.parse(rawOutput);
        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        
        return validatedOutput;
        
    } catch (error) {
        console.error(`[Translation Flow Error] Failed to translate content for language: ${targetLanguage}`, error);
        // Fallback to English content on any failure to prevent app crash.
        return englishContent;
    }
}
