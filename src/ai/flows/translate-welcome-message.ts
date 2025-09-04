
'use server';

/**
 * @fileOverview A flow to retrieve the welcome message and suggested questions
 * in the user's selected language using a manual translation mapping.
 *
 * - translateWelcomeMessage - Retrieves the content based on the target language.
 */

import { 
    type TranslateWelcomeMessageInput, 
    type TranslateWelcomeMessageOutput,
    englishContent
} from '@/contexts/ChatContext';
import { translations } from '@/lib/translations';

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;
    const langCode = targetLanguage.split('-')[0]; // e.g., 'en-US' -> 'en'

    // Find a translation that matches the language code (e.g., 'hi' for 'hi-IN')
    const matchingTranslationKey = Object.keys(translations).find(key => key.startsWith(langCode));
    
    if (matchingTranslationKey && translations[matchingTranslationKey]) {
        return translations[matchingTranslationKey];
    }
    
    // Fallback to English content if no specific translation is found.
    return englishContent;
}
