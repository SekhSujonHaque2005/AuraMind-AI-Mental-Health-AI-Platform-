
'use server';

import { z } from 'zod';
import axios from 'axios';
import type { GetYoutubeVideosInput, YouTubeVideo } from '@/contexts/ChatContext';

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
        
        const videos = response.data.items.map((item: any) => ({
            id: item.id,
            snippet: {
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: {
                    high: {
                        url: item.snippet.thumbnails.high.url
                    }
                },
                channelTitle: item.snippet.channelTitle
            }
        }));
        return videos;

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
