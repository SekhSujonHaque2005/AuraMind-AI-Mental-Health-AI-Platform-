
'use server';

import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
  };
}

export async function getVideos(query: string, language: string = 'en'): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  
  if (!API_KEY) {
    console.error('YouTube API key is not configured.');
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
    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const errorDetails = error.response?.data?.error;
        console.error(
          `Error fetching videos for query "${query}": ${errorDetails?.message || error.message}`
        );
    } else {
        console.error(`An unexpected error occurred while fetching videos for "${query}":`, error);
    }
    return [];
  }
}
