'use server';

/**
 * @fileOverview A Genkit flow to fetch relevant YouTube videos based on a query.
 *
 * - getYoutubeVideos - A function that fetches videos from the YouTube Data API.
 * - GetYoutubeVideosInput - The input type for the getYoutubeVideos function.
 * - GetYoutubeVideosOutput - The return type for the getYoutubeVideos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Define the structure of a single YouTube video item
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


// --- Flow Input and Output Schemas ---
export const GetYoutubeVideosInputSchema = z.object({
  query: z.string().describe('The search query for YouTube.'),
  language: z.string().optional().default('en').describe('The language for the search results.'),
});
export type GetYoutubeVideosInput = z.infer<typeof GetYoutubeVideosInputSchema>;

export const GetYoutubeVideosOutputSchema = z.object({
  videos: z.array(YouTubeVideoSchema).describe('A list of fetched YouTube video resources.'),
});
export type GetYoutubeVideosOutput = z.infer<typeof GetYoutubeVideosOutputSchema>;


// --- Main Flow Function ---
const getYoutubeVideosFlow = ai.defineFlow(
  {
    name: 'getYoutubeVideosFlow',
    inputSchema: GetYoutubeVideosInputSchema,
    outputSchema: GetYoutubeVideosOutputSchema,
  },
  async (input) => {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
        console.error('YouTube API key is not configured or accessible within the flow.');
        return { videos: [] };
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
        
        // Ensure the response data is an array before returning
        const videos = response.data.items || [];
        return { videos };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorDetails = error.response?.data?.error;
            console.error(
            `Error fetching videos for query "${input.query}": ${errorDetails?.message || error.message}`
            );
        } else {
            console.error(`An unexpected error occurred while fetching videos for "${input.query}":`, error);
        }
        return { videos: [] };
    }
  }
);


// --- Exported Wrapper Function ---
export async function getYoutubeVideos(input: GetYoutubeVideosInput): Promise<GetYoutubeVideosOutput> {
  return getYoutubeVideosFlow(input);
}
