
'use server';

/**
 * @fileOverview A Genkit tool to search for GIFs using the Tenor API.
 * 
 * - getTenorGif - A tool that fetches a GIF URL from Tenor based on a search query.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import fetch from 'node-fetch';


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
        outputSchema: z.any(), // Use a flexible schema to avoid AI wrapping the output
    },
    async (input) => {
        const TENOR_API_KEY = process.env.TENOR_API_KEY;
        if (!TENOR_API_KEY) {
            console.error("[Tenor Tool] Tenor API key is not set in environment variables.");
            return null;
        }

        const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(input.query)}&key=${TENOR_API_KEY}&limit=1&media_filter=gif`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[Tenor Tool] API request failed with status ${response.status}: ${errorText}`);
                return null;
            }
            const data = await response.json();
            const parsed = tenorApiSchema.safeParse(data);

            if (parsed.success && parsed.data.results.length > 0) {
                // Directly return the URL string
                return parsed.data.results[0].media_formats.gif.url;
            } else {
                console.warn(`[Tenor Tool] No Tenor results found for query: "${input.query}".`);
                if (!parsed.success) {
                    console.error("[Tenor Tool] Zod parsing error:", parsed.error.format());
                }
                return null;
            }
        } catch (error) {
            console.error(`[Tenor Tool] Error fetching GIF from Tenor for query "${input.query}":`, error);
            return null;
        }
    }
);
