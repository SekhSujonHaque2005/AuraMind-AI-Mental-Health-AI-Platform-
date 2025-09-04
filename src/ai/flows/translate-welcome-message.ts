'use server';

/**
 * @fileOverview A flow to translate the initial welcome message and suggested questions.
 *
 * - translateWelcomeMessage - Translates the welcome message and options to the target language.
 */

import {ai} from '@/ai/genkit';
import { 
    TranslateWelcomeMessageOutputSchema, 
    type TranslateWelcomeMessageInput, 
    type TranslateWelcomeMessageOutput,
    englishContent
} from '@/contexts/ChatContext';

export async function translateWelcomeMessage(input: TranslateWelcomeMessageInput): Promise<TranslateWelcomeMessageOutput> {
    const targetLanguage = input.language;
    if (targetLanguage.toLowerCase() === 'english') {
        return englishContent;
    }

    // This prompt is more explicit, telling the model exactly what to do and how to format the output.
    // It is less prone to errors than asking the model to translate an existing JSON structure.
    const translationPrompt = ai.definePrompt({
        name: 'translationPrompt',
        model: 'googleai/gemini-1.5-flash',
        prompt: `You are an expert translator. Translate the following English text into {{language}}.

You MUST produce a valid JSON object string as your output. Do not add any text before or after the JSON object.

Translate the "welcomeMessage" and each "label" and "value" in the "suggestedQuestions" array.

English Welcome Message: "${englishContent.welcomeMessage}"
English Suggested Questions:
${englishContent.suggestedQuestions.map(q => `- Label: "${q.label}", Value: "${q.value}"`).join('\n')}

Your JSON output should follow this exact structure:
{
  "welcomeMessage": "...",
  "suggestedQuestions": [
    { "label": "...", "value": "..." },
    { "label": "...", "value": "..." },
    // ...and so on for all questions
  ]
}
`,
    });

    const llmResponse = await translationPrompt({ language: targetLanguage });
    const translatedText = llmResponse.text;

    try {
        // The output from the LLM can sometimes be wrapped in ```json ... ``` or have leading/trailing text.
        // This regex is more robust at extracting the JSON block.
        const jsonMatch = translatedText.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
        if (!jsonMatch) {
            throw new Error("No JSON object found in the LLM response.");
        }
        
        const jsonString = jsonMatch[1] || jsonMatch[2];
        const parsedJson = JSON.parse(jsonString);
        
        const validatedOutput = TranslateWelcomeMessageOutputSchema.parse(parsedJson);
        return validatedOutput;
    } catch (error) {
        console.error(`Failed to parse or validate translated JSON for language: ${targetLanguage}`, error);
        console.error("Raw LLM output:", translatedText);
        // Fallback to English content on failure to prevent app crash
        return englishContent;
    }
}
