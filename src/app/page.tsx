import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
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
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center gap-6">
      <nav className="flex w-screen items-center justify-between bg-orange-400 py-4">
        <div className="h-2 w-[67px]"></div>
        <h1 className="text-center text-2xl font-semibold text-white">
          Meal App
        </h1>
        <div className="pe-4">
          {session?.user ? (
            <a href="/api/auth/signout">Sign out</a>
          ) : (
            <a href="/api/auth/signin">Sign in</a>
          )}
        </div>
      </nav>
      <MealSearch
        search={search}
        category={category}
        area={area}
        ingredient={ingredient}
        inputPlaceholder="Search for a meal"
        categories={categories}
        areas={areas}
        ingredients={ingredients}
      />
      <PublicMealShowcase
        search={search}
        category={searchParams?.category}
        area={searchParams?.area}
        ingredient={searchParams?.ingredient}
      />
    </main>
  );
}
