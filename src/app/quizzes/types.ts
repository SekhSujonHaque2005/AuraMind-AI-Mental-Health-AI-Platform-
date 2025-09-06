
import { z } from 'zod';

// --- Quiz Schemas ---
export const QuestionSchema = z.object({
  question: z.string().describe('The question to ask.'),
  options: z.array(z.string()).length(4).describe('A list of exactly 4 possible answers.'),
  answer: z.string().describe('The correct answer from the options list.'),
});
export type Question = z.infer<typeof QuestionSchema>;


export const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const GenerateQuizOutputSchema = z.object({
  title: z.string().describe('A creative and relevant title for the quiz.'),
  questions: z.array(QuestionSchema).length(5).describe('An array of exactly 5 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;
// --- End Quiz Schemas ---
