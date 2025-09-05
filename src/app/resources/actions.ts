
'use server';

import { z } from 'zod';
import axios from 'axios';

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
    
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
        console.error('YouTube API key is not configured or accessible.');
        return [];
    }
    
    try {
        const response = await axios.get(YOUTUBE_API_URL, {
            params: {
                part: 'snippet',
                q: input.query,
                key: API_KEY,
                maxResults: 6,
                type: 'video',
                videoEmbeddable: 'true',
                relevanceLanguage: input.language,
            },
        });
        
        const videos = response.data.items || [];
        return videos as YouTubeVideo[];

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorDetails = error.response?.data?.error;
            console.error(
            `Error fetching videos for query "${input.query}": ${errorDetails?.message || error.message}`
            );
        } else {
            console.error(`An unexpected error occurred while fetching videos for "${input.query}":`, error);
        }
        return [];
    }
}
