import MealPage from "@/app/_components/MealPage";
import MealService from "@/services/mealservice";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const meal = await MealService.GetMealById(params.id);
    if (!meal) {
      return notFound();
    }
    return <MealPage meal={meal} />;
  } catch (error) {
    return notFound();
  }
}
