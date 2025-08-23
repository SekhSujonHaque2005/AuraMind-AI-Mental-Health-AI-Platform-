import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    // Explicitly disable gemini-pro from being the default model.
    // We want to select the model in the prompt definition.
    defaultModel: '',
  })],
});
