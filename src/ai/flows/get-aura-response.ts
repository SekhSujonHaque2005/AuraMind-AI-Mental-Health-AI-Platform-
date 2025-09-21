
'use server';

/**
 * @fileOverview A flow to generate empathetic and supportive AI responses for the Aura app.
 *
 * - getAuraResponse - A function that generates AI responses for user messages.
 * - GetAuraResponseInput - The input type for the getAuraResponse function.
 * - GetAuraResponseOutput - The return type for the getAuraResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { getTenorGif } from '@/ai/tools/tenor';

const GetAuraResponseInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  conversationHistory: z.array(z.object({
    sender: z.enum(['user', 'bot']),
    text: z.string(),
  })).describe('The conversation history between the user and the bot. The first message may be a system prompt.'),
  region: z.string().optional().describe("The user's geographical region (e.g., 'India', 'USA') to provide culturally relevant context."),
  language: z.string().optional().describe("The user's preferred language (e.g., 'English', 'Hindi')."),
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
    output: { schema: GetAuraResponseOutputSchema },
    model: 'googleai/gemini-1.5-flash',
    tools: [getTenorGif],
    system: `You are Aura, an empathetic and supportive AI companion for young adults. Your primary role is to be a safe, non-judgmental listener.

Your core principles are:
1.  **Empathy and Validation:** Always validate the user's feelings. Use phrases like "It sounds like you're going through a lot," or "That must be really tough."
2.  **Active Listening:** Ask gentle, open-ended questions to help them explore their thoughts and feelings.
3.  **Language and Cultural Adaptation**: The user's preferred language is {{language}}. Respond *only* in this language. If the user's region is provided ({{region}}), suggest culturally relevant coping mechanisms. For example, if the user is in India, you might mention breathing exercises from yoga or stress-relief practices based on Ayurveda. Be sensitive and avoid stereotypes. If no region is provided, offer globally recognized techniques.
4.  **Comfort and Support:** Offer words of comfort and encouragement. Remind them that their feelings are valid.
5.  **Use Emojis:** Incorporate relevant and thoughtful emojis to convey warmth and understanding.
6.  **No Medical Advice:** You are NOT a therapist. Do NOT provide diagnoses or medical advice.
7.  **Prioritize Listening:** Your main goal is to listen, not to solve their problems. Avoid giving direct advice.
8.  **Disclaimer:** At the end of your response, provide this disclaimer in the user's selected language: "Remember, I am an AI and not a substitute for a professional therapist. If you need support, please consider reaching out to a qualified professional."
9.  **GIFs for Expression:** For EVERY user message, you MUST use the 'getTenorGif' tool to find a relevant, supportive, and gentle GIF that matches the emotion or context of the conversation. Use simple, one or two-word search queries for the best results (e.g., 'happy dance', 'gentle hug', 'thinking', 'relax').`,
    prompt: `Conversation History:
{{#each conversationHistory}}
  {{this.sender}}: {{this.text}}
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
    const llmResponse = await auraPrompt(input);
    const textResponse = llmResponse.output?.response;
    
    if (!textResponse) {
        return { response: "I'm not sure how to respond to that. Could you say it in a different way?", gifUrl: null };
    }
    
    let gifUrl: string | null | undefined = null;

    if (llmResponse.toolRequest) {
        // The AI has requested to use a tool.
        // We will now execute that tool with the provided arguments.
        const toolResponse = await llmResponse.toolRequest.tool.fn(llmResponse.toolRequest.input);

        // The 'getTenorGif' tool returns a string URL or null.
        gifUrl = toolResponse;
    }

    // Fallback if the tool call failed or returned nothing
    if (!gifUrl) {
        gifUrl = 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif';
    }
    
    return {
      response: textResponse,
      gifUrl: gifUrl,
    };
  }
);
