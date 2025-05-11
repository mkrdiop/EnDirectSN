
'use server';
/**
 * @fileOverview Un flux pour générer des miniatures de stream en utilisant l'IA.
 *
 * - generateStreamThumbnails - Une fonction qui gère le processus de génération de miniatures.
 * - GenerateStreamThumbnailsInput - Le type d'entrée pour la fonction generateStreamThumbnails.
 * - GenerateStreamThumbnailsOutput - Le type de retour pour la fonction generateStreamThumbnails.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThumbnailIdeaSchema = z.object({
  visualPrompt: z.string().describe("Un prompt visuel détaillé pour générer une miniature d'image."),
  description: z.string().optional().describe("Une brève description de l'idée de miniature."),
});

const GenerateStreamThumbnailsInputSchema = z.object({
  streamDescription: z
    .string()
    .min(1, "La description du stream est requise.")
    .describe('Une description détaillée du contenu du stream.'),
  streamFramesDataUris: z
    .array(z.string())
    .optional()
    .describe(
      "Une liste d'URIs de données d'images représentatives du stream (par exemple, des captures d'écran). Format attendu pour chaque URI : 'data:<mimetype>;base64,<encoded_data>'."
    ),
  numberOfThumbnails: z
    .number()
    .min(1)
    .max(4) // Limiting to 4 for demo purposes and Gemini Flash capabilities
    .default(3)
    .describe('Le nombre de miniatures à générer (entre 1 et 4).'),
});
export type GenerateStreamThumbnailsInput = z.infer<typeof GenerateStreamThumbnailsInputSchema>;

const GeneratedThumbnailSchema = z.object({
  imageDataUri: z.string().describe("L'URI de données de l'image miniature générée."),
  promptUsed: z.string().optional().describe("Le prompt visuel utilisé pour générer cette miniature spécifique."),
});

const GenerateStreamThumbnailsOutputSchema = z.object({
  thumbnails: z.array(GeneratedThumbnailSchema).describe('Une liste des miniatures générées.'),
});
export type GenerateStreamThumbnailsOutput = z.infer<typeof GenerateStreamThumbnailsOutputSchema>;

export async function generateStreamThumbnails(
  input: GenerateStreamThumbnailsInput
): Promise<GenerateStreamThumbnailsOutput> {
  return generateStreamThumbnailsFlow(input);
}

const generateIdeasPrompt = ai.definePrompt({
  name: 'generateThumbnailIdeasPrompt',
  input: {schema: GenerateStreamThumbnailsInputSchema},
  output: {schema: z.object({ ideas: z.array(ThumbnailIdeaSchema) })},
  prompt: `
    Vous êtes un expert en marketing visuel pour les plateformes de streaming en direct.
    Votre tâche est de générer {{numberOfThumbnails}} concepts de miniatures (thumbnails) uniques et accrocheurs pour un stream.

    Informations sur le stream :
    Description : {{{streamDescription}}}

    {{#if streamFramesDataUris}}
    Images de référence du stream (analyser toutes les images pour inspiration et composition potentielle) :
    {{#each streamFramesDataUris}}
      {{media url=this}}
    {{/each}}
    À partir de ces images et de la description, générez des prompts visuels pour des miniatures.
    Suggérez des compositions, par exemple en détourant une personne d'une image et en la plaçant sur un fond inspiré d'une autre,
    ou en combinant des thèmes et styles des différentes images.
    Si des personnes sont proéminentes, les prompts peuvent les mettre en valeur, potentiellement détourées (isolées de leur fond original) ou avec un fond stylisé.
    {{else}}
    Basez vos idées uniquement sur la description du stream.
    {{/if}}

    Pour chaque concept, fournissez :
    1.  'visualPrompt': Un prompt détaillé et spécifique, optimisé pour un modèle de génération d'images IA (comme Gemini). Ce prompt doit décrire la scène, les couleurs, l'ambiance, le style et tout texte pertinent à inclure dans la miniature. Le texte doit être court et percutant.
    2.  'description': Une brève description de l'idée derrière la miniature.

    Assurez-vous que les prompts visuels sont suffisamment distincts pour produire des miniatures différentes.
    Les miniatures doivent être visuellement attrayantes, inciter au clic et représenter fidèlement l'essence du stream.
    Concentrez-vous sur des compositions dynamiques et claires.

    Exemple de sortie pour numberOfThumbnails = 1 et des images fournies:
    {
      "ideas": [
        {
          "visualPrompt": "Un streamer souriant (visible sur l'une des images de référence), détouré et placé sur un fond abstrait et dynamique aux couleurs vives. Texte en surimpression : 'Énergie Pure!'. Style moderne et épuré.",
          "description": "Combine le streamer d'une image avec une ambiance d'une autre pour un look dynamique."
        }
      ]
    }
  `,
});


const generateStreamThumbnailsFlow = ai.defineFlow(
  {
    name: 'generateStreamThumbnailsFlow',
    inputSchema: GenerateStreamThumbnailsInputSchema,
    outputSchema: GenerateStreamThumbnailsOutputSchema,
  },
  async (input) => {
    const { output: ideasOutput } = await generateIdeasPrompt(input);
    if (!ideasOutput || !ideasOutput.ideas || ideasOutput.ideas.length === 0) {
      throw new Error("L'IA n'a pas réussi à générer des idées de miniatures.");
    }

    const generatedThumbnails: GeneratedThumbnailSchema[] = [];

    for (const idea of ideasOutput.ideas) {
      try
      {
        // Prepare prompt for image generation, including an input image if provided
        let imageGenPromptParts: any[] = [{ text: idea.visualPrompt }];
        if (input.streamFramesDataUris && input.streamFramesDataUris.length > 0) {
          // Use the first uploaded image as the primary visual context for the generation model
          // This aligns with how Gemini Flash handles image input for generation/editing tasks
          imageGenPromptParts.unshift({ media: { url: input.streamFramesDataUris[0] } });
        }
        
        console.log(`Generating image with prompt: ${JSON.stringify(imageGenPromptParts)}`);
        const { media } = await ai.generate({
          model: 'googleai/gemini-2.0-flash-exp',
          prompt: imageGenPromptParts,
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
          generatedThumbnails.push({
            imageDataUri: media.url,
            promptUsed: idea.visualPrompt,
          });
        } else {
          console.warn(`L'IA n'a pas retourné d'image pour le prompt : ${idea.visualPrompt}`);
        }
      } catch (error) {
        console.error(`Erreur lors de la génération d'image pour le prompt "${idea.visualPrompt}":`, error);
        // Continue to next idea if one fails
      }
    }

    if (generatedThumbnails.length === 0) {
      throw new Error("Aucune miniature n'a pu être générée. Veuillez vérifier les prompts ou les images de référence.");
    }

    return { thumbnails: generatedThumbnails };
  }
);

