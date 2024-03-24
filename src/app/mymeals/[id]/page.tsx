import MealPage from "@/app/_components/MealPage";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const myMeal = await api.meal.getMyMealById(Number(params.id));
    if (!myMeal) {
      return notFound();
    }
    return (
      <MealPage
        meal={{
          ...myMeal,
          thumb: myMeal.thumb || "/meal.png",
          ingredients: myMeal.ingredients.map((ingredient) => ({
            name: ingredient.name,
            unit: `${ingredient.amount} ${ingredient.amountUnit}`,
          })),
        }}
      />
    );
  } catch (error) {
    return notFound();
  }
}
