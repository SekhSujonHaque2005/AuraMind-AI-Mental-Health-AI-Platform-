
'use server';

import { checkSafetyAndRespond, SafetyCheckInput } from '@/ai/flows/critical-safety-protocol';
import { getAuraResponse, GetAuraResponseInput } from '@/ai/flows/get-aura-response';
import { translateWelcomeMessage } from '@/ai/flows/translate-welcome-message';
import { z } from 'zod';

// --- Translation Schemas and Types ---
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

export const englishContent: TranslateWelcomeMessageOutput = {
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
// --- End Translation Schemas ---


const chatActionInputSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
  conversationHistory: z.array(z.object({
    sender: z.enum(['user', 'bot']),
    text: z.string(),
  })),
  region: z.string().optional(),
  language: z.string().optional(),
});

type ChatActionInput = z.infer<typeof chatActionInputSchema>;

export async function getAIResponse(input: ChatActionInput) {
  try {
    const parsedInput = chatActionInputSchema.safeParse(input);

    if (!parsedInput.success) {
      const errorMessage = "Invalid input: " + parsedInput.error.format()._errors.join(' ');
      console.error(errorMessage);
      return { error: 'There was an issue with the data sent to the server. Please try again.' };
    }

    const { message, conversationHistory, region, language } = parsedInput.data;

    // 1. Critical Safety Protocol
    const safetyInput: SafetyCheckInput = { message };
    const safetyResult = await checkSafetyAndRespond(safetyInput);

    if (safetyResult && !safetyResult.isSafe && safetyResult.response) {
      return { response: safetyResult.response, gifUrl: undefined };
    }

    // 2. Get Aura's regular response
    const auraInput: GetAuraResponseInput = { message, conversationHistory, region, language };
    const auraResult = await getAuraResponse(auraInput);

    if (!auraResult || !auraResult.response) {
      console.error("Aura response was empty or undefined.");
      return { error: 'Aura could not generate a response at this time. Please try again later.' };
    }

    return { response: auraResult.response, gifUrl: auraResult.gifUrl };
  } catch (error) {
    console.error("Error in getAIResponse:", error);
    // Provide a more specific error in development if possible
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `An unexpected error occurred: ${errorMessage}. Please try again.` };
  }
}

export async function getTranslatedWelcome(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput | {error: string}> {
    try {
        const result = await translateWelcomeMessage(input);
        if (!result || !result.welcomeMessage) {
            console.error("Translation response was empty or undefined.");
            return { error: 'Could not generate a translated welcome message.' };
        }
        return {
            welcomeMessage: result.welcomeMessage,
            suggestedQuestions: result.suggestedQuestions,
        };
    } catch (error) {
        console.error("Error in getTranslatedWelcome:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { error: `An unexpected error occurred: ${errorMessage}. Please try again.` };
    }
}
