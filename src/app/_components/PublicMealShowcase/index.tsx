import { api } from "@/trpc/server";
import Link from "next/link";
import MealCard from "../MealCard";

export interface PublicMealShowcaseProps {
  search?: string;
  category?: string;
  area?: string;
  ingredient?: string;
}

const PublicMealShowcase: React.FC<PublicMealShowcaseProps> = async ({
  search = "",
  category,
  area,
  ingredient,
}) => {
  const searchPromise = search
    ? api.meal.search(search)
    : category
      ? api.meal.getByFilter({ type: "category", value: category })
      : area
        ? api.meal.getByFilter({ type: "area", value: area })
        : ingredient
          ? api.meal.getByFilter({ type: "ingredient", value: ingredient })
          : api.meal.search("");

  const meals = await searchPromise;
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 px-2 py-2 sm:px-8">
        {meals.map((meal, idx) => (
          <Link key={idx} href={`/external-meals/${meal.id}`}>
            <div key={meal.id}>
              <MealCard meal={meal} />
            </div>
          </Link>
        ))}
        {meals.length === 0 && (
          <div className="w-full text-center text-2xl font-semibold">
            No meals found
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicMealShowcase;
