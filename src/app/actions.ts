'use server';

import { checkSafetyAndRespond, SafetyCheckInput } from '@/ai/flows/critical-safety-protocol';
import { getAuraResponse, GetAuraResponseInput } from '@/ai/flows/get-aura-response';
import { z } from 'zod';

const chatActionInputSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
  conversationHistory: z.array(z.object({
    sender: z.enum(['user', 'bot']),
    text: z.string(),
  })),
});

type ChatActionInput = z.infer<typeof chatActionInputSchema>;

export async function getAIResponse(input: ChatActionInput) {
  try {
    const parsedInput = chatActionInputSchema.safeParse(input);

    if (!parsedInput.success) {
      return { error: 'Invalid input. ' + parsedInput.error.format()._errors.join(' ') };
    }

    const { message, conversationHistory } = parsedInput.data;

    // 1. Critical Safety Protocol
    const safetyInput: SafetyCheckInput = { message };
    const safetyResult = await checkSafetyAndRespond(safetyInput);

    if (!safetyResult.isSafe && safetyResult.response) {
      return { response: safetyResult.response };
    }

    // 2. Get Aura's regular response
    const auraInput: GetAuraResponseInput = { message, conversationHistory };
    const auraResult = await getAuraResponse(auraInput);

    if (!auraResult.response) {
      return { error: 'Aura could not generate a response at this time. Please try again later.' };
    }

    return { response: auraResult.response };
  } catch (error) {
    console.error("Error in getAIResponse:", error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
