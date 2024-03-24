import { api } from "@/trpc/server";
import { Suspense } from "react";
import MealSearch from "./_components/MealSearch";
import PublicMealShowcase from "./_components/PublicMealShowcase";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string | undefined;
    category: string | undefined;
    area: string | undefined;
    ingredient: string | undefined;
  };
}) {
  const { search, category, area, ingredient } = searchParams;
  const [categories, areas, ingredients] = await Promise.all([
    api.meal.getCategories(),
    api.meal.getAreas(),
    api.meal.getIngredients(),
  ]);
  const suspenseKey = `${search}-${category}-${area}-${ingredient}`;
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-2 pt-6">
      <MealSearch
        search={search}
        category={category}
        area={area}
        ingredient={ingredient}
        inputPlaceholder="Search for a recipe"
        categories={categories}
        areas={areas}
        ingredients={ingredients}
      />
      <Suspense fallback={<div>loading...</div>} key={suspenseKey}>
        <PublicMealShowcase
          search={search}
          category={searchParams?.category}
          area={searchParams?.area}
          ingredient={searchParams?.ingredient}
        />
      </Suspense>
    </main>
  );
}
