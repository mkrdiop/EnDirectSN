'use server';
/**
 * @fileOverview A live stream translation AI agent.
 *
 * - liveTranslateStream - A function that handles the live stream translation process.
 * - LiveTranslateStreamInput - The input type for the liveTranslateStream function.
 * - LiveTranslateStreamOutput - The return type for the liveTranslateStream function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveTranslateStreamInputSchema = z.object({
  spokenText: z.string().describe('The text spoken by the host.'),
  targetLanguage: z.string().describe('The language to translate the spoken text into.'),
});
export type LiveTranslateStreamInput = z.infer<typeof LiveTranslateStreamInputSchema>;

const LiveTranslateStreamOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
});
export type LiveTranslateStreamOutput = z.infer<typeof LiveTranslateStreamOutputSchema>;

export async function liveTranslateStream(input: LiveTranslateStreamInput): Promise<LiveTranslateStreamOutput> {
  return liveTranslateStreamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'liveTranslateStreamPrompt',
  input: {schema: LiveTranslateStreamInputSchema},
  output: {schema: LiveTranslateStreamOutputSchema},
  prompt: `You are a real-time translator, translating spoken text from a live stream into a target language.

  Spoken Text: {{{spokenText}}}
  Target Language: {{{targetLanguage}}}

  Translate the spoken text into the target language.
  `,
});

const liveTranslateStreamFlow = ai.defineFlow(
  {
    name: 'liveTranslateStreamFlow',
    inputSchema: LiveTranslateStreamInputSchema,
    outputSchema: LiveTranslateStreamOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
