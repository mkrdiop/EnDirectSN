'use server';
/**
 * @fileOverview A flow for creating highlight reels from live streams using AI.
 *
 * - createHighlightReel - A function that handles the highlight reel creation process.
 * - CreateHighlightReelInput - The input type for the createHighlightReel function.
 * - CreateHighlightReelOutput - The return type for the createHighlightReel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateHighlightReelInputSchema = z.object({
  streamDataUri: z
    .string()
    .describe(
      "A data URI of the live stream video file, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  viewerEngagementData: z
    .string()
    .describe('Data on viewer engagement during the stream, such as chat activity and viewer counts.'),
  keyEventsData: z
    .string()
    .describe('Data on key events that occurred during the stream.'),
});
export type CreateHighlightReelInput = z.infer<typeof CreateHighlightReelInputSchema>;

const CreateHighlightReelOutputSchema = z.object({
  highlightReelDataUri: z
    .string()
    .describe("A data URI of the generated highlight reel video file, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  summary: z.string().describe('A summary of the highlights included in the reel.'),
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
