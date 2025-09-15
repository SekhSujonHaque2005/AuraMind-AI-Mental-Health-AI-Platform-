
'use server';

/**
 * @fileOverview A Genkit tool to search for GIFs using the Tenor API.
 * 
 * - getTenorGif - A tool that fetches a GIF URL from Tenor based on a search query.
 */

import { ai } from '@/ai/genkit';
import axios from 'axios';
import { z } from 'zod';

const tenorApiSchema = z.object({
    results: z.array(z.object({
        media_formats: z.object({
            gif: z.object({
                url: z.string().url(),
            }),
        }),
    })),
});

export const getTenorGif = ai.defineTool(
    {
        name: 'getTenorGif',
        description: 'Searches the Tenor API for a relevant GIF and returns its URL.',
        inputSchema: z.object({
            query: z.string().describe('The search term for the GIF (e.g., "happy", "sad", "excited").'),
        }),
        outputSchema: z.string().url().nullable(),
    },
    async (input) => {
        const TENOR_API_KEY = process.env.TENOR_API_KEY;
        if (!TENOR_API_KEY) {
            console.error("Tenor API key is not set in environment variables.");
            return null;
        }

        const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(input.query)}&key=${TENOR_API_KEY}&limit=1&media_filter=gif`;

        try {
            const response = await axios.get(url);
            const parsed = tenorApiSchema.safeParse(response.data);

            if (parsed.success && parsed.data.results.length > 0) {
                return parsed.data.results[0].media_formats.gif.url;
            } else {
                console.warn(`No Tenor results found for query: "${input.query}"`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching GIF from Tenor for query "${input.query}":`, error);
            return null;
        }
    }
);
