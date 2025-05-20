
'use server';
/**
 * @fileOverview A Genkit flow to generate an image based on a text prompt.
 *
 * - generateLandingImage - A function that generates an image.
 * - GenerateLandingImageInput - The input type for the function.
 * - GenerateLandingImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
});
export type GenerateLandingImageInput = z.infer<typeof GenerateLandingImageInputSchema>;

const GenerateLandingImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateLandingImageOutput = z.infer<typeof GenerateLandingImageOutputSchema>;

export async function generateLandingImage(
  input: GenerateLandingImageInput
): Promise<GenerateLandingImageOutput> {
  return generateLandingImageFlow(input);
}

const generateLandingImageFlow = ai.defineFlow(
  {
    name: 'generateLandingImageFlow',
    inputSchema: GenerateLandingImageInputSchema,
    outputSchema: GenerateLandingImageOutputSchema,
  },
  async (input) => {
    console.log(`Generating image with prompt: ${input.prompt}`);
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp',
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
          safetySettings: [
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
          ],
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url };
      } else {
        throw new Error('Image generation failed to return a valid media URL.');
      }
    } catch (error) {
      console.error('Error in generateLandingImageFlow:', error);
      // Fallback to a placeholder or re-throw, depending on desired error handling
      // For now, let's throw to indicate failure clearly.
      // A more robust solution might return a specific error structure or a placeholder URI.
      throw new Error(`Failed to generate image for prompt "${input.prompt}": ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

