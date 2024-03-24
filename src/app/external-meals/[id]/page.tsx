import MealService from "@/services/mealservice";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const meal = await MealService.GetMealById(params.id);
  if (!meal) {
    return notFound();
  }
  console.log(meal);
  return (
    <div className="flex flex-col gap-4 px-2 pb-4 pt-8 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{meal.name}</h1>
        <Image src={meal.thumb} alt={meal.name} width={300} height={300} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p>
          {meal.instructions.split("\n").map((instruction, idx) => (
            <span key={idx}>
              {instruction}
              <br />
            </span>
          ))}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul>
          {meal.ingredients.map((ingredient, idx) => (
            <li key={idx}>{`${ingredient.name} ${ingredient.unit}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
