import { api } from "@/trpc/server";
import MealPage from "../_components/MealPage";

export default async function Page() {
  const meal = await api.meal.getRandomMeal();
  return <MealPage meal={meal} />;
}
