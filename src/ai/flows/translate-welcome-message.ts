
'use server';

/**
 * @fileOverview A flow to translate the initial welcome message and suggested questions
 * using the Google Cloud Translation API.
 *
 * - translateWelcomeMessage - Translates the welcome message and options to the target language.
 */

import { 
    type TranslateWelcomeMessageInput, 
    type TranslateWelcomeMessageOutput,
    englishContent,
    MessageOptionSchema
} from '@/contexts/ChatContext';
import { translateText } from '@/services/translation';
import { z } from 'zod';

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;

    // Bypass for English to avoid unnecessary API calls.
    if (targetLanguage.toLowerCase() === 'english' || targetLanguage.toLowerCase().startsWith('en')) {
        return englishContent;
    }

    try {
        const translatedWelcomeMessage = await translateText(englishContent.welcomeMessage, targetLanguage);
        
        const questionTexts = englishContent.suggestedQuestions.map(q => q.label);
        const translatedQuestionTexts = await translateText(questionTexts, targetLanguage);

        if (typeof translatedWelcomeMessage !== 'string' || !Array.isArray(translatedQuestionTexts)) {
            throw new Error("Translation did not return the expected types.");
        }

        const translatedQuestions = englishContent.suggestedQuestions.map((question, index) => ({
            label: translatedQuestionTexts[index],
            value: translatedQuestionTexts[index], // Use the translated label as the value
        }));

        // Validate the final structure
        const validatedOutput = z.object({
            welcomeMessage: z.string(),
            suggestedQuestions: z.array(MessageOptionSchema)
        }).parse({
            welcomeMessage: translatedWelcomeMessage,
            suggestedQuestions: translatedQuestions
        });

        return validatedOutput;
        
    } catch (error) {
        console.error(`[Translation Flow Error] Failed to translate content for language: ${targetLanguage}`, error);
        // Fallback to English content on any error.
        return englishContent;
    }
}
