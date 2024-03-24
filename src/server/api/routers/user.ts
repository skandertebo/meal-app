import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  whoami: publicProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      return null;
    } else {
      const user = await db.user.findUnique({
        where: { id: userId },
      });
      return user;
    }
  }),
});
