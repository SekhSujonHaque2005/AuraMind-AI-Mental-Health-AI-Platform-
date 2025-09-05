
'use server';

import { getYoutubeVideos as getYoutubeVideosFlow, GetYoutubeVideosInput } from '@/ai/flows/get-youtube-videos';
import { z } from 'zod';

// Define the structure of a single YouTube video item here
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
