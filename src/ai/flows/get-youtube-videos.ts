
'use server';

/**
 * @fileOverview A Genkit flow to fetch relevant YouTube videos based on a query.
 *
 * - getYoutubeVideos - A function that fetches videos from the YouTube Data API.
 */

import { ai } from '@/ai/genkit';
import axios from 'axios';
import { GetYoutubeVideosInput, GetYoutubeVideosInputSchema, GetYoutubeVideosOutput, GetYoutubeVideosOutputSchema } from '@/app/resources/actions';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

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
