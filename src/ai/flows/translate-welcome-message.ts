
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
    const targetLanguage = input.language.toLowerCase();

    // Find a key in translations that matches the beginning of the target language.
    // e.g., 'hi' in 'hi-IN'
    const matchingKey = Object.keys(translations).find(key => {
        const keyLangCode = key.split('-')[0];
        const targetLangCode = targetLanguage.split('-')[0];
        // Handle cases where the UI sends a full name like "hindi"
        if (translations[key].languageName.toLowerCase() === targetLangCode) {
            return true;
        }
        return keyLangCode === targetLangCode;
    });

    if (matchingKey && translations[matchingKey]) {
        return translations[matchingKey];
    }
    
    // Fallback to English content if no specific translation is found.
    return englishContent;
}
