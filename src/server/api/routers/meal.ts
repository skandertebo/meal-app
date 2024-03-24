import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import MealService from "@/services/mealservice";

export const mealRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.string(),
            unit: z.string(),
          }),
        ),
        instructions: z.string(),
        category: z.string(),
        area: z.string(),
        tags: z.array(z.string()),
        thumb: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user is defined
      if (!ctx.session.user || !ctx.session.user.id) {
        throw new Error("User is not defined");
      }

      // Map ingredients with required properties
      const ingredients = input.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        amountUnit: "someValue", // Replace 'someValue' with the actual value
      }));

      return ctx.db.meal.create({
        data: {
          name: input.name,
          instructions: input.instructions,
          category: input.category,
          area: input.area,
          thumb: input.thumb ?? "",
          ingredients: {
            create: ingredients,
          },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  search: publicProcedure.input(z.string()).query(({ input }) => {
    return MealService.GetMeals(input);
  }),

  random: publicProcedure.query(() => {
    return MealService.GetRandomMeal();
  }),

  getById: publicProcedure.input(z.string()).query(({ input }) => {
    return MealService.GetMealById(input);
  }),

  getCategories: publicProcedure.query(() => {
    return MealService.GetCategories();
  }),

  getAreas: publicProcedure.query(() => {
    return MealService.GetAreas();
  }),

  getIngredients: publicProcedure.query(() => {
    return MealService.GetIngredients();
  }),

  getByFilter: publicProcedure
    .input(
      z.object({
        type: z.union([
          z.literal("category"),
          z.literal("area"),
          z.literal("ingredient"),
        ]),
        value: z.string(),
      }),
    )
    .query(({ input }) => {
      return MealService.GetMealByFilter({
        type: input.type,
        value: input.value,
      });
    }),

  getMyMeals: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is defined
    if (!ctx.session.user || !ctx.session.user.id) {
      throw new Error("User is not defined");
    }

    return ctx.db.meal.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
});
