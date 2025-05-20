
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
      "The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>', or a placeholder URL if generation failed."
    ),
});
export type GenerateLandingImageOutput = z.infer<typeof GenerateLandingImageOutputSchema>;

const FALLBACK_IMAGE_URI = "https://placehold.co/600x400.png?text=Image+Generation+Error";

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
    console.log(`Attempting to generate image with prompt: ${input.prompt}`);
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
        console.warn(`Image generation failed to return a valid media URL for prompt: "${input.prompt}". Using fallback.`);
        return { imageDataUri: FALLBACK_IMAGE_URI };
      }
    } catch (error) {
      console.error(`Error in generateLandingImageFlow for prompt "${input.prompt}":`, error);
      // Check if the error is a quota error or other specific API error if needed for more granular handling
      // For now, any error during generation will result in a fallback.
      return { imageDataUri: FALLBACK_IMAGE_URI };
    }
  }
);
