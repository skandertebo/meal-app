import MealPage from "@/app/_components/MealPage";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const meal = await api.meal.getById(params.id);
    if (!meal) {
      return notFound();
    }
    return <MealPage meal={meal} />;
  } catch (error) {
    return notFound();
  }
}
