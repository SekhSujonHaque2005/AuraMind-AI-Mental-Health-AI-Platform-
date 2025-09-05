
'use server';

import axios from 'axios';
import type { YouTubeVideo } from '@/contexts/ChatContext';

export async function getVideos(query: string, language: string = 'en'): Promise<YouTubeVideo[]> {
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
        console.error('YouTube API key is not configured or accessible.');
        // Return an empty array or throw an error, but avoid returning a complex object
        // that might violate 'use server' constraints if this file were structured differently.
        return [];
    }
    
    try {
        const response = await axios.get(YOUTUBE_API_URL, {
            params: {
                part: 'snippet',
                q: query,
                key: API_KEY,
                maxResults: 6,
                type: 'video',
                videoEmbeddable: 'true',
                relevanceLanguage: language,
            },
        });
        
        // The YouTube API response can be complex. We need to safely parse it.
        // The `zod` schema is helpful here, but since we moved it to prevent 'use server' issues,
        // we'll proceed with careful manual mapping.
        const videos = response.data.items.map((item: any): YouTubeVideo => ({
            id: {
                videoId: item.id.videoId,
            },
            snippet: {
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: {
                    high: {
                        url: item.snippet.thumbnails.high.url,
                    },
                },
                channelTitle: item.snippet.channelTitle,
            },
        }));

        return videos;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorDetails = error.response?.data?.error;
            console.error(
            `Error fetching videos for query "${query}": ${errorDetails?.message || error.message}`
            );
        } else {
            console.error(`An unexpected error occurred while fetching videos for "${query}":`, error);
        }
        // In case of an error, return an empty array to prevent the client from breaking.
        return [];
    }
}
