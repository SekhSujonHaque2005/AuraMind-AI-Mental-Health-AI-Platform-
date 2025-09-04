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

    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        model: 'googleai/gemini-1.5-flash',
        input: { schema: z.object({ language: z.string() }) },
        output: { schema: TranslateWelcomeMessageOutputSchema },
        prompt: `You are an expert translator. Your task is to translate the user-facing text in the provided JSON object into {{language}}.

You MUST produce a valid JSON object as your output. Do not add any text or markdown formatting before or after the JSON object.

- Translate the "welcomeMessage".
- For each object in the "suggestedQuestions" array, translate both the "label" and the "value".

Here is the English JSON object to translate:
\`\`\`json
${JSON.stringify(englishContent, null, 2)}
\`\`\`
`,
    });

    try {
        const llmResponse = await translationPrompt({ language: targetLanguage });
        const output = llmResponse.output();
        
        if (!output) {
             throw new Error("LLM response did not contain valid output.");
        }

        // The output from definePrompt with an output schema is already validated JSON.
        return output;
        
    } catch (error) {
        console.error(`Failed to parse or validate translated JSON for language: ${targetLanguage}`, error);
        // Fallback to English content on failure to prevent app crash
        return englishContent;
    }
}
