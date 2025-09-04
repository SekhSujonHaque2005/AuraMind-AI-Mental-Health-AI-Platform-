
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
    MessageOptionSchema,
    TranslateWelcomeMessageOutputSchema
} from '@/contexts/ChatContext';
import { translateText } from '@/services/translation';
import { z } from 'zod';

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;

    // Bypass for English to avoid unnecessary API calls and potential errors.
    if (targetLanguage.toLowerCase() === 'english' || targetLanguage.toLowerCase().startsWith('en')) {
        return englishContent;
    }

    try {
        // 1. Translate the welcome message string.
        const translatedWelcomeMessageResult = await translateText(englishContent.welcomeMessage, targetLanguage);
        const translatedWelcomeMessage = Array.isArray(translatedWelcomeMessageResult) ? translatedWelcomeMessageResult[0] : translatedWelcomeMessageResult;

        // 2. Extract just the labels from the suggested questions for translation.
        const questionLabelsToTranslate = englishContent.suggestedQuestions.map(q => q.label);
        const translatedQuestionLabelsResult = await translateText(questionLabelsToTranslate, targetLanguage);
        const translatedQuestionLabels = Array.isArray(translatedQuestionLabelsResult) ? translatedQuestionLabelsResult : [translatedQuestionLabelsResult];

        // 3. Reconstruct the suggestedQuestions array with translated labels and original values.
        const translatedQuestions = englishContent.suggestedQuestions.map((question, index) => ({
            label: translatedQuestionLabels[index] || question.label, // Fallback to original label if translation is missing
            value: question.value, // IMPORTANT: Keep the original English value for application logic
        }));

        // 4. Create the final output object.
        const finalOutput: TranslateWelcomeMessageOutput = {
            welcomeMessage: translatedWelcomeMessage,
            suggestedQuestions: translatedQuestions,
        };

        // 5. Validate the final structure with Zod to ensure type safety.
        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(finalOutput);
        
        return validatedOutput;
        
    } catch (error) {
        console.error(`[Translation Flow Error] Failed to translate content for language: ${targetLanguage}`, error);
        // Fallback to English content on any error to prevent app from crashing.
        return englishContent;
    }
}
