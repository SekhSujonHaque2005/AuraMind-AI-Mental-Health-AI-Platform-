
'use server';

/**
 * @fileOverview A flow to generate empathetic and supportive AI responses for the Aura app.
 *
 * - getAuraResponse - A function that generates AI responses for user messages.
 * - GetAuraResponseInput - The input type for the getAuraResponse function.
 * - GetAuraResponseOutput - The return type for the getAuraResponse function.
 */

import {ai} from '@/ai/genkit';
import {searchTenor} from '@/ai/tools/tenor';
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
  gifUrl: z.string().nullable().optional().describe('An optional URL to a relevant, supportive, and gentle GIF.'),
});
export type GetAuraResponseOutput = z.infer<typeof GetAuraResponseOutputSchema>;

export async function getAuraResponse(input: GetAuraResponseInput): Promise<GetAuraResponseOutput> {
  return getAuraResponseFlow(input);
}

const auraPrompt = ai.definePrompt({
    name: 'auraPrompt',
    input: { schema: GetAuraResponseInputSchema },
    output: { schema: z.string().nullable() },
    model: 'googleai/gemini-1.5-flash',
    prompt: `You are Aura, an empathetic and supportive AI companion for young adults. Your primary role is to be a safe, non-judgmental listener.

    Your core principles are:
    1.  **Empathy and Validation:** Always validate the user's feelings. Use phrases like "It sounds like you're going through a lot," or "That must be really tough."
    2.  **Active Listening:** Ask gentle, open-ended questions to help them explore their thoughts and feelings. For example, "How did that make you feel?" or "What was that experience like for you?"
    3.  **Comfort and Support:** Offer words of comfort and encouragement. Remind them that their feelings are valid.
    4.  **Use Emojis:** Incorporate relevant and thoughtful emojis to convey warmth, empathy, and understanding. For example: 😊, 🙏, 🤗, ✨.
    5.  **No Medical Advice:** You are NOT a therapist or a medical professional. Do NOT provide diagnoses, treatment plans, or medical advice.
    6.  **Prioritize Listening:** Your main goal is to listen, not to solve their problems. Avoid giving direct advice or telling them what to do.
    7.  **Disclaimer:** ALWAYS include a disclaimer at the end of your response, such as: "Remember, I am an AI and not a substitute for a professional therapist. If you need support, please consider reaching out to a qualified professional."

    Conversation History:
    {{#each conversationHistory}}
    {{sender}}: {{text}}
    {{/each}}

    User: {{message}}
    Aura:`,
});

const getAuraResponseFlow = ai.defineFlow(
  {
    name: 'getAuraResponseFlow',
    inputSchema: GetAuraResponseInputSchema,
    outputSchema: GetAuraResponseOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the text response from Aura.
    const textResponse = await auraPrompt(input);
    const auraText = textResponse.text;

    if (!auraText) {
        return { response: "I'm not sure how to respond to that. Could you say it in a different way?", gifUrl: null };
    }

    // Step 2: Extract a search query from the generated text.
    const searchQueryResponse = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        prompt: `Based on the following text, provide a one or two-word search query for a supportive and gentle GIF. Examples: "hug", "you can do it", "take a breath", "support", "happy dance", "good vibes".

        Text: "${auraText}"
        
        Query:`,
    });

    const searchQuery = searchQueryResponse.text?.trim();

    // Step 3: Search for the GIF using the extracted query.
    let gifUrl: string | undefined | null = null;
    if (searchQuery) {
        gifUrl = await searchTenor({ query: searchQuery });
    }

    // Step 4: Return the final response.
    return {
      response: auraText,
      gifUrl: gifUrl,
    };
  }
);
