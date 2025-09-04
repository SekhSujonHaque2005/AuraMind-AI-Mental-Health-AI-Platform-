
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

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    if (input.language.toLowerCase() === 'english') {
        return englishContent;
    }

    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        // By not defining an input schema, we simplify the call and avoid the 'typeName' error.
        prompt: `Translate the following JSON content into the target language: {{language}}.

You MUST translate all fields: 'welcomeMessage' and every 'label' and 'value' within the 'suggestedQuestions' array. Do not change the JSON structure or keys. Your output must be a valid JSON object string.

Input Content:
${JSON.stringify(englishContent, null, 2)}
`,
    });

    const llmResponse = await translationPrompt({ language: input.language });
    const translatedText = llmResponse.text;

    try {
        // The output from the LLM can sometimes be wrapped in ```json ... ```, so we need to strip that.
        const jsonString = translatedText.replace(/^```json\n|```$/g, '');
        const parsedJson = JSON.parse(jsonString);
        
        // Manually validate the parsed object against the Zod schema
        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        return validatedOutput;
    } catch (error) {
        console.error("Failed to parse or validate translated JSON:", error);
        console.error("Raw LLM output:", translatedText);
        // Fallback to English content on failure to prevent app crash
        return englishContent;
    }
}
