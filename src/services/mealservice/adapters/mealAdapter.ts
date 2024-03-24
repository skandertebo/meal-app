import { Meal } from "@prisma/client";
import { FilteredMealDto } from "../dto/filterMealsResultDto";
import { DetailedMealDto } from "../dto/searchMealsResultDto";

export default function mealAdapter(
  adaptee: DetailedMealDto,
): Meal & { ingredients: { name: string; unit: string }[] } {
  return {
    id: Number(adaptee.idMeal),
    name: adaptee.strMeal,
    category: adaptee.strCategory,
    area: adaptee.strArea,
    instructions: adaptee.strInstructions,
    thumb: adaptee.strMealThumb,
    ingredients: Object.entries(adaptee)
      .filter(([key, value]) => key.startsWith("strIngredient") && value)
      .map(([key, value]) => {
        const ingredientNumber = key.replace("strIngredient", "");
        const measure = adaptee[`strMeasure${ingredientNumber}`];
        return {
          name: value!,
          unit: measure,
        };
      })
      .filter((ingredient) => ingredient.name && ingredient.unit) as {
      name: string;
      unit: string;
    }[],
    createdById: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function filteredMealAdapter(
  adaptee: FilteredMealDto,
  filter: {
    type: "category" | "area" | "ingredient";
    value: string;
  },
): Meal {
  return {
    id: Number(adaptee.idMeal),
    name: adaptee.strMeal,
    category: filter.type === "category" ? filter.value : "",
    area: filter.type === "area" ? filter.value : "",
    instructions: "",
    thumb: adaptee.strMealThumb,
    createdById: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
