
import { z } from 'zod';

export interface Track {
  id: number;
  title: string;
  category: string;
  duration: string;
  url: string;
  description: string;
  src: string;
  content: () => React.ReactNode;
}

export const TrackSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const FindMusicInputSchema = z.object({
  query: z.string().describe('The user\'s natural language query for a type of sound or music.'),
  tracks: z.array(TrackSchema).describe('The list of available tracks to search through.'),
});
export type FindMusicInput = z.infer<typeof FindMusicInputSchema>;

export const FindMusicOutputSchema = z.object({
  trackId: z.number().nullable().describe('The ID of the best matching track, or null if no good match is found.'),
});
export type FindMusicOutput = z.infer<typeof FindMusicOutputSchema>;
