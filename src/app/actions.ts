
'use server';

import { checkSafetyAndRespond, SafetyCheckInput } from '@/ai/flows/critical-safety-protocol';
import { getAuraResponse, GetAuraResponseInput } from '@/ai/flows/get-aura-response';
import { translateWelcomeMessage } from '@/ai/flows/translate-welcome-message';
import { TranslateWelcomeMessageInput, TranslateWelcomeMessageOutput } from '@/contexts/ChatContext';
import { generateSelfCareQuest, GenerateSelfCareQuestInput } from '@/ai/flows/generate-self-care-quest';
import { z } from 'zod';

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


export async function getAIGeneratedQuest(input: GenerateSelfCareQuestInput): Promise<{ quest?: string; error?: string }> {
  try {
    const result = await generateSelfCareQuest(input);
    if (!result || !result.quest) {
      console.error("AI quest generation returned an empty result.");
      return { error: 'The AI could not generate a quest idea right now. Please try again.' };
    }
    return { quest: result.quest };
  } catch (error) {
    console.error("Error in getAIGeneratedQuest:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return { error: `Failed to generate AI quest: ${errorMessage}` };
  }
}
