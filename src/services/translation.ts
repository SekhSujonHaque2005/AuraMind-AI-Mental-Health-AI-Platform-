
'use server';

/**
 * @fileOverview A service for translating text using the Google Cloud Translation API.
 * 
 * - translateText: A function to translate a string or an array of strings to a target language.
 */

import { Translate } from '@google-cloud/translate/build/src/v2';

// Initialize the Google Cloud Translate client
const translateClient = new Translate({
  key: process.env.TRANSLATE_API_KEY,
});

/**
 * Translates a string or an array of strings to the specified target language.
 * @param text The text or array of texts to translate.
 * @param targetLanguage The ISO 639-1 code of the target language (e.g., 'hi' for Hindi).
 * @returns A promise that resolves to the translated text or array of texts.
 */
export async function translateText(
  text: string | string[],
  targetLanguage: string
): Promise<string | string[]> {
  try {
    // The v2 client expects the language code without the region part (e.g., 'en' instead of 'en-US')
    const langCode = targetLanguage.split('-')[0];
    
    // An empty API key will cause an error, so we check for it here.
    if (!process.env.TRANSLATE_API_KEY) {
      console.error('TRANSLATE_API_KEY is not set. Translation will be skipped.');
      return text;
    }
    
    const [translations] = await translateClient.translate(text, langCode);
    return translations;
  } catch (error) {
    console.error('Error during translation:', error);
    // In case of an error, return the original text
    return text;
  }
}
