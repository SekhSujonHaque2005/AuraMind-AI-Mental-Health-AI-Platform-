'use server';

import { getYoutubeVideos, GetYoutubeVideosInput } from '@/ai/flows/get-youtube-videos';
import type { YouTubeVideo } from '@/ai/flows/get-youtube-videos';


export async function getVideos(query: string, language: string = 'en'): Promise<YouTubeVideo[]> {
    const input: GetYoutubeVideosInput = {
        query,
        language
    };
    
    try {
        const result = await getYoutubeVideos(input);
        return result.videos;
    } catch (error) {
        console.error(`Error fetching videos via flow for query "${query}":`, error);
        return [];
    }
}

export type { YouTubeVideo };
