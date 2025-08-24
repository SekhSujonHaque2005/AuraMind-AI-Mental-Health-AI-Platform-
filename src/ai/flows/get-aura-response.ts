
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
  gifUrl: z.string().nullable().optional().describe('An optional URL to a relevant, supportive, and gentle GIF.'),
});
export type GetAuraResponseOutput = z.infer<typeof GetAuraResponseOutputSchema>;

export async function getAuraResponse(input: GetAuraResponseInput): Promise<GetAuraResponseOutput> {
  return getAuraResponseFlow(input);
}

const emotionToGifMap: Record<string, string> = {
    'Happy': 'https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif',
    'Sad': 'https://media.giphy.com/media/l22ysLe54hZP0wubek/giphy.gif',
    'Angry': 'https://media.giphy.com/media/aNFT7eG2rIKK715uLk/giphy.gif',
    'Anxious': 'https://media.giphy.com/media/fu2NNkJVuULPBWexiJ/giphy.gif',
    'Love': 'https://media.giphy.com/media/bMLGNRoAy0Yko/giphy.gif',
    'Tough': 'https://media.giphy.com/media/3ohuPypXryWkDeeFby/giphy.gif',
    'Overwhelmed': 'https://media.giphy.com/media/ALZ1PPM20REZ2/giphy.gif',
    'Celebrating': 'https://media.giphy.com/media/4wHmqg9C94vYc/giphy.gif',
    'Lonely': 'https://media.giphy.com/media/TSQh1M1cbR9XiufPxb/giphy.gif',
    'Stressed': 'https://media.giphy.com/media/1jl173guBKkbvC03rQ/giphy.gif',
    'Venting': 'https://media.giphy.com/media/9Qd1eBO8Mi7xW8jFS7/giphy.gif',
    'Support': 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif',
    'Greeting': 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif',
};

const SingleCallOutputSchema = z.object({
  response: z.string().describe("The AI's empathetic and supportive text response."),
  emotion: z.enum(['Happy', 'Sad', 'Angry', 'Anxious', 'Love', 'Tough', 'Overwhelmed', 'Celebrating', 'Lonely', 'Stressed', 'Venting', 'Support', 'Greeting'])
    .describe('The core emotion of the conversation from the provided list.'),
});

const auraPrompt = ai.definePrompt({
    name: 'auraPrompt',
    input: { schema: GetAuraResponseInputSchema },
    output: { schema: SingleCallOutputSchema },
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

    First, write your response to the user.
    Then, analyze the user's message and your response to determine the core emotion. Choose one emotion from this list: Happy, Sad, Angry, Anxious, Love, Tough, Overwhelmed, Celebrating, Lonely, Stressed, Venting, Support, Greeting.

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
    // Step 1: Generate the text response and emotion in a single call.
    const structuredResponse = await auraPrompt(input);
    const { output } = structuredResponse;

    if (!output) {
        return { response: "I'm not sure how to respond to that. Could you say it in a different way?", gifUrl: null };
    }

    const { response: auraText, emotion } = output;

    // Step 2: Get the GIF URL from the map based on the returned emotion.
    const gifUrl = emotionToGifMap[emotion] || emotionToGifMap['Support'];

    // Step 3: Return the final response.
    return {
      response: auraText,
      gifUrl: gifUrl,
    };
  }
);

    