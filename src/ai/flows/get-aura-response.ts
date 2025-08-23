'use server';

/**
 * @fileOverview A flow to generate empathetic and supportive AI responses for the Aura app.
 *
 * - getAuraResponse - A function that generates AI responses for user messages.
 * - GetAuraResponseInput - The input type for the getAuraResponse function.
 * - GetAuraResponseOutput - The return type for the getAuraResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAuraResponseInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  conversationHistory: z.array(z.object({
    sender: z.enum(['user', 'bot']),
    text: z.string(),
  })).describe('The conversation history between the user and the bot.'),
});
export type GetAuraResponseInput = z.infer<typeof GetAuraResponseInputSchema>;

const GetAuraResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated response.'),
});
export type GetAuraResponseOutput = z.infer<typeof GetAuraResponseOutputSchema>;

export async function getAuraResponse(input: GetAuraResponseInput): Promise<GetAuraResponseOutput> {
  return getAuraResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAuraResponsePrompt',
  input: {schema: GetAuraResponseInputSchema},
  output: {schema: GetAuraResponseOutputSchema},
  prompt: `You are Aura, an empathetic and supportive AI companion for young adults. Your goal is to be a safe, non-judgmental listener. Do NOT give medical advice. Instead, validate the user's feelings, ask gentle, open-ended questions to help them explore their thoughts, and offer comfort. Prioritize listening over problem-solving. Always include a disclaimer that you are an AI and not a substitute for a professional therapist.\n\nConversation History:\n{{#each conversationHistory}}\n{{sender}}: {{text}}\n{{/each}}\n\nUser Message: {{message}}`,
});

const getAuraResponseFlow = ai.defineFlow(
  {
    name: 'getAuraResponseFlow',
    inputSchema: GetAuraResponseInputSchema,
    outputSchema: GetAuraResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
