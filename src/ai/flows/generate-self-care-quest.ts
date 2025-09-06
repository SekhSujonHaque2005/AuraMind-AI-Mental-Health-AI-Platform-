
'use server';

/**
 * @fileOverview A flow to generate a single, new self-care quest idea.
 *
 * - generateSelfCareQuest - A function that suggests a new quest.
 * - GenerateSelfCareQuestInput - The input type for the function.
 * - GenerateSelfCareQuestOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateSelfCareQuestInputSchema = z.object({
  existingQuests: z.array(z.string()).describe('A list of quests the user already has.'),
});
export type GenerateSelfCareQuestInput = z.infer<typeof GenerateSelfCareQuestInputSchema>;

const GenerateSelfCareQuestOutputSchema = z.object({
  quest: z.string().describe('A new, short, actionable self-care quest.'),
});
export type GenerateSelfCareQuestOutput = z.infer<typeof GenerateSelfCareQuestOutputSchema>;

export async function generateSelfCareQuest(
  input: GenerateSelfCareQuestInput
): Promise<GenerateSelfCareQuestOutput> {
  return generateQuestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestPrompt',
  input: { schema: GenerateSelfCareQuestInputSchema },
  output: { schema: GenerateSelfCareQuestOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an AI assistant that helps users create personalized self-care quests. Your goal is to suggest a single, new, and creative quest that is not on the user's current list.

The quest should be:
- Short and actionable (e.g., "Watch a sunrise or sunset," "Listen to a new calming playlist").
- Focused on mental wellness, mindfulness, or simple self-care.
- Different from the quests the user already has.

Here are the user's existing quests:
{{#each existingQuests}}
- {{{this}}}
{{/each}}

Generate one new quest suggestion.
`,
});

const generateQuestFlow = ai.defineFlow(
  {
    name: 'generateQuestFlow',
    inputSchema: GenerateSelfCareQuestInputSchema,
    outputSchema: GenerateSelfCareQuestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) {
        // Fallback in case the AI fails to generate a response.
        return { quest: "Take five deep, calming breaths." };
    }

    return output;
  }
);
