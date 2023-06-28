import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import Stripe from "stripe";
import { env } from "@/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
            userId: ctx.session.user.id,
        },
      line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
      mode: "payment",
      success_url: `${env.HOST_NAME}`,
      cancel_url: `${env.HOST_NAME}`,
    });

    return session;
  }),
});
