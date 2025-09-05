
'use server';

import { getYoutubeVideos as getYoutubeVideosFlow } from '@/ai/flows/get-youtube-videos';
import { z } from 'zod';

// --- Shared Schemas and Types for YouTube Flow ---
export const GetYoutubeVideosInputSchema = z.object({
  query: z.string().describe('The search query for YouTube.'),
  language: z.string().optional().default('en').describe('The language for the search results.'),
});
export type GetYoutubeVideosInput = z.infer<typeof GetYoutubeVideosInputSchema>;

export const GetYoutubeVideosOutputSchema = z.object({
  videos: z.array(z.any()).describe('A list of fetched YouTube video resources.'),
});
export type GetYoutubeVideosOutput = z.infer<typeof GetYoutubeVideosOutputSchema>;
// --- End Shared Schemas ---


// Define the structure of a single YouTube video item here for the client-side
const YouTubeVideoSchema = z.object({
  id: z.object({
    videoId: z.string(),
  }),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      high: z.object({
        url: z.string(),
      }),
    }),
    channelTitle: z.string(),
  }),
});
export type YouTubeVideo = z.infer<typeof YouTubeVideoSchema>;


export async function getVideos(query: string, language: string = 'en'): Promise<YouTubeVideo[]> {
    const input: GetYoutubeVideosInput = {
        query,
        language
    };
    
    try {
        const result = await getYoutubeVideosFlow(input);
        // We cast the result here after fetching. The Zod schema in the flow still ensures a base level of structure.
        return result.videos as YouTubeVideo[];
    } catch (error) {
        console.error(`Error fetching videos via flow for query "${query}":`, error);
        return [];
    }
}
