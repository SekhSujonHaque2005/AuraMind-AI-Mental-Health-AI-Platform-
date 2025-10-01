
'use server';

/**
 * @fileOverview A flow to find a relevant music track based on a natural language query.
 *
 * - findMusic - A function that suggests a music track.
 */

import {ai} from '@/ai/genkit';
import { FindMusicInputSchema, FindMusicOutputSchema, type FindMusicInput, type FindMusicOutput } from '@/app/playlist/types';


export async function findMusic(
  input: FindMusicInput
): Promise<FindMusicOutput> {
  return findMusicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findMusicPrompt',
  input: { schema: FindMusicInputSchema },
  output: { schema: FindMusicOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert at recommending music for specific moods and activities. Your task is to find the best track from the provided list that matches the user's request.

Analyze the user's query: {{{query}}}

Here is the list of available tracks with their titles and descriptions:
{{#each tracks}}
- ID: {{this.id}}, Title: "{{this.title}}", Description: "{{this.description}}"
{{/each}}

Based on the query, determine which track is the most suitable match. Return only the ID of that track. If no track is a good fit, return null.
`,
});

const findMusicFlow = ai.defineFlow(
  {
    name: 'findMusicFlow',
    inputSchema: FindMusicInputSchema,
    outputSchema: FindMusicOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) {
        return { trackId: null };
    }

    return output;
  }
);
