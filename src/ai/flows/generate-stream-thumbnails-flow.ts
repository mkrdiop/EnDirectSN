
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
  streamFrameDataUri: z
    .string()
    .optional()
    .describe(
      "Un URI de données d'une image représentative du stream (par exemple, une capture d'écran). Format attendu : 'data:<mimetype>;base64,<encoded_data>'."
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
    {{#if streamFrameDataUri}}
    Image de référence du stream : {{media url=streamFrameDataUri}}
    Utilisez cette image comme inspiration pour le style visuel et les éléments clés, mais proposez des idées variées.
    {{/if}}

    Pour chaque concept, fournissez :
    1.  'visualPrompt': Un prompt détaillé et spécifique, optimisé pour un modèle de génération d'images IA (comme Gemini ou DALL-E). Ce prompt doit décrire la scène, les couleurs, l'ambiance, le style et tout texte pertinent à inclure dans la miniature. Le texte doit être court et percutant.
    2.  'description': Une brève description de l'idée derrière la miniature.

    Assurez-vous que les prompts visuels sont suffisamment distincts pour produire des miniatures différentes.
    Les miniatures doivent être visuellement attrayantes, inciter au clic et représenter fidèlement l'essence du stream.
    Concentrez-vous sur des compositions dynamiques et claires.

    Exemple de sortie pour numberOfThumbnails = 2 :
    {
      "ideas": [
        {
          "visualPrompt": "Un plan rapproché dynamique d'un chef sénégalais souriant, présentant un plat coloré de Thieboudienne fumant. Arrière-plan flou d'une cuisine animée. Texte en surimpression : 'Saveurs du Sénégal'. Couleurs vives et chaudes.",
          "description": "Met l'accent sur le plat et le chef, ambiance chaleureuse."
        },
        {
          "visualPrompt": "Un joueur de jeux vidéo avec un casque, visage concentré illuminé par l'écran, manette en main. Logo du jeu 'CyberPunk Dakar' en arrière-plan avec des néons. Texte : 'LIVE MAINTENANT'. Style futuriste et sombre.",
          "description": "Capture l'intensité du gaming, style moderne."
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
      try {
        // Generate image using the visual prompt from the idea
        console.log(`Generating image for prompt: ${idea.visualPrompt}`);
        const { media } = await ai.generate({
          model: 'googleai/gemini-2.0-flash-exp', // Ensure this model supports image generation
          prompt: idea.visualPrompt,
          config: {
            responseModalities: ['TEXT', 'IMAGE'], // Must request TEXT as well
            // Adjust safety settings if needed, though default should be fine for thumbnails
             safetySettings: [
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
            ],
          },
          // Providing a context image if available
          context: input.streamFrameDataUri ? [{ media: { url: input.streamFrameDataUri } }] : undefined,
        });
        
        if (media && media.url) {
          generatedThumbnails.push({
            imageDataUri: media.url, // This will be a data URI
            promptUsed: idea.visualPrompt,
          });
        } else {
          console.warn(`L'IA n'a pas retourné d'image pour le prompt : ${idea.visualPrompt}`);
        }
      } catch (error) {
        console.error(`Erreur lors de la génération d'image pour le prompt "${idea.visualPrompt}":`, error);
        // Continue to next idea if one fails, or decide to throw
      }
    }

    if (generatedThumbnails.length === 0) {
      throw new Error("Aucune miniature n'a pu être générée. Veuillez vérifier les prompts ou l'image de référence.");
    }

    return { thumbnails: generatedThumbnails };
  }
);
