import { createTRPCRouter, protectedProcedure } from "../trpc";

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return icons;
  }),
});
