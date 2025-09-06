
'use server';

/**
 * @fileOverview A flow to generate a 5-question multiple-choice quiz on a given topic.
 *
 * - generateQuiz - A function that creates a quiz using an AI model.
 * - GenerateQuizInput - The input type for the function.
 * - GenerateQuizOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import { GenerateQuizInputSchema, GenerateQuizOutputSchema, type GenerateQuizInput, type GenerateQuizOutput } from '@/app/actions';

export async function generateQuiz(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an AI assistant that creates engaging multiple-choice quizzes. Your task is to generate a 5-question quiz based on the provided topic.

The quiz must have:
- A creative and relevant title.
- Exactly 5 questions.
- Each question must have exactly 4 options.
- One of the options must be the correct answer.

The topic for the quiz is: {{{topic}}}

Generate the quiz now.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error("The AI failed to generate a quiz. Please try a different topic.");
    }
    
    // Basic validation to ensure the generated answer is one of the options.
    output.questions.forEach(q => {
        if (!q.options.includes(q.answer)) {
            // If the answer is invalid, default to the first option.
            // This is a simple fallback to prevent crashes.
            q.answer = q.options[0];
        }
    });

    return output;
  }
);
