
'use server';

/**
 * @fileOverview A flow to translate the initial welcome message and suggested questions.
 *
 * - translateWelcomeMessage - Translates the welcome message and options to the target language.
 */

import {ai} from '@/ai/genkit';
import { z } from 'zod';

// --- Translation Schemas and Types (defined here to prevent circular dependency) ---
export const TranslateWelcomeMessageInputSchema = z.object({
  language: z.string().describe('The target language to translate the content into (e.g., "Hindi", "Bengali").'),
});
export type TranslateWelcomeMessageInput = z.infer<typeof TranslateWelcomeMessageInputSchema>;

const MessageOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const TranslateWelcomeMessageOutputSchema = z.object({
  welcomeMessage: z.string().describe('The translated welcome message.'),
  suggestedQuestions: z.array(MessageOptionSchema).describe('The list of translated suggested questions.'),
});
export type TranslateWelcomeMessageOutput = z.infer<typeof TranslateWelcomeMessageOutputSchema>;


export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    return translateWelcomeFlow(input);
}

const englishContent: TranslateWelcomeMessageOutput = {
    welcomeMessage: "Hello! I'm Aura, your empathetic AI companion. I'm here to listen without judgment. To start, what's on your mind today? ☀️",
    suggestedQuestions: [
        { label: "I'm feeling happy! 😊", value: "I'm feeling happy today!" },
        { label: "I'm feeling sad 😔", value: "I'm feeling a bit sad" },
        { label: "I'm feeling anxious 😟", value: "I'm feeling anxious" },
        { label: "I'm having a tough day ⛈️", value: "I'm having a tough day" },
        { label: "I'm celebrating a small win! 🎉", value: "I'm celebrating a small win today!" },
        { label: "I'm feeling overwhelmed 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "I feel a bit lonely 🫂", value: "I'm feeling a bit lonely." },
        { label: "I'm stressed about work/school 😫", value: "I'm feeling stressed about work/school." },
        { label: "I just need to vent 😤", value: "I just need to vent for a minute." },
    ]
};

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
}, async (input) => {
    if (input.language.toLowerCase() === 'english') {
        return englishContent;
    }
    const { output } = await translationPrompt(input);
    return output!;
});
