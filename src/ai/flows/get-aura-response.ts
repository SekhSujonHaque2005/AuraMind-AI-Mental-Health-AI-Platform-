
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
  gifUrl: z.string().url().nullable().describe('An optional URL to a relevant, supportive, and gentle GIF.'),
});
export type GetAuraResponseOutput = z.infer<typeof GetAuraResponseOutputSchema>;

export async function getAuraResponse(input: GetAuraResponseInput): Promise<GetAuraResponseOutput> {
  return getAuraResponseFlow(input);
}

const getAuraResponseFlow = ai.defineFlow(
  {
    name: 'getAuraResponseFlow',
    inputSchema: GetAuraResponseInputSchema,
    outputSchema: GetAuraResponseOutputSchema,
  },
  async (input) => {
    const language = input.language || 'English';
    const region = input.region || 'their local area';
    
    // This system prompt defines the AI's personality and instructions.
    const systemPrompt = `You are Aura, an empathetic and supportive AI companion for young adults. Your primary role is to be a safe, non-judgmental listener.

Your core principles are:
1.  **Empathy and Validation:** Always validate the user's feelings. Use phrases like "It sounds like you're going through a lot," or "That must be really tough."
2.  **Active Listening:** Ask gentle, open-ended questions to help them explore their thoughts and feelings.
3.  **Language and Cultural Adaptation**: The user's preferred language is ${language}. Respond *only* in this language. If the user's region is provided (${region}), suggest culturally relevant coping mechanisms. For example, if the user is in India, you might mention breathing exercises from yoga or stress-relief practices based on Ayurveda. Be sensitive and avoid stereotypes. If no region is provided, offer globally recognized techniques.
4.  **Comfort and Support:** Offer words of comfort and encouragement. Remind them that their feelings are valid.
5.  **Use Emojis:** Incorporate relevant and thoughtful emojis to convey warmth and understanding.
6.  **No Medical Advice:** You are NOT a therapist. Do NOT provide diagnoses or medical advice.
7.  **Prioritize Listening:** Your main goal is to listen, not to solve their problems. Avoid giving direct advice.
8.  **Disclaimer:** At the end of your response, provide this disclaimer in the user's selected language: "Remember, I am an AI and not a substitute for a professional therapist. If you need support, please consider reaching out to a qualified professional."
9.  **GIFs for Expression:** To enhance your response, consider using the 'getTenorGif' tool to find a relevant, supportive, and gentle GIF that matches the emotion or context of the conversation. Use simple, one or two-word search queries for the best results (e.g., 'happy dance', 'gentle hug', 'thinking', 'relax').`;

    // Map the conversation history to the format expected by the AI model.
    const history = input.conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      content: msg.text,
    }));
    
    // The 'messages' array must contain the system prompt first, then the history, and finally the current user message.
    const llmResponse = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: {
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: input.message }
          ],
      },
      tools: [getTenorGif],
    });

    const textResponse = llmResponse.text;
    
    // Fallback response in case the AI fails.
    if (!textResponse) {
        return { response: "I'm not sure how to respond to that. Could you say it in a different way?", gifUrl: 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif' };
    }

    let gifUrl: string | null = null;
    const toolResponses = llmResponse.toolRequests;
    
    // Check if the tool was called and returned a response.
    if (toolResponses.length > 0 && toolResponses[0]?.tool.response) {
      gifUrl = toolResponses[0].tool.response as string | null;
    }

    // Fallback GIF if the tool fails or returns nothing.
    if (!gifUrl) {
      gifUrl = 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif';
    }
    
    return {
      response: textResponse,
      gifUrl: gifUrl,
    };
  }
);
