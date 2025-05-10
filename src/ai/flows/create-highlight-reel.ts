
'use server';
/**
 * @fileOverview Un flux pour créer des moments forts (highlight reels) à partir de diffusions en direct en utilisant l'IA.
 *
 * - createHighlightReel - Une fonction qui gère le processus de création des moments forts.
 * - CreateHighlightReelInput - Le type d'entrée pour la fonction createHighlightReel.
 * - CreateHighlightReelOutput - Le type de retour pour la fonction createHighlightReel.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateHighlightReelInputSchema = z.object({
  streamDataUri: z
    .string()
    .describe(
      "Un URI de données du fichier vidéo du flux en direct, qui doit inclure un type MIME et utiliser l'encodage Base64. Format attendu : 'data:<mimetype>;base64,<encoded_data>'."
    ),
  viewerEngagementData: z
    .string()
    .describe("Données sur l'engagement des spectateurs pendant le stream, telles que l'activité du chat et le nombre de spectateurs."),
  keyEventsData: z
    .string()
    .describe('Données sur les événements clés qui se sont produits pendant le stream.'),
});
export type CreateHighlightReelInput = z.infer<typeof CreateHighlightReelInputSchema>;

const CreateHighlightReelOutputSchema = z.object({
  highlightReelDataUri: z
    .string()
    .describe("Un URI de données du fichier vidéo des moments forts généré, qui doit inclure un type MIME et utiliser l'encodage Base64. Format attendu : 'data:<mimetype>;base64,<encoded_data>'."),
  summary: z.string().describe('Un résumé des moments forts inclus dans la vidéo.'),
});
export type CreateHighlightReelOutput = z.infer<typeof CreateHighlightReelOutputSchema>;

export async function createHighlightReel(input: CreateHighlightReelInput): Promise<CreateHighlightReelOutput> {
  return createHighlightReelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createHighlightReelPrompt',
  input: {schema: CreateHighlightReelInputSchema},
  output: {schema: CreateHighlightReelOutputSchema},
  prompt: `You are an AI video editor specializing in creating highlight reels from live streams.

  Given the following information about a live stream, identify the most engaging moments and create a summary of the highlights:

  Stream Data: {{media url=streamDataUri}}
  Viewer Engagement Data: {{{viewerEngagementData}}}
  Key Events Data: {{{keyEventsData}}}

  Create a highlight reel that captures the essence of the stream and will attract more viewers.
  Ensure the highlight reel is no more than 3 minutes long.
  Return the highlight reel as a data URI and provide a summary of the highlights included in the reel.
  `,
});

const createHighlightReelFlow = ai.defineFlow(
  {
    name: 'createHighlightReelFlow',
    inputSchema: CreateHighlightReelInputSchema,
    outputSchema: CreateHighlightReelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
