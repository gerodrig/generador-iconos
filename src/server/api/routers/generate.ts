import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  // publicProcedure,
  //   protectedProcedure,
} from "@/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "@/env.mjs";
import AWS from "aws-sdk";
import { b64Image } from '@/data/b64Image';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: 'us-east-1',
});

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    // return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Df7F94rll8MbPRuWXAE301k7/user-xxTUWi2RusPsWWOe558eaMZT/img-ivsu2OADfyWFButv9vjbdNgE.png?st=2023-06-25T04%3A42%3A45Z&se=2023-06-25T06%3A42%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-25T01%3A54%3A56Z&ske=2023-06-26T01%3A54%3A56Z&sks=b&skv=2021-08-06&sig=Ay%2BaA8pIpnMnCoQ3EG1FCi6Psp312Z5J6EOOB2gM9tg%3D";
    return b64Image;
  } else {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    return response.data.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: { id: ctx.session.user.id, credits: { gte: 1 } },
        data: { credits: { decrement: 1 } },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: `BAD_REQUEST`,
          message: `You don't have enough credits to generate an icon`,
        });
      }

      const finalPrompt = `A modern icon in ${input.color} of a ${input.prompt}`

      //? submit prompt to DALL-E and get back icon
      const base64EncodedImage = await generateIcon(finalPrompt);

      //? save icon to database
      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
         },
      });

      //? save the images to the S3 bucket
      await s3.putObject({
        Bucket: env.S3_BUCKET_NAME,
        Body: Buffer.from(base64EncodedImage!, 'base64'),
        Key: icon.id, // generate a unique key
        ContentEncoding: 'base64',
        ContentType: 'image/png',
      }).promise();

      return {
        imageUrl: `https://${env.S3_BUCKET_NAME}.s3.us-west-2.amazonaws.com/${icon.id}`
      };
    }),
});
