import CreateMealForm from "@/app/_components/CreateMealForm";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const [areas, categories, ingredients] = await Promise.all([
    api.meal.getAreas(),
    api.meal.getCategories(),
    api.meal.getIngredients(),
  ]);
  try {
    const meal = await api.meal.getMyMealById(Number(params.id));
    if (!meal) {
      return notFound();
    }
    return (
      <>
        <ToastContainer />
        <CreateMealForm
          initialMeal={meal}
          areas={areas}
          categories={categories}
          ingredients={ingredients}
        />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
