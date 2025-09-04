
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


const translationPrompt = ai.definePrompt({
    name: 'translationPrompt',
    input: { schema: TranslateWelcomeMessageInputSchema },
    output: { schema: TranslateWelcomeMessageOutputSchema },
    model: 'googleai/gemini-1.5-flash',
    prompt: `Translate the following JSON content into the target language: {{language}}.

You MUST translate all fields: 'welcomeMessage' and every 'label' and 'value' within the 'suggestedQuestions' array. Do not change the JSON structure or keys.

Input Content:
${JSON.stringify(englishContent, null, 2)}
`,
});

const translateWelcomeFlow = ai.defineFlow({
    name: 'translateWelcomeFlow',
    inputSchema: TranslateWelcomeMessageInputSchema,
    outputSchema: TranslateWelcomeMessageOutputSchema,
}, async (flowInput) => {
    const { output } = await translationPrompt(flowInput);
    if (!output) {
        throw new Error("Translation failed to produce an output.");
    }
    return output;
});


export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    if (input.language.toLowerCase() === 'english') {
        return englishContent;
    }
    return translateWelcomeFlow(input);
}
