
'use server';
/**
 * @fileOverview Un agent IA pour la traduction en direct de flux de streaming.
 *
 * - liveTranslateStream - Une fonction qui gère le processus de traduction en direct du flux.
 * - LiveTranslateStreamInput - Le type d'entrée pour la fonction liveTranslateStream.
 * - LiveTranslateStreamOutput - Le type de retour pour la fonction liveTranslateStream.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveTranslateStreamInputSchema = z.object({
  spokenText: z.string().describe("Le texte prononcé par l'animateur."),
  targetLanguage: z.string().describe('La langue dans laquelle traduire le texte prononcé.'),
});
export type LiveTranslateStreamInput = z.infer<typeof LiveTranslateStreamInputSchema>;

const LiveTranslateStreamOutputSchema = z.object({
  translatedText: z.string().describe('Le texte traduit dans la langue cible.'),
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
