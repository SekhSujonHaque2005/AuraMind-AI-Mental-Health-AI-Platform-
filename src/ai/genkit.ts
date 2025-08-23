import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GEMINI_API_KEY,
    // Explicitly disable gemini-pro from being the default model.
    // We want to select the model in the prompt definition.
    defaultModel: '',
  })],
});
