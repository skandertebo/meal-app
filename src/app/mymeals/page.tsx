import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import MyMealsContainer from "../_components/MyMealsContainer";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/api/auth/signin");
  }

  const meals = await api.meal.getMyMeals();

  return (
    <div className="flex flex-col gap-4 px-2 pt-8 sm:px-6">
      <h1 className="text-2xl">My Recipes:</h1>
      <div className="flex flex-wrap gap-4">
        <MyMealsContainer meals={meals} />
        {meals.length === 0 && (
          <div className="text-md w-full text-center">
            You have no recipes yet, create one{" "}
            <Link href="/create-meal" className="text-blue-400 underline">
              here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
