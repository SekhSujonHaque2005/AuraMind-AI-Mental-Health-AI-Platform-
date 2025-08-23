'use server';

/**
 * @fileOverview This file implements a critical safety protocol to detect
 * and respond to high-risk user messages related to self-harm or suicide.
 * 
 * - checkSafetyAndRespond - A function that checks the user's message for
 *   high-risk keywords and provides immediate crisis resources if needed.
 * - SafetyCheckInput - The input type for the checkSafetyAndRespond function.
 * - SafetyCheckOutput - The return type for the checkSafetyAndRespond function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SafetyCheckInputSchema = z.object({
  message: z
    .string()
    .describe('The user message to check for safety concerns.'),
});
export type SafetyCheckInput = z.infer<typeof SafetyCheckInputSchema>;

const SafetyCheckOutputSchema = z.object({
  isSafe: z
    .boolean()
    .describe('Whether the message is safe or contains crisis indicators.'),
  response: z
    .string()
    .describe(
      'A response providing crisis resources if the message is not safe, or an empty string if the message is safe.'
    ),
});
export type SafetyCheckOutput = z.infer<typeof SafetyCheckOutputSchema>;

export async function checkSafetyAndRespond(
  input: SafetyCheckInput
): Promise<SafetyCheckOutput> {
  return criticalSafetyFlow(input);
}

const crisisResponse = `It sounds like you are going through a difficult time. It’s important to talk to someone who can help right now. Please reach out to the National Suicide Prevention Lifeline at 1-800-273-TALK or text HOME to 741741 to connect with a crisis counselor. You are not alone.`;

const detectCrisisKeywords = ai.defineTool(
  {
    name: 'detectCrisisKeywords',
    description: 'Detects high-risk keywords related to self-harm, suicide, or severe crisis in the user message.',
    inputSchema: z.object({
      message:
        z.string().describe('The user message to check for safety concerns.'),
    }),
    outputSchema: z.boolean(),
  },
  async function (input) {
    const keywords = [
      'suicide',
      'self-harm',
      'kill myself',
      'end my life',
      'want to die',
      'helpless',
      'hopeless',
      'worthless',
    ];
    const message = input.message.toLowerCase();
    return keywords.some(keyword => message.includes(keyword));
  }
);

const criticalSafetyFlow = ai.defineFlow(
  {
    name: 'criticalSafetyFlow',
    inputSchema: SafetyCheckInputSchema,
    outputSchema: SafetyCheckOutputSchema,
  },
  async input => {
    const isCrisis = await detectCrisisKeywords(input);

    if (isCrisis) {
      return {
        isSafe: false,
        response: crisisResponse,
      };
    }

    return {
      isSafe: true,
      response: '',
    };
  }
);
