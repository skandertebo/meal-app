import { api } from "@/trpc/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateMealForm from "../_components/CreateMealForm";

export default async function Page() {
  const [areas, categories, ingredients] = await Promise.all([
    api.meal.getAreas(),
    api.meal.getCategories(),
    api.meal.getIngredients(),
  ]);
  return (
    <>
      <ToastContainer />
      <CreateMealForm
        areas={areas}
        categories={categories}
        ingredients={ingredients}
      />
    </>
  );
}
