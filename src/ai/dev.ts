import { config } from 'dotenv';
config();

import '@/ai/flows/critical-safety-protocol.ts';
import '@/ai/flows/get-aura-response.ts';
import '@/ai/flows/translate-welcome-message.ts';
// YouTube flow is now a direct server action.
// import '@/ai/flows/get-youtube-videos.ts';
// Tenor tool is no longer used.
// import '@/ai/tools/tenor.ts';
