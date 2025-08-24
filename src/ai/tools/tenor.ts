
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const searchTenor = ai.defineTool(
  {
    name: 'searchTenor',
    description: 'Search for a GIF on Tenor.',
    inputSchema: z.object({
      query: z.string().describe('The search query for the GIF.'),
    }),
    outputSchema: z.string().optional(),
  },
  async input => {
    const apiKey = process.env.TENOR_API_KEY;
    if (!apiKey) {
      console.error('Tenor API key not found in environment variables.');
      return undefined;
    }
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(input.query)}&key=${apiKey}&client_key=auramind&limit=1&media_filter=tinygif`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Tenor API request failed: ${response.statusText}`, errorBody);
        return undefined;
      }
      const data = await response.json();
      const gifUrl = data?.results?.[0]?.media_formats?.tinygif?.url;
      
      if (!gifUrl) {
        console.log("No GIF found for query:", input.query);
        return undefined;
      }

      return gifUrl;
    } catch (error) {
      console.error('Error fetching GIF from Tenor:', error);
      return undefined;
    }
  }
);
