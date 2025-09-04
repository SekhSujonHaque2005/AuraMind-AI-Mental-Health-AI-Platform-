
'use server';

/**
 * @fileOverview A flow to translate the initial welcome message and suggested questions.
 *
 * - translateWelcomeMessage - Translates the welcome message and options to the target language.
 */

import {ai} from '@/ai/genkit';
import { 
    TranslateWelcomeMessageInputSchema, 
    TranslateWelcomeMessageOutputSchema, 
    type TranslateWelcomeMessageInput, 
    type TranslateWelcomeMessageOutput,
    englishContent
} from '@/contexts/ChatContext';


export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    if (input.language.toLowerCase() === 'english') {
        return englishContent;
    }

    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        input: { schema: TranslateWelcomeMessageInputSchema },
        // We will parse the output manually to avoid schema resolution issues.
        prompt: `Translate the following JSON content into the target language: {{language}}.

You MUST translate all fields: 'welcomeMessage' and every 'label' and 'value' within the 'suggestedQuestions' array. Do not change the JSON structure or keys. Your output must be a valid JSON object string.

Input Content:
${JSON.stringify(englishContent, null, 2)}
`,
    });

    const llmResponse = await translationPrompt(input);
    const translatedText = llmResponse.text;

    try {
        const parsedJson = JSON.parse(translatedText);
        // Manually validate the parsed object against the Zod schema
        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        return validatedOutput;
    } catch (error) {
        console.error("Failed to parse or validate translated JSON:", error);
        throw new Error("Translation output was not in the expected format.");
    }
}
